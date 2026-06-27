<script lang="ts">
	import { fly } from 'svelte/transition'
	import QuestionLayout from '$lib/components/QuestionLayout.svelte'
	import BeerGlass from '$lib/components/BeerGlass.svelte'
	import ABVSelector from '$lib/components/ABVSelector.svelte'
	import CountrySelector from '$lib/components/CountrySelector.svelte'
	import BeerCard from '$lib/components/BeerCard.svelte'
	import { translations } from '$lib/i18n'
	import type { Locale } from '$lib/i18n'
	import { filterBeer } from '$lib/data/beers'
	import type { TypeId, ColorId, AbvId, CountryId } from '$lib/data/beers'

	let step = $state(0)
	let direction = $state(1)
	let locale = $state<Locale>('en')
	let answers = $state({
		type: '' as TypeId | '',
		color: '' as ColorId | '',
		abv: '' as AbvId | '',
		country: '' as CountryId | '',
	})

	let t = $derived(translations[locale])
	let result = $derived(filterBeer(answers))

	const TYPE_OPTIONS: TypeId[] = ['aromatic', 'bitter', 'fruity', 'gluten-free', 'crispy', 'wheat']

	function goTo(newStep: number) {
		direction = newStep > step ? 1 : -1
		step = newStep
	}

	function reset() {
		answers = { type: '', color: '', abv: '', country: '' }
		goTo(0)
	}
</script>

