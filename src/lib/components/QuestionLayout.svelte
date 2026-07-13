<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { Locale } from '$lib/i18n'

	let {
		children,
		showBack = true,
		onback,
		backLabel = 'back',
		onhome,
		homeLabel = 'Home',
		locale,
		onlocale,
	}: {
		children: Snippet
		showBack?: boolean
		onback?: () => void
		backLabel?: string
		onhome?: () => void
		homeLabel?: string
		locale?: Locale
		onlocale?: (locale: Locale) => void
	} = $props()
</script>

<div class="h-full flex flex-col bg-white overflow-hidden">
	<div class="shrink-0 px-4 pt-4 pb-2 flex items-center justify-between gap-3">
		<div class="flex items-center gap-2">
			{#if onhome}
				<button
					onclick={onhome}
					aria-label={homeLabel}
					class="bg-brand-pink w-10 h-10 flex items-center justify-center rounded-full shrink-0"
				>
					<svg
						viewBox="0 0 24 24"
						fill="currentColor"
						class="w-5 h-5 text-white"
						aria-hidden="true"
					>
						<path
							d="M12 2.7 2 11h3v10h5.5v-6h3V21H19V11h3z"
						/>
					</svg>
				</button>
			{/if}

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

		{#if onlocale}
			<div class="flex gap-2 shrink-0">
				<button
					onclick={() => onlocale?.('gr')}
					aria-label="Ελληνικά"
					class="text-2xl transition-opacity"
					class:opacity-100={locale === 'gr'}
					class:opacity-40={locale !== 'gr'}
				>
					🇬🇷
				</button>
				<button
					onclick={() => onlocale?.('en')}
					aria-label="English"
					class="text-2xl transition-opacity"
					class:opacity-100={locale === 'en'}
					class:opacity-40={locale !== 'en'}
				>
					🇺🇸
				</button>
			</div>
		{/if}
	</div>

	<div class="relative flex-1 flex flex-col items-center justify-center px-4 py-2 overflow-hidden">
		{@render children()}
	</div>

	<div class="shrink-0 py-4 text-center">
		<span class="font-fredoka font-black text-2xl">
			<span class="text-brand-pink">LoVeCRAFT</span>
			<span class="text-brand-green"> BEeRS</span>
		</span>
	</div>
</div>
