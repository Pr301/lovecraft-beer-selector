<script lang="ts">
	import type { AbvId } from '$lib/data/beers'

	let {
		selected = '',
		counts = null,
		onselect,
	}: {
		selected: AbvId | ''
		counts?: Record<AbvId, number> | null
		onselect: (id: AbvId) => void
	} = $props()

	const OPTIONS: { id: AbvId; label: string; size: number }[] = [
		{ id: '0', label: '0%', size: 52 },
		{ id: '4', label: '1-4%', size: 58 },
		{ id: '5', label: '5%', size: 64 },
		{ id: '6-8', label: '6-8%', size: 72 },
		{ id: '9-10', label: '9-10%', size: 80 },
		{ id: '11+', label: '+11%', size: 88 },
	]

	// CSS analogue of BeerGlass's SVG hatch <pattern>; the button's own
	// border-radius clips this to the circle.
	const HATCH_BG =
		'repeating-linear-gradient(45deg, rgba(0,0,0,0.45) 0px, rgba(0,0,0,0.45) 3px, transparent 3px, transparent 9px)'

	function countFor(id: AbvId): number | null {
		return counts ? counts[id] : null
	}
	function isDisabled(id: AbvId): boolean {
		return counts != null && counts[id] === 0
	}
</script>

<div class="flex items-end justify-center overflow-x-auto py-4 px-2">
	<div class="flex items-end">
		{#each OPTIONS as opt, i (opt.id)}
			{@const disabled = isDisabled(opt.id)}
			{@const count = countFor(opt.id)}
			{@const dimmed = selected && selected !== opt.id}
			<!-- Opacity wraps the button + badge as one unit, same as BeerGlass's
				<g opacity>, so dimming doesn't compound where they'd overlap. -->
			<div
				class="flex flex-col items-center shrink-0"
				style="margin-left: {i > 0 ? '-10px' : '0'}; z-index: {selected === opt.id
					? 20
					: i}; opacity: {dimmed ? 0.55 : 1};"
			>
				<button
					onclick={disabled ? undefined : () => onselect(opt.id)}
					disabled={disabled}
					class="
						rounded-full border-4 bg-brand-green
						flex items-center justify-center shrink-0
						font-fredoka font-black text-brand-pink
						transition-all duration-150
						disabled:cursor-not-allowed
						{selected === opt.id
						? 'border-white ring-2 ring-white scale-110'
						: 'border-brand-pink'}
					"
					style="
						width: {opt.size}px;
						height: {opt.size}px;
						font-size: {Math.max(15, opt.size * 0.26)}px;
						{disabled ? `background-image: ${HATCH_BG};` : ''}
					"
					aria-label="ABV {opt.label}"
					aria-pressed={selected === opt.id}
					aria-disabled={disabled}
				>
					{#if disabled}
						<!-- Opaque patch (not a translucent one) so it fully covers the hatch
							stripes underneath instead of blending with them and darkening. -->
						<span class="bg-brand-green rounded-lg px-1.5 py-0.5 leading-none">{opt.label}</span>
					{:else}
						{opt.label}
					{/if}
				</button>
				{#if count != null}
					<span
						class="mt-1.5 grid place-items-center min-w-9 h-9 px-1.5 rounded-full bg-brand-pink font-fredoka font-black text-white text-sm shrink-0"
						style="opacity: {count === 0 ? 0.35 : 1};"
					>
						{count === 0 ? '✕' : count}
					</span>
				{/if}
			</div>
		{/each}
	</div>
</div>
