<script lang="ts">
	import { scale } from 'svelte/transition';
	import type { CountryId, CityId } from '$lib/data/beers';
	import type { Translations } from '$lib/i18n';
	import { maps } from '$lib/data/maps.generated';
	import type { MapView, LabelPos } from '$lib/data/maps.generated';

	let {
		country = '',
		city = '',
		labels,
		countryCounts = null,
		cityCounts = null,
		onselect
	}: {
		country: CountryId | '';
		city: CityId | '';
		labels: Translations['q4'];
		countryCounts?: Record<CountryId, number> | null;
		cityCounts?: Record<CityId, number> | null;
		onselect: (sel: { country: CountryId | ''; city: CityId | '' }) => void;
	} = $props();

	const WORLD_COUNTRIES: CountryId[] = ['usa', 'mexico', 'cyprus'];
	const DEPTH: Record<MapView, number> = { world: 0, europe: 1, greece: 2 };

	// True while counts aren't loaded yet, or a matching beer still exists there —
	// same "show everything until we know better" fallback as BeerGlass/ABVSelector.
	let worldAvailable = $derived(
		!countryCounts || WORLD_COUNTRIES.some((id) => countryCounts![id] > 0)
	);
	let europeAvailable = $derived(
		!countryCounts ||
			Object.entries(countryCounts).some(
				([id, n]) => n > 0 && !WORLD_COUNTRIES.includes(id as CountryId)
			)
	);
	let greeceAvailable = $derived(!countryCounts || countryCounts.greece > 0);
	let onlyGreek = $derived(
		!!countryCounts &&
			countryCounts.greece > 0 &&
			Object.entries(countryCounts).every(([id, n]) => id === 'greece' || n === 0)
	);

	function initialView(): MapView {
		if (city) return 'greece';
		if (country && WORLD_COUNTRIES.includes(country)) return 'world';
		if (!country && onlyGreek) return 'greece';
		return 'europe';
	}

	let view = $state<MapView>(initialView());
	let zoomingIn = $state(true);

	let map = $derived(maps[view]);
	let mapSrc = $derived(`data:image/svg+xml;utf8,${encodeURIComponent(map.svg)}`);
	let visibleMarkers = $derived(
		map.markers.filter((marker) => {
			if (view === 'greece') return !cityCounts || cityCounts[marker.id as CityId] > 0;
			if (marker.id === 'europe') return europeAvailable;
			return !countryCounts || countryCounts[marker.id as CountryId] > 0;
		})
	);

	function zoomTo(v: MapView) {
		zoomingIn = DEPTH[v] > DEPTH[view];
		view = v;
		if (country || city) onselect({ country: '', city: '' });
	}

	function markerLabel(id: string): string {
		if (view === 'greece') return labels.cities[id as CityId];
		if (id === 'europe') return labels.europe;
		return labels.countries[id as CountryId];
	}

	// Label sits outside the (zero-size) marker anchor on the given side, so the
	// dot itself stays pinned exactly at the marker's true xPct/yPct regardless
	// of which way its label is pushed to avoid a neighbor's label.
	function labelPosClasses(pos: LabelPos): string {
		switch (pos) {
			case 'top':
				return 'left-1/2 bottom-1.5 -translate-x-1/2';
			case 'left':
				return 'right-1.5 top-1/2 -translate-y-1/2';
			case 'right':
				return 'left-1.5 top-1/2 -translate-y-1/2';
			case 'bottom':
			default:
				return 'left-1/2 top-1.5 -translate-x-1/2';
		}
	}

	function isSelected(id: string): boolean {
		if (view === 'greece') return city === id;
		if (id === 'europe') return false;
		return country === id;
	}

	// Rendered inside the dot itself. The synthetic "europe" marker has no
	// single count of its own.
	function markerCount(id: string): number | undefined {
		if (id === 'europe') return undefined;
		if (view === 'greece') return cityCounts?.[id as CityId];
		return countryCounts?.[id as CountryId];
	}

	function clickMarker(id: string) {
		if (view === 'greece') {
			// Clicking the already-selected city unselects it, same toggle as
			// clicking blank map space.
			onselect(city === id ? { country: '', city: '' } : { country: 'greece', city: id as CityId });
		} else if (id === 'europe') {
			zoomTo('europe');
		} else {
			// Selects the country outright — Greece included, same as any other
			// marker on this view. Drilling into its cities is a separate,
			// explicit action via the "Greece" zoom button below the map.
			// Clicking the already-selected country unselects it.
			onselect(country === id ? { country: '', city: '' } : { country: id as CountryId, city: '' });
		}
	}

	function clearSelection() {
		if (country || city) onselect({ country: '', city: '' });
	}
