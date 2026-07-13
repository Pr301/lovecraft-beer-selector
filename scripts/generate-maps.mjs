// Generates src/lib/data/maps.generated.ts — dotted SVG backgrounds and marker
// positions for the MapSelector country/city picker.
//
// Run with: npm run generate:maps
// Re-run only when the regions, markers, or dot styling below change.
// Generation is slow (dotted-map computes every dot), so this is NOT wired
// into predev/prebuild — the output file is committed instead.
import DottedMap from 'dotted-map';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const DOT_STYLE = {
	shape: 'circle',
	backgroundColor: 'transparent',
	color: '#ffd6ec',
	radius: 0.32
};

// Minimum on-screen separation (xPct/yPct units) between marker DOTS, per map.
// This is just large enough that two dots don't visually merge into one blob
// (e.g. Athens/Attica project ~1.7% apart) — it's not meant to fix label
// crowding, which `computeLabelPositions` below handles by moving labels
// instead of dots, so pins stay close to their true geographic position.
const MIN_DOT_DIST = { world: 3, europe: 3, greece: 3 };

// Pushes dots apart in 2D percentage-space until every pair clears `minDist`,
// via simple iterative repulsion. Generic over any marker set, so adding more
// markers later doesn't need per-marker hand-tuning.
function declutterDots(markers, minDist, iterations = 400) {
	const arr = markers.map((m) => ({ ...m }));
	for (let iter = 0; iter < iterations; iter++) {
		let moved = false;
		for (let i = 0; i < arr.length; i++) {
			for (let j = i + 1; j < arr.length; j++) {
				const dx = arr[j].xPct - arr[i].xPct;
				const dy = arr[j].yPct - arr[i].yPct;
				const dist = Math.hypot(dx, dy) || 0.0001;
				if (dist < minDist) {
					moved = true;
					const push = (minDist - dist) / 2;
					const ux = dx / dist;
					const uy = dy / dist;
					arr[i].xPct -= ux * push;
					arr[i].yPct -= uy * push;
					arr[j].xPct += ux * push;
					arr[j].yPct += uy * push;
				}
			}
		}
		if (!moved) break;
	}
	for (const m of arr) {
		m.xPct = Math.min(100, Math.max(0, m.xPct));
		m.yPct = Math.min(100, Math.max(0, m.yPct));
	}
	return arr;
}

// How far (xPct/yPct units) a neighboring dot still counts as "crowding" this
// marker's label. Larger than MIN_DOT_DIST since labels are much wider/taller
// than the dot itself.
const LABEL_CROWD_RADIUS = { world: 9, europe: 11, greece: 12 };

// Manual overrides for markers where the automatic heuristic still picks a
// side that collides with something it doesn't "see" (e.g. a third neighbor
// slightly outside the radius). Keyed by `${mapName}.${markerId}`.
const LABEL_OVERRIDES = {
	'greece.athens': 'right',
	'greece.attica': 'left',
	'greece.evia': 'top',
	'greece.chios': 'right',
	'greece.samothraki': 'top',
	'europe.uk': 'left',
	'europe.ireland': 'left',
	'europe.belgium': 'bottom',
	'europe.netherlands': 'top',
	'europe.czech': 'right',
	'europe.austria': 'bottom',
	'europe.hungary': 'right',
	'europe.germany': 'top',
	'europe.poland': 'top'
};

// For each marker, points its label away from the "crowd" of nearby markers:
// sums unit vectors from each neighbor within `crowdRadius` (weighted by
// inverse distance) and snaps the resulting away-direction to top/bottom/
// left/right. Isolated markers (no neighbors in range) default to 'bottom',
// matching the original single-direction layout.
function computeLabelPositions(markers, crowdRadius, mapName) {
	return markers.map((m) => {
		const overrideKey = `${mapName}.${m.id}`;
		if (LABEL_OVERRIDES[overrideKey]) return { ...m, labelPos: LABEL_OVERRIDES[overrideKey] };

		let vx = 0;
		let vy = 0;
		let weight = 0;
		for (const n of markers) {
			if (n.id === m.id) continue;
			const dx = m.xPct - n.xPct;
			const dy = m.yPct - n.yPct;
			const dist = Math.hypot(dx, dy);
			if (dist > 0.0001 && dist < crowdRadius) {
				const w = 1 / dist;
				vx += (dx / dist) * w;
				vy += (dy / dist) * w;
				weight += w;
			}
		}
		if (weight === 0) return { ...m, labelPos: 'bottom' };
		const labelPos =
			Math.abs(vx) >= Math.abs(vy) ? (vx >= 0 ? 'right' : 'left') : vy >= 0 ? 'bottom' : 'top';
		return { ...m, labelPos };
	});
}

