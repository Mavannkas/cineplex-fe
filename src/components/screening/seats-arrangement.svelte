<script lang="ts">
	import type { SeatStatus } from '../../types/room.types';

	export let grid: SeatStatus[][];

	/**
	 * @type {(a: number, b: number) => void}
	 */
	export let onAction = (a: number, b: number) => {};

	let svgHeight: number;
	let svgWidth: number;

	$: {
		svgHeight = grid.length * 22;
		svgWidth = grid[0].length * 22 + 15;
	}
	/**
	 * @param {number} row
	 * @param {number} col
	 */
	function handleClick(row: number, col: number) {
		onAction(row, col);
	}
</script>

<div class="mb-4">
	<label class="block text-gray-700 text-sm font-bold mb-2" for="username"> Wybierz miejsca </label>
	<div class="overflow-auto bg-gray-100 p-2">
		<svg width={svgWidth} height={svgHeight} class="m-auto" style="width: {svgWidth};">
			{#each grid as row, rowIndex}
				<text
					x="10"
					y={rowIndex * 22 + 15}
					fill="black"
					font-size="12"
					text-anchor="end"
					style="pointer-events: none;user-select: none;"
				>
					{rowIndex}
				</text>
				{#each row as cell, colIndex}
					{#if cell === 0}
						<!-- Transparent color -->
						<rect
							class="mesh-element"
							width="20"
							height="20"
							x={colIndex * 22 + 15}
							y={rowIndex * 22}
							fill="transparent"
						/>
					{:else if cell === 1 || cell === 3}
						<!-- White color -->
						<rect
							class="mesh-element"
							width="20"
							height="20"
							x={colIndex * 22 + 15}
							y={rowIndex * 22}
							fill={cell == 1 ? 'white' : '#00B4D8'}
							on:click={() => handleClick(rowIndex, colIndex)}
							on:keydown={(event) => {
								if (event.key === 'Enter') handleClick(rowIndex, colIndex);
							}}
							role="button"
							tabindex="0"
						>
						</rect>
						{#if cell === 3}
							<text
								x={colIndex * 22 + 10 + 15}
								y={rowIndex * 22 + 15}
								fill="white"
								font-size="12"
								text-anchor="middle"
								style="pointer-events: none;user-select: none;"
							>
								{colIndex}
							</text>
						{/if}
					{:else if cell === 2}
						<!-- Gray color -->
						<rect
							class="mesh-element"
							width="20"
							height="20"
							x={colIndex * 22 + 15}
							y={rowIndex * 22}
							fill="gray"
							on:click={() => handleClick(rowIndex, colIndex)}
							on:keydown={(event) => {
								if (event.key === 'Enter') handleClick(rowIndex, colIndex);
							}}
							role="button"
							tabindex="0"
						/>
					{/if}
				{/each}
			{/each}
		</svg>
	</div>
</div>

<style>
	/* Add your styles for grid elements here */
	.mesh-element {
		width: 20px;
		height: 20px;
		margin: 1px;
	}

	.mesh-element:focus {
		outline: 1px solid #00b4d8;
	}
</style>
