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
		onselect
	}: {
		country: CountryId | '';
		city: CityId | '';
		labels: Translations['q4'];
		onselect: (sel: { country: CountryId | ''; city: CityId | '' }) => void;
	} = $props();

	const WORLD_COUNTRIES: CountryId[] = ['usa', 'mexico', 'cyprus'];
	const DEPTH: Record<MapView, number> = { world: 0, europe: 1, greece: 2 };

	function initialView(): MapView {
		if (city) return 'greece';
		if (country && WORLD_COUNTRIES.includes(country)) return 'world';
		return 'europe';
	}

	let view = $state<MapView>(initialView());
	let zoomingIn = $state(true);

	let map = $derived(maps[view]);
	let mapSrc = $derived(`data:image/svg+xml;utf8,${encodeURIComponent(map.svg)}`);

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

	function clickMarker(id: string) {
		if (view === 'greece') {
			onselect({ country: 'greece', city: id as CityId });
		} else if (id === 'europe') {
			zoomTo('europe');
		} else {
			// Selects the country outright — Greece included, same as any other
			// marker on this view. Drilling into its cities is a separate,
			// explicit action via the "Greece" zoom button below the map.
			onselect({ country: id as CountryId, city: '' });
		}
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

					{#each map.markers as marker (marker.id)}
						<button
							onclick={() => clickMarker(marker.id)}
							class="group absolute"
							style="left: {marker.xPct}%; top: {marker.yPct}%; width: 0; height: 0; overflow: visible"
							aria-label={markerLabel(marker.id)}
							aria-pressed={isSelected(marker.id)}
						>
							<span
								class="absolute z-10 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full shrink-0 transition-all duration-150 group-focus-visible:ring-2 group-focus-visible:ring-offset-2 group-focus-visible:ring-brand-green
									{isSelected(marker.id)
									? 'bg-brand-green ring-4 ring-brand-green/40 scale-125'
									: 'bg-brand-pink animate-pulse'}"
							></span>
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
				<button
					onclick={() => zoomTo('greece')}
					class="bg-brand-pink font-fredoka font-black text-sm text-white px-4 py-1.5 rounded-full"
				>
					🇬🇷 {labels.countries.greece}
				</button>
				<button
					onclick={() => zoomTo('world')}
					class="bg-brand-pink font-fredoka font-black text-sm text-white px-4 py-1.5 rounded-full"
				>
					🌐 {labels.worldwide}
				</button>
			</div>
		{:else if view === 'greece'}
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
