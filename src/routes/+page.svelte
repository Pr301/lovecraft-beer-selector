<script lang="ts">
	import { onMount } from 'svelte';
	import { cubicInOut } from 'svelte/easing';
	import QuestionLayout from '$lib/components/QuestionLayout.svelte';
	import BeerGlass from '$lib/components/BeerGlass.svelte';
	import ABVSelector from '$lib/components/ABVSelector.svelte';
	import MapSelector from '$lib/components/MapSelector.svelte';
	import BeerCard from '$lib/components/BeerCard.svelte';
	import { translations } from '$lib/i18n';
	import type { Locale } from '$lib/i18n';
	import { beers, filterBeer, loadBeers, countByType, countByColor } from '$lib/data/beers';
	import type { Beer, TypeId, ColorId, AbvId, CountryId, CityId } from '$lib/data/beers';

	type Mode = 'quiz' | 'country' | 'style' | 'random';

	let beersReady = $state(false);
	let loadError = $state<string | null>(null);

	onMount(() => {
		loadBeers()
			.then(() => {
				beersReady = true;
			})
			.catch((e) => {
				loadError = e instanceof Error ? e.message : String(e);
			});
	});

	let step = $state(0);
	let direction: 1 | -1 = $state(1);
	let locale = $state<Locale>('en');
	let mode = $state<Mode>('quiz');
	let randomBeer = $state<Beer | null>(null);
	let diceValue = $state<number | null>(null);
	let diceRolling = $state(false);
	let answers = $state({
		type: '' as TypeId | '',
		color: '' as ColorId | '',
		abv: '' as AbvId | '',
		country: '' as CountryId | '',
		city: '' as CityId | ''
	});

	let t = $derived(translations[locale]);
	let result = $derived(mode === 'random' && randomBeer ? randomBeer : filterBeer(answers));
	// Recomputes once beersReady flips true (beers[] is populated by then).
	let typeCounts = $derived(beersReady ? countByType() : null);
	let colorCounts = $derived(beersReady ? countByColor(answers.type) : null);

	const TYPE_OPTIONS: TypeId[] = ['aromatic', 'bitter', 'fruity', 'gluten-free', 'crispy', 'wheat'];
	const MODE_OPTIONS: { id: Mode; emoji: string }[] = [
		{ id: 'quiz', emoji: '📋' },
		{ id: 'country', emoji: '🌍' },
		{ id: 'style', emoji: '🍺' },
		{ id: 'random', emoji: '🎲' }
	];
	const RANDOM_OPTIONS: { id: 'slot' | 'dice'; emoji: string }[] = [
		{ id: 'slot', emoji: '🎰' },
		{ id: 'dice', emoji: '🎲' }
	];

	function goTo(newStep: number, dir: 1 | -1 = 1) {
		direction = dir;
		step = newStep;
	}

	const SLIDE_GAP = 32;

	function slide(node: Element, { dir, duration = 380 }: { dir: 1 | -1; duration?: number }) {
		return {
			duration,
			easing: cubicInOut,
			css: (t: number, u: number) => {
				const offset = u * 100;
				const gap = u * SLIDE_GAP;
				return `transform: translateX(calc(${dir} * (${offset}% + ${gap}px))); opacity: ${t};`;
			}
		};
	}

	function handleBack() {
		switch (step) {
			case 1:
				goTo(0, -1);
				break;
			case 2:
				goTo(1, -1);
				break;
			case 3:
				goTo(2, -1);
				break;
			case 4: {
				const available = (
					Object.entries(countByColor(answers.type)) as [ColorId, number][]
				).filter(([, n]) => n > 0);
				goTo(available.length === 1 ? 2 : 3, -1);
				break;
			}
			case 5:
				goTo(mode === 'country' ? 1 : 4, -1);
				break;
			case 6:
				goTo(mode === 'random' ? 7 : mode === 'style' ? 2 : 5, -1);
				break;
			case 7:
				goTo(1, -1);
				break;
			case 8:
				goTo(7, -1);
				break;
			case 9:
				goTo(7, -1);
				break;
		}
	}

	function selectMode(m: Mode) {
		mode = m;
		answers = { type: '', color: '', abv: '', country: '', city: '' };
		randomBeer = null;
		diceValue = null;
		diceRolling = false;
		if (m === 'random') {
			goTo(7);
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
		diceValue = null;
		diceRolling = false;
		goTo(0, -1);
	}

	function beerForTap(tap: number): Beer {
		return beers[(tap - 1) % beers.length];
	}

	function pullSlotLever() {
		randomBeer = beers[Math.floor(Math.random() * beers.length)];
		goTo(6, 1);
	}

	function rollDice() {
		if (diceRolling) return;
		diceRolling = true;
		diceValue = null;
		let ticks = 0;
		const maxTicks = 16;
		const interval = setInterval(() => {
			diceValue = 1 + Math.floor(Math.random() * 20);
			ticks++;
			if (ticks >= maxTicks) {
				clearInterval(interval);
				diceRolling = false;
				randomBeer = beerForTap(diceValue!);
			}
		}, 60);
	}
</script>

<div class="relative overflow-hidden bg-white" style="height: 100dvh">
	<div class="fixed bottom-4 right-4 z-50 flex gap-3">
		<button
			onclick={() => (locale = 'gr')}
			aria-label="Ελληνικά"
			class="text-5xl leading-none p-2 rounded-full transition-opacity"
			class:opacity-100={locale === 'gr'}
			class:opacity-40={locale !== 'gr'}
		>
			🇬🇷
		</button>
		<button
			onclick={() => (locale = 'en')}
			aria-label="English"
			class="text-5xl leading-none p-2 rounded-full transition-opacity"
			class:opacity-100={locale === 'en'}
			class:opacity-40={locale !== 'en'}
		>
			🇺🇸
		</button>
	</div>

	{#if loadError}
		<div class="h-full flex items-center justify-center px-6 text-center">
			<p class="font-fredoka font-black text-brand-pink">Failed to load beers: {loadError}</p>
		</div>
	{:else if !beersReady}
		<div class="h-full flex items-center justify-center">
			<span class="text-6xl animate-bounce">🍺</span>
		</div>
	{:else if step === 0}
		<!-- Landing -->
		{#key step}
			<div
				class="absolute inset-0 overflow-hidden"
				in:slide={{ dir: direction }}
				out:slide={{ dir: direction === 1 ? -1 : 1 }}
			>
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
					</div>

					<div class="shrink-0 py-3 text-center">
						<span class="font-fredoka font-black text-2xl">
							<span class="text-brand-pink">LoVeCRAFT</span>
							<span class="text-brand-green"> BEeRS</span>
						</span>
					</div>
				</div>
			</div>
		{/key}
	{:else}
		<QuestionLayout
			onback={handleBack}
			backLabel={t.back}
			onhome={reset}
			homeLabel={t.home}
		>
			{#key step}
				<div
					class="absolute inset-0 overflow-hidden"
					in:slide={{ dir: direction }}
					out:slide={{ dir: direction === 1 ? -1 : 1 }}
				>
					{#if step === 1}
						<!-- Mode selection: how do you want to find your beer? -->
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
					{:else if step === 2}
						<!-- Q1: What kind of beer do you like? -->
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
											answers.color = '';
											if (mode === 'style') {
												goTo(6);
												return;
											}
											const available = (
												Object.entries(countByColor(typeId)) as [ColorId, number][]
											).filter(([, n]) => n > 0);
											if (available.length === 1) {
												answers.color = available[0][0];
												goTo(4);
											} else {
												goTo(3);
											}
										}}
										class="relative bg-brand-green font-fredoka font-black text-2xl text-black py-4 rounded-2xl leading-tight flex items-center justify-center"
									>
										<span>{t.q1.options[typeId]}</span>
										{#if typeCounts}
											<span
												class="absolute right-2.5 top-1/2 -translate-y-1/2 grid place-items-center w-8 h-8 rounded-full bg-brand-pink text-white text-xs"
											>
												{typeCounts[typeId]}
											</span>
										{/if}
									</button>
								{/each}
							</div>
						</div>
					{:else if step === 3}
						<!-- Q2: Beer color -->
						<div class="w-full max-w-xl mx-auto flex flex-col gap-3">
							<h2
								class="font-fredoka font-black text-brand-pink text-center shrink-0"
								style="font-size: clamp(1.8rem, 8vw, 2.8rem)"
							>
								{t.q2.question}
							</h2>
							<BeerGlass
								selected={answers.color}
								counts={colorCounts}
								onselect={(c) => (answers.color = c)}
							/>
							<button
								onclick={() => goTo(4)}
								disabled={!answers.color}
								class="bg-brand-green font-fredoka font-black text-3xl text-black py-3 rounded-2xl w-full disabled:opacity-40 shrink-0"
							>
								{t.q2.next}
							</button>
						</div>
					{:else if step === 4}
						<!-- Q3: ABV strength -->
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
					{:else if step === 5}
						<!-- Q4: Country -->
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
					{:else if step === 7}
						<!-- Random: choose how to pick -->
						<div class="w-full max-w-xl mx-auto flex flex-col gap-4">
							<h2
								class="font-fredoka font-black text-brand-pink text-center shrink-0"
								style="font-size: clamp(1.8rem, 8vw, 2.8rem)"
							>
								{t.random.question}
							</h2>
							<div class="flex flex-col gap-3">
								{#each RANDOM_OPTIONS as { id, emoji } (id)}
									<button
										onclick={() => goTo(id === 'slot' ? 8 : 9)}
										class="bg-brand-green rounded-2xl py-3 px-5 flex items-center gap-4 text-left"
									>
										<span class="text-4xl shrink-0">{emoji}</span>
										<span class="flex flex-col">
											<span class="font-fredoka font-black text-2xl text-black leading-tight">
												{t.random.options[id].label}
											</span>
											<span class="font-fredoka font-medium text-sm text-black/60">
												{t.random.options[id].desc}
											</span>
										</span>
									</button>
								{/each}
							</div>
						</div>
					{:else if step === 8}
						<!-- Random: slot machine (decorative picture only) -->
						<div class="w-full max-w-xl mx-auto flex flex-col items-center gap-6">
							<h2
								class="font-fredoka font-black text-brand-pink text-center shrink-0"
								style="font-size: clamp(1.8rem, 8vw, 2.8rem)"
							>
								{t.random.options.slot.label}
							</h2>
							<div
								class="w-48 h-48 rounded-full bg-gray-100 flex items-center justify-center shrink-0"
							>
								<span class="text-8xl">🎰</span>
							</div>
							<button
								onclick={pullSlotLever}
								class="bg-brand-green font-fredoka font-black text-3xl text-black py-3 rounded-2xl w-full shrink-0"
							>
								{t.random.slotCta}
							</button>
						</div>
					{:else if step === 9}
						<!-- Random: roll a d20 for one of 20 taps -->
						<div class="w-full max-w-xl mx-auto flex flex-col items-center gap-6">
							<h2
								class="font-fredoka font-black text-brand-pink text-center shrink-0"
								style="font-size: clamp(1.8rem, 8vw, 2.8rem)"
							>
								{t.random.options.dice.label}
							</h2>
							<button
								onclick={rollDice}
								disabled={diceRolling}
								class="w-40 h-40 rounded-3xl bg-brand-green flex items-center justify-center shrink-0 disabled:opacity-70"
							>
								<span class="font-fredoka font-black text-6xl text-black">
									{diceValue ?? '🎲'}
								</span>
							</button>
							<p class="font-fredoka font-black text-xl text-center shrink-0 h-7">
								{#if diceRolling}
									{t.random.rolling}
								{:else if diceValue !== null}
									{t.random.tapLabel} #{diceValue}
								{:else}
									{t.random.diceCta}
								{/if}
							</p>
							{#if diceValue !== null && !diceRolling}
								<button
									onclick={() => goTo(6, 1)}
									class="bg-brand-pink font-fredoka font-black text-2xl text-white py-3 rounded-2xl w-full shrink-0"
								>
									{t.random.seeResult}
								</button>
							{/if}
						</div>
					{:else if step === 6}
						<!-- Result -->
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
								class="bg-brand-pink font-fredoka font-black text-2xl text-white py-3 rounded-full w-full shrink-0"
							>
								{t.result.explore}
							</button>
						</div>
					{/if}
				</div>
			{/key}
		</QuestionLayout>
	{/if}
</div>
