<script lang="ts">
	import type { Snippet } from 'svelte'

	let {
		children,
		showBack = true,
		onback,
		backLabel = 'back',
	}: {
		children: Snippet
		showBack?: boolean
		onback?: () => void
		backLabel?: string
	} = $props()
</script>

<div class="h-full flex flex-col bg-white overflow-hidden">
	<div class="shrink-0 px-4 pt-4 pb-2">
		{#if showBack}
			<button
				onclick={onback}
				class="bg-brand-pink font-fredoka font-black text-lg px-6 py-2 rounded-full text-white"
			>
				{backLabel}
			</button>
		{:else}
			<div class="h-10"></div>
		{/if}
	</div>

	<div class="flex-1 flex flex-col items-center justify-center px-4 py-2">
		{@render children()}
	</div>

	<div class="shrink-0 py-4 text-center">
		<span class="font-fredoka font-black text-2xl">
			<span class="text-brand-pink">LoVeCRAFT</span>
			<span class="text-brand-green"> BEeRS</span>
		</span>
	</div>
</div>
