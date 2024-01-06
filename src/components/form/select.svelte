<script lang="ts">
	import type { ChangeEventHandler } from 'svelte/elements';

	export let value: string = '';
	export let error = '';
	export let label = '';
</script>

<label class="block pb-4">
	{#if label}
		<span class="block mb-2 text-sm font-medium text-gray-900">{label}</span>
	{/if}
	<select
		class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
		class:error
		bind:value
		on:change
	>
		<slot />
	</select>
	{#if error}
		<span class="block error-text">{error}</span>
	{/if}
</label>