<div class="relative overflow-hidden bg-white" style="height: 100dvh">
	{#key step}
		<div
			class="absolute inset-0 overflow-hidden"
			in:fly={{ x: direction * 400, duration: 300, opacity: 0.85 }}
			out:fly={{ x: -direction * 400, duration: 300, opacity: 0.85 }}
		>
			{#if step === 0}
				<!-- Landing -->
				<div class="h-full flex flex-col bg-white">
					<div class="flex-1 flex flex-col items-center justify-center gap-5 w-full max-w-xl mx-auto px-6 min-h-0">
						<div class="w-36 h-36 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
							<span class="text-6xl">🍺</span>
						</div>

						<h1
							class="font-fredoka font-black text-brand-pink text-outlined text-center leading-tight shrink-0"
							style="font-size: clamp(2.8rem, 13vw, 5rem); white-space: pre-line"
						>
							{t.landing.title}
						</h1>

						<button
							onclick={() => goTo(1)}
							class="bg-brand-green font-fredoka font-black text-brand-pink text-outlined-thin rounded-2xl w-full py-3 shrink-0"
							style="font-size: clamp(2rem, 10vw, 3.5rem)"
						>
							{t.landing.cta}
						</button>

						<div class="flex gap-10 shrink-0">
							<button
								onclick={() => (locale = 'gr')}
								class="flex flex-col items-center gap-1 transition-opacity"
								class:opacity-100={locale === 'gr'}
								class:opacity-40={locale !== 'gr'}
							>
								<span class="text-4xl">🇬🇷</span>
								<span class="font-fredoka font-black text-sm text-gray-600">{t.landing.langGr}</span>
							</button>
							<button
								onclick={() => (locale = 'en')}
								class="flex flex-col items-center gap-1 transition-opacity"
								class:opacity-100={locale === 'en'}
								class:opacity-40={locale !== 'en'}
							>
								<span class="text-4xl">🇺🇸</span>
								<span class="font-fredoka font-black text-sm text-gray-600">{t.landing.langEn}</span>
							</button>
						</div>
					</div>

					<div class="shrink-0 py-3 text-center">
						<span class="font-fredoka font-black text-2xl">
							<span class="text-brand-pink text-outlined-thin">LoVeCRAFT</span>
							<span class="text-brand-green text-outlined-thin"> BEeRS</span>
						</span>
					</div>
				</div>

			{:else if step === 1}
				<!-- Q1: What kind of beer do you like? -->
				<QuestionLayout onback={() => goTo(0)} backLabel={t.back}>
					<div class="w-full max-w-xl mx-auto flex flex-col gap-4">
						<h2
							class="font-fredoka font-black text-brand-pink text-outlined text-center shrink-0"
							style="font-size: clamp(1.8rem, 8vw, 2.8rem)"
						>
							{t.q1.question}
						</h2>
						<div class="grid grid-cols-2 gap-3">
							{#each TYPE_OPTIONS as typeId (typeId)}
								<button
									onclick={() => {
										answers.type = typeId
										goTo(2)
									}}
									class="bg-brand-green font-fredoka font-black text-2xl text-black py-4 rounded-2xl leading-tight"
								>
									{t.q1.options[typeId]}
								</button>
							{/each}
						</div>
					</div>
				</QuestionLayout>

			{:else if step === 2}
				<!-- Q2: Beer color -->
				<QuestionLayout onback={() => goTo(1)} backLabel={t.back}>
					<div class="w-full max-w-xl mx-auto flex flex-col gap-3">
						<h2
							class="font-fredoka font-black text-brand-pink text-outlined text-center shrink-0"
							style="font-size: clamp(1.8rem, 8vw, 2.8rem)"
						>
							{t.q2.question}
						</h2>
						<BeerGlass
							selected={answers.color}
							onselect={(c) => (answers.color = c)}
						/>
						<button
							onclick={() => goTo(3)}
							disabled={!answers.color}
							class="bg-brand-green font-fredoka font-black text-3xl text-black py-3 rounded-2xl w-full disabled:opacity-40 shrink-0"
						>
							{t.q2.next}
						</button>
					</div>
				</QuestionLayout>

			{:else if step === 3}
				<!-- Q3: ABV strength -->
				<QuestionLayout onback={() => goTo(2)} backLabel={t.back}>
					<div class="w-full max-w-xl mx-auto flex flex-col gap-6">
						<h2
							class="font-fredoka font-black text-center shrink-0"
							style="font-size: clamp(1.8rem, 8vw, 2.8rem)"
						>
							{t.q3.question}
						</h2>
						<ABVSelector
							selected={answers.abv}
							onselect={(a) => (answers.abv = a)}
						/>
						<button
							onclick={() => goTo(4)}
							disabled={!answers.abv}
							class="bg-brand-green font-fredoka font-black text-3xl text-black py-3 rounded-2xl w-full disabled:opacity-40 shrink-0"
						>
							{t.q3.next}
						</button>
						<button
							onclick={() => { answers.abv = ''; goTo(4) }}
							class="font-fredoka font-black text-lg text-gray-400 underline underline-offset-4 py-1 shrink-0"
						>
							{t.q3.skip}
						</button>
					</div>
				</QuestionLayout>

			{:else if step === 4}
				<!-- Q4: Country -->
				<QuestionLayout onback={() => goTo(3)} backLabel={t.back}>
					<div class="w-full max-w-xl mx-auto flex flex-col gap-6">
						<h2
							class="font-fredoka font-black text-brand-pink text-outlined text-center shrink-0"
							style="font-size: clamp(1.8rem, 8vw, 2.8rem)"
						>
							{t.q4.question}
						</h2>
						<CountrySelector
							selected={answers.country}
							onselect={(c) => (answers.country = c)}
						/>
						<button
							onclick={() => goTo(5)}
							disabled={!answers.country}
							class="bg-brand-green font-fredoka font-black text-3xl text-black py-3 rounded-2xl w-full disabled:opacity-40 shrink-0"
						>
							{t.q4.next}
						</button>
						<button
							onclick={() => { answers.country = ''; goTo(5) }}
							class="font-fredoka font-black text-lg text-gray-400 underline underline-offset-4 py-1 shrink-0"
						>
							{t.q4.skip}
						</button>
					</div>
				</QuestionLayout>

			{:else if step === 5}
				<!-- Result -->
				<QuestionLayout onback={() => goTo(4)} backLabel={t.back}>
					<div class="w-full max-w-xl mx-auto flex flex-col gap-4">
						<h2
							class="font-fredoka font-black text-brand-pink text-outlined text-center shrink-0"
							style="font-size: clamp(2rem, 10vw, 3rem)"
						>
							{t.result.title}
						</h2>
						<BeerCard beer={result} {locale} />
						<button
							onclick={reset}
							class="bg-brand-pink font-fredoka font-black text-2xl text-black py-3 rounded-full w-full shrink-0"
						>
							{t.result.explore}
						</button>
					</div>
				</QuestionLayout>
			{/if}
		</div>
	{/key}
</div>
