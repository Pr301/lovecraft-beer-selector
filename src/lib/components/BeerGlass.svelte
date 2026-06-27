<script lang="ts">
	import type { ColorId } from '$lib/data/beers'

	let {
		selected = '',
		onselect,
	}: {
		selected: ColorId | ''
		onselect: (id: ColorId) => void
	} = $props()

	const BANDS: { id: ColorId; label: string; fill: string; textColor: string }[] = [
		{ id: 'pale-lager', label: 'PALE LAGER', fill: '#F5C842', textColor: '#000' },
		{ id: 'blonde-ale', label: 'BLONDE ALE', fill: '#EDE26A', textColor: '#000' },
		{ id: 'pale-ale-ipa', label: 'PALE ALE/IPA', fill: '#E8A830', textColor: '#000' },
		{ id: 'amber-ale', label: 'AMBER ALE', fill: '#C85A1A', textColor: '#fff' },
		{ id: 'red-ale', label: 'RED ALE', fill: '#A01010', textColor: '#fff' },
		{ id: 'brown-ale', label: 'BROWN ALE', fill: '#6B2A0A', textColor: '#fff' },
		{ id: 'porter', label: 'PORTER', fill: '#3A1A08', textColor: '#fff' },
		{ id: 'stout', label: 'STOUT', fill: '#1A0A04', textColor: '#fff' },
	]

	const W = 240
	const GLASS_TOP_Y = 90
	const GLASS_BOT_Y = 400
	const GLASS_TOP_L = 15
	const GLASS_TOP_R = 225
	const GLASS_BOT_L = 70
	const GLASS_BOT_R = 170
	const GLASS_HEIGHT = GLASS_BOT_Y - GLASS_TOP_Y
	const BAND_H = GLASS_HEIGHT / BANDS.length

	function lx(y: number) {
		return GLASS_TOP_L + ((GLASS_BOT_L - GLASS_TOP_L) * (y - GLASS_TOP_Y)) / GLASS_HEIGHT
	}
	function rx(y: number) {
		return GLASS_TOP_R - ((GLASS_TOP_R - GLASS_BOT_R) * (y - GLASS_TOP_Y)) / GLASS_HEIGHT
	}

	function bandPoints(i: number) {
		const y1 = GLASS_TOP_Y + i * BAND_H
		const y2 = y1 + BAND_H
		return `${lx(y1)},${y1} ${rx(y1)},${y1} ${rx(y2)},${y2} ${lx(y2)},${y2}`
	}

	function bandMidY(i: number) {
		return GLASS_TOP_Y + i * BAND_H + BAND_H * 0.58
	}
</script>

<svg
	viewBox="0 0 {W} 430"
	class="w-full max-w-xs max-h-[45vh] mx-auto cursor-pointer select-none"
	aria-label="Beer color selector"
>
	<!-- Foam -->
	<ellipse cx={W / 2} cy="62" rx="107" ry="32" fill="#F5F0DC" />
	<ellipse cx={W / 2} cy="62" rx="107" ry="32" fill="none" stroke="#888" stroke-width="1.5" />

	<!-- Color bands as trapezoid polygons -->
	{#each BANDS as band, i (band.id)}
		<polygon
			points={bandPoints(i)}
			fill={band.fill}
			opacity={!selected || selected === band.id ? 1 : 0.55}
			onclick={() => onselect(band.id)}
			role="button"
			tabindex="0"
			aria-label={band.label}
			onkeydown={(e) => e.key === 'Enter' && onselect(band.id)}
		/>
		<text
			x={W / 2}
			y={bandMidY(i)}
			text-anchor="middle"
			fill={band.textColor}
			font-size="9.5"
			font-weight="bold"
			font-family="sans-serif"
			pointer-events="none"
		>
			{band.label}
		</text>
		{#if selected === band.id}
			<polygon
				points={bandPoints(i)}
				fill="none"
				stroke="white"
				stroke-width="4"
				pointer-events="none"
			/>
		{/if}
	{/each}

	<!-- Glass outline on top -->
	<polygon
		points="{GLASS_TOP_L},{GLASS_TOP_Y} {GLASS_TOP_R},{GLASS_TOP_Y} {GLASS_BOT_R},{GLASS_BOT_Y} {GLASS_BOT_L},{GLASS_BOT_Y}"
		fill="none"
		stroke="black"
		stroke-width="3"
		pointer-events="none"
	/>
	<!-- Glass rim line -->
	<line x1={GLASS_TOP_L} y1={GLASS_TOP_Y} x2={GLASS_TOP_R} y2={GLASS_TOP_Y} stroke="black" stroke-width="3" pointer-events="none" />
</svg>
