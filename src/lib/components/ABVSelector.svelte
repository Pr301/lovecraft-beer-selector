<script lang="ts">
	import type { AbvId } from '$lib/data/beers'

	let {
		selected = '',
		onselect,
	}: {
		selected: AbvId | ''
		onselect: (id: AbvId) => void
	} = $props()

	const OPTIONS: { id: AbvId; label: string; size: number }[] = [
		{ id: '0', label: '0%', size: 52 },
		{ id: '4', label: '4%', size: 58 },
		{ id: '5', label: '5%', size: 64 },
		{ id: '6-8', label: '6-8%', size: 72 },
		{ id: '9-10', label: '9-10%', size: 80 },
		{ id: '11+', label: '+11%', size: 88 },
	]
</script>

<div class="flex items-center justify-center overflow-x-auto py-4 px-2">
	<div class="flex items-center">
		{#each OPTIONS as opt, i (opt.id)}
			<button
				onclick={() => onselect(opt.id)}
				class="
					rounded-full border-4 bg-brand-green
					flex items-center justify-center shrink-0
					font-fredoka font-black text-brand-pink
					transition-all duration-150
					{selected === opt.id
					? 'border-white ring-2 ring-white scale-110 z-10'
					: 'border-brand-pink'}
				"
				style="
					width: {opt.size}px;
					height: {opt.size}px;
					font-size: {Math.max(9, opt.size * 0.17)}px;
					margin-left: {i > 0 ? '-10px' : '0'};
					z-index: {selected === opt.id ? 10 : i};
				"
				aria-label="ABV {opt.label}"
				aria-pressed={selected === opt.id}
			>
				{opt.label}
			</button>
		{/each}
	</div>
</div>
