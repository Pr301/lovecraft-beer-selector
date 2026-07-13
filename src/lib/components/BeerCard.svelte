<script lang="ts">
	import type { Beer } from '$lib/data/beers'
	import { colorMeta, countryMeta } from '$lib/data/beers'
	import type { Locale } from '$lib/i18n'

	// `locale` is accepted for API compatibility; card content is language-neutral.
	let { beer }: { beer: Beer; locale?: Locale } = $props()

	let color = $derived(colorMeta[beer.color])
	let country = $derived(countryMeta[beer.country])
</script>

<div class="bg-brand-green rounded-3xl p-4 w-full">
	<!-- Header: image + name + brewery -->
	<div class="bg-white rounded-2xl p-3 flex gap-3 items-start">
		<div
			class="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 text-4xl"
		>
			🍺
		</div>
		<div class="min-w-0">
			<h3 class="font-fredoka font-black text-xl leading-tight truncate">{beer.name}</h3>
			<p class="text-orange-500 font-bold text-sm">{beer.brewery}</p>
			<p class="text-gray-500 text-xs">{beer.style}</p>
		</div>
	</div>

	<!-- Stats: ABV + IBU -->
	<div class="bg-white rounded-2xl mt-2 flex divide-x divide-gray-200">
		<div class="flex-1 text-center py-3">
			<span class="font-black text-sm">{beer.abv}% ABV</span>
		</div>
		{#if beer.ibu != null}
			<div class="flex-1 text-center py-3">
				<span class="font-black text-sm">{beer.ibu} IBU</span>
			</div>
		{:else if beer.styleGuideline}
			<div class="flex-1 text-center py-3">
				<span class="font-black text-sm">~{beer.styleGuideline.ibu} IBU</span>
			</div>
		{/if}
	</div>

	<!-- BA style guideline -->
	{#if beer.styleGuideline}
		<div class="mt-2 px-1">
			<p class="text-gray-400 text-[11px] leading-snug">
				<span class="font-bold text-gray-500">{beer.styleGuideline.name}</span>
				&middot; {beer.styleGuideline.abv} ABV &middot; {beer.styleGuideline.ibu} IBU &middot; {beer
					.styleGuideline.srm} SRM
			</p>
		</div>
	{/if}

	<!-- Color + Country -->
	<div class="flex items-center gap-3 mt-3 px-1">
		<span class="font-black text-sm text-black">color</span>
		<div
			class="px-3 py-1 rounded-lg text-xs font-bold"
			style="background: {color.hex}; color: {color.textColor}"
		>
			{color.label}
		</div>
		<span class="font-black text-sm text-black ml-auto">country</span>
		<span class="text-3xl leading-none">{country.flag}</span>
	</div>

	<!-- Flavour profile -->
	<div class="mt-3 px-1 flex flex-wrap gap-1.5">
		{#each beer.flavor as note (note)}
			<span class="bg-white/80 text-black text-xs font-bold rounded-full px-2.5 py-1 capitalize">
				{note.replace(/-/g, ' ')}
			</span>
		{/each}
	</div>
</div>
