<script lang="ts">
	import type { ColorId } from '$lib/data/beers';

	let {
		selected = '',
		counts = null,
		onselect
	}: {
		selected: ColorId | '';
		counts?: Record<ColorId, number> | null;
		onselect: (id: ColorId) => void;
	} = $props();

	const BANDS: { id: ColorId; label: string; fill: string; textColor: string }[] = [
		{ id: 'pale-lager', label: 'PALE LAGER', fill: '#F5C842', textColor: '#000' },
		{ id: 'blonde-ale', label: 'BLONDE ALE', fill: '#EDE26A', textColor: '#000' },
		{ id: 'pale-ale-ipa', label: 'PALE ALE/IPA', fill: '#E8A830', textColor: '#000' },
		{ id: 'amber-ale', label: 'AMBER ALE', fill: '#C85A1A', textColor: '#fff' },
		{ id: 'red-ale', label: 'RED ALE', fill: '#A01010', textColor: '#fff' },
		{ id: 'brown-ale', label: 'BROWN ALE', fill: '#6B2A0A', textColor: '#fff' },
		{ id: 'porter', label: 'PORTER', fill: '#3A1A08', textColor: '#fff' },
		{ id: 'stout', label: 'STOUT', fill: '#1A0A04', textColor: '#fff' }
	];

	const W = 240;
	const GLASS_TOP_Y = 90;
	const GLASS_BOT_Y = 400;
	const GLASS_TOP_L = 15;
	const GLASS_TOP_R = 225;
	const GLASS_BOT_L = 70;
	const GLASS_BOT_R = 170;
	const GLASS_HEIGHT = GLASS_BOT_Y - GLASS_TOP_Y;
	const BAND_H = GLASS_HEIGHT / BANDS.length;
	const BADGE_GAP = 25; // clearance between the glass edge and the badge
	const BADGE_R = 14;

	function lx(y: number) {
		return GLASS_TOP_L + ((GLASS_BOT_L - GLASS_TOP_L) * (y - GLASS_TOP_Y)) / GLASS_HEIGHT;
	}
	function rx(y: number) {
		return GLASS_TOP_R - ((GLASS_TOP_R - GLASS_BOT_R) * (y - GLASS_TOP_Y)) / GLASS_HEIGHT;
	}

	function bandTop(i: number) {
		return GLASS_TOP_Y + i * BAND_H;
	}
	function bandBottom(i: number) {
		return GLASS_TOP_Y + i * BAND_H + BAND_H;
	}
	function bandPoints(i: number) {
		const y1 = bandTop(i);
		const y2 = bandBottom(i);
		return `${lx(y1)},${y1} ${rx(y1)},${y1} ${rx(y2)},${y2} ${lx(y2)},${y2}`;
	}
	function bandMidY(i: number) {
		return GLASS_TOP_Y + i * BAND_H + BAND_H * 0.58;
	}
	function bandCenterY(i: number) {
		return GLASS_TOP_Y + i * BAND_H + BAND_H / 2;
	}
	// Badge x follows the glass's tapered right edge, so the count column runs
	// parallel to it instead of sitting in a straight vertical line.
	function badgeX(i: number) {
		return rx(bandCenterY(i)) + BADGE_GAP + BADGE_R;
	}

	function countFor(id: ColorId): number | null {
		return counts ? counts[id] : null;
	}
	function isDisabled(id: ColorId): boolean {
		return counts != null && counts[id] === 0;
	}

	// Center the viewBox on the glass itself (W / 2), not on the glass-plus-badges
	// bounding box, so the badge column (widest at the top band) doesn't pull the
	// glass off-center. Half-width is whichever side needs more room.
	const BADGE_MAX_RIGHT = badgeX(0) + BADGE_R;
	const VB_HALF_W = Math.max(W / 2 - GLASS_TOP_L, BADGE_MAX_RIGHT - W / 2);
	const VB_X = W / 2 - VB_HALF_W;
	const VB_W = VB_HALF_W * 2;
</script>

<svg
	viewBox="{VB_X} 72 {VB_W} 336"
	class="w-full max-w-sm max-h-[45vh] mx-auto cursor-pointer select-none"
	aria-label="Beer color selector"
>
	<!-- Color bands as trapezoid polygons -->
	{#each BANDS as band, i (band.id)}
		{@const disabled = isDisabled(band.id)}
		{@const count = countFor(band.id)}
		<polygon
			points={bandPoints(i)}
			fill={band.fill}
			opacity={!selected || selected === band.id ? 1 : 0.55}
			onclick={disabled ? undefined : () => onselect(band.id)}
			role="button"
			tabindex={disabled ? -1 : 0}
			aria-label={band.label}
			aria-disabled={disabled}
			onkeydown={disabled ? undefined : (e) => e.key === 'Enter' && onselect(band.id)}
			class={disabled ? 'cursor-not-allowed' : ''}
		/>
		<!-- Disabled: struck-through label instead of a line overlay -->
		<text
			x={W / 2}
			y={bandMidY(i)}
			text-anchor="middle"
			fill={band.textColor}
			font-size="13"
			font-weight="bold"
			font-family="sans-serif"
			text-decoration={disabled ? 'line-through' : 'none'}
			pointer-events="none"
		>
			{band.label}
		</text>

		<!-- Selected outline -->
		{#if selected === band.id}
			<polygon
				points={bandPoints(i)}
				fill="none"
				stroke="white"
				stroke-width="4"
				pointer-events="none"
			/>
		{/if}

		<!-- Count badge, parallel to the glass's tapered right edge -->
		{#if count}
			<circle cx={badgeX(i)} cy={bandCenterY(i)} r={BADGE_R} fill="#ff1f9c" pointer-events="none" />
			<text
				x={badgeX(i)}
				y={bandCenterY(i)}
				text-anchor="middle"
				dominant-baseline="central"
				fill="#fff"
				font-size="13"
				font-weight="bold"
				font-family="sans-serif"
				pointer-events="none"
			>
				{count}
			</text>
		{/if}
	{/each}

	<!-- Glass outline on top -->
	<polygon
		points="{GLASS_TOP_L},{GLASS_TOP_Y} {GLASS_TOP_R},{GLASS_TOP_Y} {GLASS_BOT_R},{GLASS_BOT_Y} {GLASS_BOT_L},{GLASS_BOT_Y}"
		fill="none"
		stroke="black"
		stroke-width="3"
		pointer-events="none"
	/>
	<!-- Glass rim line -->
	<line
		x1={GLASS_TOP_L}
		y1={GLASS_TOP_Y}
		x2={GLASS_TOP_R}
		y2={GLASS_TOP_Y}
		stroke="black"
		stroke-width="3"
		pointer-events="none"
	/>
</svg>