// Single source of truth for marker coordinates.
// europe-view greece marker + greece-view athens marker share Athens coords.
const MAPS = {
	world: {
		options: { height: 60, grid: 'diagonal' },
		markers: [
			{ id: 'europe', lat: 50, lng: 10 },
			{ id: 'usa', lat: 39.74, lng: -104.99 }, // Denver
			{ id: 'mexico', lat: 19.43, lng: -99.13 }, // Mexico City
			{ id: 'cyprus', lat: 35.17, lng: 33.36 } // Nicosia (east of the Europe map's bbox)
		]
	},
	europe: {
		options: {
			height: 60,
			grid: 'diagonal',
			region: { lat: { min: 34, max: 62 }, lng: { min: -11, max: 32 } }
		},
		markers: [
			{ id: 'greece', lat: 37.98, lng: 23.72 }, // Athens
			{ id: 'uk', lat: 51.51, lng: -0.13 }, // London
			{ id: 'ireland', lat: 53.35, lng: -6.26 }, // Dublin
			{ id: 'belgium', lat: 50.85, lng: 4.35 }, // Brussels
			{ id: 'netherlands', lat: 52.37, lng: 4.9 }, // Amsterdam
			{ id: 'germany', lat: 52.52, lng: 13.4 }, // Berlin
			{ id: 'austria', lat: 48.21, lng: 16.37 }, // Vienna
			{ id: 'italy', lat: 41.9, lng: 12.5 }, // Rome
			{ id: 'czech', lat: 50.08, lng: 14.44 }, // Prague
			{ id: 'poland', lat: 52.23, lng: 21.01 }, // Warsaw
			{ id: 'hungary', lat: 47.5, lng: 19.04 }, // Budapest
			{ id: 'bulgaria', lat: 42.7, lng: 23.32 }, // Sofia
			{ id: 'latvia', lat: 56.95, lng: 24.11 }, // Riga
			{ id: 'sweden', lat: 59.33, lng: 18.07 } // Stockholm
		]
	},
	greece: {
		options: {
			height: 60,
			grid: 'diagonal',
			countries: ['GRC'],
			// Explicit region: the auto-computed GRC bbox clips Corfu/Samothraki/Chios at the edges.
			region: { lat: { min: 34.5, max: 41.5 }, lng: { min: 19.0, max: 27.0 } }
		},
		markers: [
			{ id: 'athens', lat: 37.98, lng: 23.72 },
			{ id: 'thessaloniki', lat: 40.64, lng: 22.94 },
			{ id: 'heraklion', lat: 35.34, lng: 25.14 }, // Heraklion, Crete
			{ id: 'serres', lat: 41.09, lng: 23.55 },
			{ id: 'evia', lat: 38.24, lng: 24.02 }, // Aliveri/Orologio, Evia
			{ id: 'corfu', lat: 39.74, lng: 19.66 }, // Arillas, Corfu
			{ id: 'chios', lat: 38.37, lng: 26.14 },
			{ id: 'attica', lat: 38.04, lng: 23.54 }, // Thriasio plain
			{ id: 'folegandros', lat: 36.62, lng: 24.92 },
			{ id: 'patras', lat: 38.25, lng: 21.73 },
			{ id: 'rethymno', lat: 35.37, lng: 24.47 }, // Rethymno, Crete
			{ id: 'samothraki', lat: 40.47, lng: 25.53 },
			{ id: 'chalkidiki', lat: 40.02, lng: 23.4 } // Kassandra, Chalkidiki
		]
	}
};

const out = {};

for (const [name, { options, markers }] of Object.entries(MAPS)) {
	console.log(`Generating ${name} map...`);
	const map = new DottedMap(options);
	// Render the background BEFORE adding pins so pins don't bake into it.
	const svg = map.getSVG(DOT_STYLE);
	const viewBox = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
	if (!viewBox) throw new Error(`Could not parse viewBox for ${name}`);
	const width = parseFloat(viewBox[1]);
	const height = parseFloat(viewBox[2]);

	const projected = markers.map(({ id, lat, lng }) => {
		const pin = map.addPin({ lat, lng, data: id });
		const xPct = (100 * pin.x) / width;
		const yPct = (100 * pin.y) / height;
		if (xPct < 0 || xPct > 100 || yPct < 0 || yPct > 100) {
			throw new Error(`Marker ${id} on ${name} is out of bounds: ${xPct}%, ${yPct}%`);
		}
		return { id, xPct, yPct };
	});

	const declustered = declutterDots(projected, MIN_DOT_DIST[name] ?? 3);
	const withLabels = computeLabelPositions(declustered, LABEL_CROWD_RADIUS[name] ?? 10, name);

	for (const { id, xPct, yPct, labelPos } of withLabels) {
		const orig = projected.find((p) => p.id === id);
		const nudged = Math.hypot(xPct - orig.xPct, yPct - orig.yPct) > 0.05;
		console.log(
			`  ${id}: ${xPct.toFixed(1)}%, ${yPct.toFixed(1)}%, label:${labelPos}` +
				(nudged ? ' (dot nudged apart)' : '')
		);
	}

	out[name] = { svg, width, height, markers: withLabels };
}

const ts = `// AUTO-GENERATED by scripts/generate-maps.mjs — do not edit by hand.
// Regenerate with: npm run generate:maps

export type MapView = 'world' | 'europe' | 'greece'
export type LabelPos = 'top' | 'bottom' | 'left' | 'right'

export interface MapMarker {
	id: string
	xPct: number
	yPct: number
	labelPos: LabelPos
}

export interface DottedMapData {
	svg: string
	width: number
	height: number
	markers: MapMarker[]
}

export const maps: Record<MapView, DottedMapData> = ${JSON.stringify(out, null, '\t')}
`;

const dest = join(dirname(fileURLToPath(import.meta.url)), '../src/lib/data/maps.generated.ts');
writeFileSync(dest, ts);
console.log(`Wrote ${dest}`);
