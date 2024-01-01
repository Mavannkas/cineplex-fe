<script lang="ts">
	export let type = 'text';
	export let value: string | null | number = type === 'text' ? '' : null;
	export let error = '';
	export let label = '';
	export let placeholder = '';
	export let max: number | undefined = undefined;
	export let min: number | undefined = undefined;

	$: validate(value);

	function validate(value: string | null | number) {
		if (typeof value === 'number') {
			if (min && value < min) {
				error = `Wartość musi być większa od ${min}`;
			} else if (max && value > max) {
				error = `Wartość musi być mniejsza od ${max}`;
			} else {
				error = '';
			}
		} else {
			if (value === '') {
				error = 'To pole jest wymagane';
			} else {
				error = '';
			}
		}
	}

	function handleInput({ target }: { target: HTMLInputElement }) {
		if (type === 'number') {
			value = target?.value === '' ? null : target.valueAsNumber;
		} else {
			value = target.value;
		}
	}
</script>

<label class="mb-4">
	{#if label}
		<span class="block mb-2 text-sm font-medium text-gray-900">{label}</span>
	{/if}
	<input
		class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
		class:error
		{type}
		{placeholder}
		{value}
		{max}
		{min}
		on:input={handleInput}
		on:input
		on:blur
		on:change
	/>
	{#if error}
		<span class="block text-rose-300">{error}</span>
	{/if}
</label>
