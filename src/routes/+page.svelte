<script lang="ts">
	import { fly } from 'svelte/transition';
	import QuestionLayout from '$lib/components/QuestionLayout.svelte';
	import BeerGlass from '$lib/components/BeerGlass.svelte';
	import ABVSelector from '$lib/components/ABVSelector.svelte';
	import MapSelector from '$lib/components/MapSelector.svelte';
	import BeerCard from '$lib/components/BeerCard.svelte';
	import { translations } from '$lib/i18n';
	import type { Locale } from '$lib/i18n';
	import { beers, filterBeer } from '$lib/data/beers';
	import type { Beer, TypeId, ColorId, AbvId, CountryId, CityId } from '$lib/data/beers';

	type Mode = 'quiz' | 'country' | 'style' | 'random';

	let step = $state(0);
	let direction = $state(1);
	let locale = $state<Locale>('en');
	let mode = $state<Mode>('quiz');
	let randomBeer = $state<Beer | null>(null);
	let answers = $state({
		type: '' as TypeId | '',
		color: '' as ColorId | '',
		abv: '' as AbvId | '',
		country: '' as CountryId | '',
		city: '' as CityId | ''
	});

	let t = $derived(translations[locale]);
	let result = $derived(mode === 'random' && randomBeer ? randomBeer : filterBeer(answers));

	const TYPE_OPTIONS: TypeId[] = ['aromatic', 'bitter', 'fruity', 'gluten-free', 'crispy', 'wheat'];
	const MODE_OPTIONS: { id: Mode; emoji: string }[] = [
		{ id: 'quiz', emoji: '📋' },
		{ id: 'country', emoji: '🌍' },
		{ id: 'style', emoji: '🍺' },
		{ id: 'random', emoji: '🎲' }
	];

	function goTo(newStep: number) {
		direction = newStep > step ? 1 : -1;
		step = newStep;
	}

	function selectMode(m: Mode) {
		mode = m;
		answers = { type: '', color: '', abv: '', country: '', city: '' };
		if (m === 'random') {
			randomBeer = beers[Math.floor(Math.random() * beers.length)];
			goTo(6);
		} else if (m === 'country') {
			goTo(5);
		} else {
			goTo(2);
		}
	}

	function reset() {
		answers = { type: '', color: '', abv: '', country: '', city: '' };
		mode = 'quiz';
		randomBeer = null;
		goTo(0);
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
					<div
						class="flex-1 flex flex-col items-center justify-center gap-5 w-full max-w-xl mx-auto px-6 min-h-0"
					>
						<div
							class="w-36 h-36 rounded-full bg-gray-100 flex items-center justify-center shrink-0"
						>
							<span class="text-6xl">🍺</span>
						</div>

						<h1
							class="font-fredoka font-black text-brand-pink text-center leading-tight shrink-0"
							style="font-size: clamp(2.8rem, 13vw, 5rem); white-space: pre-line"
						>
							{t.landing.title}
						</h1>

						<button
							onclick={() => goTo(1)}
							class="bg-brand-green font-fredoka font-black text-brand-pink rounded-2xl w-full py-3 shrink-0"
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
								<span class="font-fredoka font-black text-sm text-gray-600">{t.landing.langGr}</span
								>
							</button>
							<button
								onclick={() => (locale = 'en')}
								class="flex flex-col items-center gap-1 transition-opacity"
								class:opacity-100={locale === 'en'}
								class:opacity-40={locale !== 'en'}
							>
								<span class="text-4xl">🇺🇸</span>
								<span class="font-fredoka font-black text-sm text-gray-600">{t.landing.langEn}</span
								>
							</button>
						</div>
					</div>

					<div class="shrink-0 py-3 text-center">
						<span class="font-fredoka font-black text-2xl">
							<span class="text-brand-pink">LoVeCRAFT</span>
							<span class="text-brand-green"> BEeRS</span>
						</span>
					</div>
				</div>
			{:else if step === 1}
				<!-- Mode selection: how do you want to find your beer? -->
				<QuestionLayout onback={() => goTo(0)} backLabel={t.back}>
					<div class="w-full max-w-xl mx-auto flex flex-col gap-4">
						<h2
							class="font-fredoka font-black text-brand-pink text-center shrink-0"
							style="font-size: clamp(1.8rem, 8vw, 2.8rem)"
						>
							{t.mode.question}
						</h2>
						<div class="flex flex-col gap-3">
							{#each MODE_OPTIONS as { id, emoji } (id)}
								<button
									onclick={() => selectMode(id)}
									class="bg-brand-green rounded-2xl py-3 px-5 flex items-center gap-4 text-left"
								>
									<span class="text-4xl shrink-0">{emoji}</span>
									<span class="flex flex-col">
										<span class="font-fredoka font-black text-2xl text-black leading-tight">
											{t.mode.options[id].label}
										</span>
										<span class="font-fredoka font-medium text-sm text-black/60">
											{t.mode.options[id].desc}
										</span>
									</span>
								</button>
							{/each}
						</div>
					</div>
				</QuestionLayout>
			{:else if step === 2}
				<!-- Q1: What kind of beer do you like? -->
				<QuestionLayout onback={() => goTo(1)} backLabel={t.back}>
					<div class="w-full max-w-xl mx-auto flex flex-col gap-4">
						<h2
							class="font-fredoka font-black text-brand-pink text-center shrink-0"
							style="font-size: clamp(1.8rem, 8vw, 2.8rem)"
						>
							{t.q1.question}
						</h2>
						<div class="grid grid-cols-2 gap-3">
							{#each TYPE_OPTIONS as typeId (typeId)}
								<button
									onclick={() => {
										answers.type = typeId;
										goTo(mode === 'style' ? 6 : 3);
									}}
									class="bg-brand-green font-fredoka font-black text-2xl text-black py-4 rounded-2xl leading-tight"
								>
									{t.q1.options[typeId]}
								</button>
							{/each}
						</div>
					</div>
				</QuestionLayout>
			{:else if step === 3}
				<!-- Q2: Beer color -->
				<QuestionLayout onback={() => goTo(2)} backLabel={t.back}>
					<div class="w-full max-w-xl mx-auto flex flex-col gap-3">
						<h2
							class="font-fredoka font-black text-brand-pink text-center shrink-0"
							style="font-size: clamp(1.8rem, 8vw, 2.8rem)"
						>
							{t.q2.question}
						</h2>
						<BeerGlass selected={answers.color} onselect={(c) => (answers.color = c)} />
						<button
							onclick={() => goTo(4)}
							disabled={!answers.color}
							class="bg-brand-green font-fredoka font-black text-3xl text-black py-3 rounded-2xl w-full disabled:opacity-40 shrink-0"
						>
							{t.q2.next}
						</button>
					</div>
				</QuestionLayout>
			{:else if step === 4}
				<!-- Q3: ABV strength -->
				<QuestionLayout onback={() => goTo(3)} backLabel={t.back}>
					<div class="w-full max-w-xl mx-auto flex flex-col gap-6">
						<h2
							class="font-fredoka font-black text-center shrink-0"
							style="font-size: clamp(1.8rem, 8vw, 2.8rem)"
						>
							{t.q3.question}
						</h2>
						<ABVSelector selected={answers.abv} onselect={(a) => (answers.abv = a)} />
						<button
							onclick={() => goTo(5)}
							disabled={!answers.abv}
							class="bg-brand-green font-fredoka font-black text-3xl text-black py-3 rounded-2xl w-full disabled:opacity-40 shrink-0"
						>
							{t.q3.next}
						</button>
						<button
							onclick={() => {
								answers.abv = '';
								goTo(5);
							}}
							class="font-fredoka font-black text-lg text-gray-400 underline underline-offset-4 py-1 shrink-0"
						>
							{t.q3.skip}
						</button>
					</div>
				</QuestionLayout>
			{:else if step === 5}
				<!-- Q4: Country -->
				<QuestionLayout onback={() => goTo(mode === 'country' ? 1 : 4)} backLabel={t.back}>
					<div class="w-full max-w-xl mx-auto flex flex-col gap-6">
						<h2
							class="font-fredoka font-black text-brand-pink text-center shrink-0"
							style="font-size: clamp(1.8rem, 8vw, 2.8rem)"
						>
							{t.q4.question}
						</h2>
						<MapSelector
							country={answers.country}
							city={answers.city}
							labels={t.q4}
							onselect={(sel) => {
								answers.country = sel.country;
								answers.city = sel.city;
							}}
						/>
						<button
							onclick={() => goTo(6)}
							disabled={!answers.country}
							class="bg-brand-green font-fredoka font-black text-3xl text-black py-3 rounded-2xl w-full disabled:opacity-40 shrink-0"
						>
							{t.q4.next}
						</button>
						{#if mode === 'quiz'}
							<button
								onclick={() => {
									answers.country = '';
									answers.city = '';
									goTo(6);
								}}
								class="font-fredoka font-black text-lg text-gray-400 underline underline-offset-4 py-1 shrink-0"
							>
								{t.q4.skip}
							</button>
						{/if}
					</div>
				</QuestionLayout>
			{:else if step === 6}
				<!-- Result -->
				<QuestionLayout
					onback={() => goTo(mode === 'random' ? 1 : mode === 'style' ? 2 : 5)}
					backLabel={t.back}
				>
					<div class="w-full max-w-xl mx-auto flex flex-col gap-4">
						<h2
							class="font-fredoka font-black text-brand-pink text-center shrink-0"
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
