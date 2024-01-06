<script lang="ts">
	import Input from '../../../components/form/input.svelte';
	import { PUBLIC_API_ENDPOINT } from '$env/static/public';
	import SeatsArrangement from '../../../components/screening/seats-arrangement.svelte';
	import TicketsGroup from '../../../components/screening/tickets-group.svelte';
	import type { ReservationParams, TicketType } from '../../../types/reservation.types';
	import Popup from '../../../components/util/popup.svelte';
	import { goto } from '$app/navigation';
	import { SeatStatus } from '../../../types/room.types';

	export let data;
	let grid = data.data ?? [];
	let error = data.error;
	console.log(grid);
	let name: string = '';
	let ticketsCount: number = 1;

	let showPopup = false;
	let popupTitle = '';
	let popupCloseAction = () => {};
	let popupContent = '';

	const maxAvailable = grid.reduce((acc, row) => {
		return acc + row.filter((cell) => cell === 1).length;
	}, 0);

	let selectedSeatsCount = 0;
	let selectedSeats: Record<`${number},${number}`, TicketType> = {};

	$: isValid =
		name.length > 0 &&
		ticketsCount > 0 &&
		Object.keys(selectedSeats).length <= ticketsCount &&
		Object.keys(selectedSeats).length > 0;

	$: totalPrice = Object.entries(selectedSeats).reduce((acc, seat) => {
		const type = +seat[1].type;
		const typePrice = type === 1 ? 1 : 0.5;
		return acc + typePrice * 20;
	}, 0);

	function updateSelectedSeats(seats: Record<`${number},${number}`, TicketType>) {
		selectedSeats = seats;
	}

	function onAction(row: number, col: number) {
		// Toggle the clicked state
		if (grid[row][col] === SeatStatus.FREE_SEAT) {
			if (selectedSeatsCount >= ticketsCount) {
				showErrorPopup('Już wybrałeś wszystkie miejsca!'); //add popup
				return;
			}
			grid[row][col] = SeatStatus.RESERVED_SEAT;
			selectedSeats[`${row},${col}`] = {
				type: '1'
			};
			selectedSeats = selectedSeats;
			selectedSeatsCount++;
		} else if (grid[row][col] === SeatStatus.RESERVED_SEAT) {
			grid[row][col] = SeatStatus.FREE_SEAT;
			delete selectedSeats[`${row},${col}`];
			selectedSeats = selectedSeats;
			selectedSeatsCount--;
		} else if (grid[row][col] === SeatStatus.BOOKED_SEAT) {
			showErrorPopup('To miejsce jest zajęte!'); //add popup
		}
	}

	async function onClick(e: Event) {
		e.preventDefault();
		const reservationParams = {
			screening_id: 1,
			owner: name
		};

		for (const reservation of Object.entries(selectedSeats)) {
			const seatID = reservation[0];
			const type = +reservation[1].type;
			if (!isIdValid(seatID)) {
				showErrorPopup('Nieprawidłowy identyfikator miejsca!');
				return;
			}

			await fetch(`${PUBLIC_API_ENDPOINT}/reservation`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					...reservationParams,
					type,
					seat: seatID
				} satisfies ReservationParams)
			});
		}

		showPopup = true;
		popupTitle = 'Sukces';
		popupContent = 'Rezerwacja przebiegła pomyślnie!';
		popupCloseAction = () => {
			cleanup();
			goto('/screening/1');
		};
	}

	function isIdValid(seatID: string): seatID is `${number},${number}` {
		const [row, col] = seatID.split(',').map((x) => +x);
		if (row < 0 || row > grid.length) {
			return false;
		}
		if (col < 0 || col > grid[0].length) {
			return false;
		}
		return true;
	}

	function showErrorPopup(content: string) {
		popupTitle = 'Uwaga';
		showPopup = true;
		popupContent = content;
		popupCloseAction = () => {};
	}

	function cleanup() {
		name = '';
		ticketsCount = 1;
		selectedSeatsCount = 0;
		selectedSeats = {};
		grid = grid.map((row) => row.map((cell) => (cell === 3 ? 2 : cell)));
	}
</script>

{#if error}
	<p class="text-red-500 text-xs italic">{error}</p>
{:else}
	<div class="w-full max-w-4xl">
		<h1
			class="mb-4 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl"
		>
			Akademia Pana Kleksa
		</h1>
		<p class="mb-6 text-center text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48">
			dzisiaj, 10:30, sala 9
		</p>
		<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
			<Input label="Imię i nazwisko" type="text" bind:value={name} placeholder="Pan Kleks" />
			<Input
				label="Ilosc biletow"
				type="number"
				bind:value={ticketsCount}
				max={maxAvailable}
				min={1}
			/>

			<SeatsArrangement {grid} {onAction} />
			<TicketsGroup {updateSelectedSeats} {selectedSeats} />
			<p class="mb-6 text-right text-lg font-normal text-gray-500 lg:text-xl mt-4">
				Cena: {totalPrice} zł
			</p>
			<div class="flex mt-4">
				<button
					class="bg-blue hover:bg-blue-hover margin-auto text-white font-bold py-2 px-4 rounded focus:ring-blue-500 focus:border-blue-500 margin-left disabled:opacity-30"
					type="submit"
					on:click={onClick}
					disabled={!isValid}
				>
					Kup bilety
				</button>
			</div>
		</form>
	</div>
{/if}

<Popup bind:show={showPopup} onClose={popupCloseAction} title={popupTitle}>
	<p>{popupContent}</p>
</Popup>

<style>
	.margin-left {
		margin-left: auto;
	}
</style>