</script>

<div class="w-full flex flex-col gap-2">
	<div class="relative w-full h-[44vh]">
		{#key view}
			<div
				class="absolute inset-0 flex"
				in:scale={{ duration: 300, start: zoomingIn ? 0.7 : 1.3 }}
				out:scale={{ duration: 300, start: zoomingIn ? 1.3 : 0.7 }}
			>
				<div
					class="relative m-auto w-full max-h-full"
					style="aspect-ratio: {map.width} / {map.height}; max-width: calc(44vh * {map.width /
						map.height})"
				>
					<img
						src={mapSrc}
						alt=""
						draggable="false"
						class="absolute inset-0 w-full h-full select-none"
					/>

					<!-- Full-size click-to-clear plane, painted under the marker buttons
						below so any click that doesn't land on a marker unselects. A real
						button for native mouse/keyboard click handling, hidden from
						assistive tech since it's a supplementary gesture (the same
						unselect is also reachable by clicking the selected marker again). -->
					<button
						type="button"
						tabindex="-1"
						aria-hidden="true"
						onclick={clearSelection}
						class="absolute inset-0 w-full h-full cursor-default"
					></button>

					{#each visibleMarkers as marker (marker.id)}
						{@const count = markerCount(marker.id)}
						<button
							onclick={() => clickMarker(marker.id)}
							class="group absolute"
							style="left: {marker.xPct}%; top: {marker.yPct}%; width: 0; height: 0; overflow: visible"
							aria-label={count != null
								? `${markerLabel(marker.id)}, ${count}`
								: markerLabel(marker.id)}
							aria-pressed={isSelected(marker.id)}
						>
							<span
								class="absolute z-10 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full shrink-0 flex items-center justify-center font-fredoka font-black text-[8px] leading-none transition-all duration-150 group-focus-visible:ring-2 group-focus-visible:ring-offset-2 group-focus-visible:ring-brand-green
									{isSelected(marker.id)
									? 'bg-brand-green ring-4 ring-brand-green/40 scale-[2] text-black'
									: 'bg-brand-pink animate-pulse text-white'}"
							>
								{count ?? ''}
							</span>
							<span
								class="absolute z-0 whitespace-nowrap font-fredoka font-black text-xs leading-tight px-1.5 py-0.5 rounded-full bg-white/85
									{isSelected(marker.id) ? 'text-brand-green' : 'text-brand-pink'}
									{labelPosClasses(marker.labelPos)}"
							>
								{markerLabel(marker.id)}
							</span>
						</button>
					{/each}
				</div>
			</div>
		{/key}

		{#if view === 'europe'}
			<div class="absolute bottom-2 right-2 flex flex-col items-end gap-2">
				{#if greeceAvailable}
					<button
						onclick={() => zoomTo('greece')}
						class="bg-brand-pink font-fredoka font-black text-sm text-white px-4 py-1.5 rounded-full"
					>
						🇬🇷 {labels.countries.greece}
					</button>
				{/if}
				{#if worldAvailable}
					<button
						onclick={() => zoomTo('world')}
						class="bg-brand-pink font-fredoka font-black text-sm text-white px-4 py-1.5 rounded-full"
					>
						🌐 {labels.worldwide}
					</button>
				{/if}
			</div>
		{:else if view === 'greece' && !onlyGreek}
			<button
				onclick={() => zoomTo('europe')}
				class="absolute bottom-2 right-2 bg-brand-pink font-fredoka font-black text-sm text-white px-4 py-1.5 rounded-full"
			>
				← {labels.europe}
			</button>
		{/if}
	</div>

	<p class="h-6 text-center font-fredoka font-black text-sm shrink-0">
		{#if view === 'greece' && !city}
			<span class="text-brand-pink">{labels.pickCity}</span>
		{:else if city}
			<span class="text-brand-green">
				✓ {labels.cities[city]}, {labels.countries.greece}
			</span>
		{:else if country}
			<span class="text-brand-green">✓ {labels.countries[country]}</span>
		{/if}
	</p>
</div>
