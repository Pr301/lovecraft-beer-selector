<script lang="ts">
	import { scale } from 'svelte/transition';
	import type { CountryId, CityId } from '$lib/data/beers';
	import type { Translations } from '$lib/i18n';
	import { maps } from '$lib/data/maps.generated';
	import type { MapView } from '$lib/data/maps.generated';

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

	const WORLD_COUNTRIES: CountryId[] = ['usa', 'japan', 'mexico', 'australia'];
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
	}

	function markerLabel(id: string): string {
		if (view === 'greece') return labels.cities[id as CityId];
		if (id === 'europe') return labels.europe;
		return labels.countries[id as CountryId];
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
		} else if (view === 'europe' && id === 'greece') {
			zoomTo('greece');
		} else {
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
							class="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center p-2"
							style="left: {marker.xPct}%; top: {marker.yPct}%"
							aria-label={markerLabel(marker.id)}
							aria-pressed={isSelected(marker.id)}
						>
							<span
								class="w-3.5 h-3.5 rounded-full shrink-0 transition-all duration-150
									{isSelected(marker.id)
									? 'bg-brand-green ring-4 ring-brand-green/40 scale-125'
									: 'bg-brand-pink animate-pulse'}"
							></span>
							<span
								class="font-fredoka font-black text-xs leading-tight mt-0.5 px-1.5 py-0.5 rounded-full bg-white/85
									{isSelected(marker.id) ? 'text-brand-green' : 'text-brand-pink'}"
							>
								{markerLabel(marker.id)}
							</span>
						</button>
					{/each}
				</div>
			</div>
		{/key}

		{#if view === 'europe'}
			<button
				onclick={() => zoomTo('world')}
				class="absolute bottom-2 right-2 bg-brand-pink font-fredoka font-black text-sm text-white px-4 py-1.5 rounded-full"
			>
				🌐 {labels.worldwide}
			</button>
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
