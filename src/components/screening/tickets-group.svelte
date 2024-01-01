<script lang="ts">
	import type { TicketType } from '../../types/reservation.types';
	import Select from '../form/select.svelte';

	export let selectedSeats: Record<string, TicketType>;
	export let updateSelectedSeats: (seats: Record<string, TicketType>) => void;

	function handleChange(e: Event, key: string) {
		if (e.target instanceof HTMLSelectElement) {
			selectedSeats[key].type = e.target?.value;
			updateSelectedSeats(selectedSeats);
		}
	}
</script>

{#each Object.keys(selectedSeats) as key}}
	<Select
		label="Rodzaj biletu dla miejsca {key}"
		value={selectedSeats[key].type}
		on:change={(e) => {
			return handleChange(e, key);
		}}
	>
		<option value="1">Normalny</option>
		<option value="2">Ulgowy</option>
	</Select>
{/each}
