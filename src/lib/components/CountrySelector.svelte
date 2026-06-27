<script lang="ts">
	import type { CountryId } from '$lib/data/beers'
	import { countryMeta } from '$lib/data/beers'

	let {
		selected = '',
		onselect,
	}: {
		selected: CountryId | ''
		onselect: (id: CountryId) => void
	} = $props()

	const COUNTRIES = (Object.entries(countryMeta) as [CountryId, { name: string; flag: string }][])
</script>

<div class="flex flex-col items-center gap-6">
	<div class="flex gap-6 justify-center">
		{#each COUNTRIES.slice(0, 3) as [id, meta] (id)}
			<button
				onclick={() => onselect(id)}
				class="flex flex-col items-center gap-2"
				aria-label={meta.name}
				aria-pressed={selected === id}
			>
				<div
					class="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center border-4 transition-all duration-150
						{selected === id ? 'border-brand-green scale-110' : 'border-transparent'}"
				>
					<span class="text-5xl leading-none select-none">{meta.flag}</span>
				</div>
				<span class="font-fredoka font-black text-sm text-brand-pink">{meta.name}</span>
			</button>
		{/each}
	</div>
	<div class="flex gap-6 justify-center">
		{#each COUNTRIES.slice(3) as [id, meta] (id)}
			<button
				onclick={() => onselect(id)}
				class="flex flex-col items-center gap-2"
				aria-label={meta.name}
				aria-pressed={selected === id}
			>
				<div
					class="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center border-4 transition-all duration-150
						{selected === id ? 'border-brand-green scale-110' : 'border-transparent'}"
				>
					<span class="text-5xl leading-none select-none">{meta.flag}</span>
				</div>
				<span class="font-fredoka font-black text-sm text-brand-pink">{meta.name}</span>
			</button>
		{/each}
	</div>
</div>
