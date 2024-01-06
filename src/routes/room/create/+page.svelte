<script lang="ts">
	import { PUBLIC_API_ENDPOINT } from '$env/static/public';
	import Input from '../../../components/form/input.svelte';
	import Select from '../../../components/form/select.svelte';
	import SeatsArrangement from '../../../components/screening/seats-arrangement.svelte';
	import Popup from '../../../components/util/popup.svelte';
	import { SeatStatus, type RoomCreateParams } from '../../../types/room.types';

	// Initial values
	let location: string = '2';
	let roomNumber: number = 1;
	let columnsCount: number = 1;
	let rowsCount: number = 1;
	let seats: SeatStatus[][] = [];

	$: updateRoomSize(rowsCount, columnsCount);

	$: isValid =
		roomNumber > 0 &&
		columnsCount > 0 &&
		rowsCount > 0 &&
		seats.length > 0 &&
		seats[0].length > 0 &&
		seats.flat().filter((seat) => seat === SeatStatus.RESERVED_SEAT).length > 0;

	let showPopup = false;
	let popupTitle = '';
	let popupCloseAction = () => {};
	let popupContent = '';

	function updateRoomSize(rowsCount: number, columnsCount: number) {
		if (rowsCount < 1 || columnsCount < 1) return;
		seats = createSeats(rowsCount, columnsCount);
	}

	function createSeats(rowsCount: number, columnsCount: number) {
		const newSeats: SeatStatus[][] = [];
		for (let i = 0; i < rowsCount; i++) {
			newSeats[i] = [];
			for (let j = 0; j < columnsCount; j++) {
				newSeats[i][j] = SeatStatus.FREE_SEAT;
			}
		}
		return newSeats;
	}

	function onAction(row: number, col: number) {
		toggleSeatStatus(row, col);
	}

	function toggleSeatStatus(row: number, col: number) {
		if (seats[row][col] === SeatStatus.FREE_SEAT) {
			seats[row][col] = SeatStatus.RESERVED_SEAT;
		} else if (seats[row][col] === SeatStatus.RESERVED_SEAT) {
			seats[row][col] = SeatStatus.FREE_SEAT;
		}
		seats = seats;
	}

	function switchAllSeats(state: number) {
		return () => {
			for (let i = 0; i < seats.length; i++) {
				for (let j = 0; j < seats[i].length; j++) {
					seats[i][j] = state;
				}
			}
			seats = seats;
		};
	}

	async function submit(e: Event) {
		e.preventDefault();
		const seatsToSave = seats.map((row) =>
			row.map((seat) => (seat === SeatStatus.RESERVED_SEAT ? 1 : 0))
		);
		try {
			const result = await fetchRoom(seatsToSave);
			handleFetchResult(result);
		} catch (error) {
			handleFetchError();
		} finally {
			showPopup = true;
		}
	}

	async function fetchRoom(seatsToSave: number[][]) {
		return await fetch(`${PUBLIC_API_ENDPOINT}/room`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				number: roomNumber,
				location: +location,
				seat_arrangement: seatsToSave,
				seating_capacity: seatsToSave.flat().filter((seat) => seat === 1).length
			} satisfies RoomCreateParams)
		});
	}

	async function handleFetchResult(result: Response) {
		const json = await result.json();
		if (result.status === 201) {
			popupTitle = 'Sukces!';
			popupContent = `Sala z ${json.id} została utworzona!`;
			popupCloseAction = () => {
				window.location.href = '/room';
			};
		} else {
			popupTitle = 'Błąd!';
			popupContent = json.message;
			popupCloseAction = () => {
				showPopup = false;
			};
		}
	}

	function handleFetchError() {
		popupTitle = 'Błąd!';
		popupContent = 'Wystąpił nieznany błąd!';
		popupCloseAction = () => {
			showPopup = false;
		};
	}
</script>

<div class="w-full max-w-4xl">
	<h1
		class="mb-4 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl"
	>
		Tworzenie sali
	</h1>
	<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
		<Input label="Numer sali" type="number" bind:value={roomNumber} min={1} />
		<Select label="Lokalizacja sali" bind:value={location}>
			<option value="1">Poznań</option>
			<option value="2">Wrocław</option>
			<option value="3">Wałbrzych</option>
			<option value="4">Warszawa</option>
		</Select>
		<Input label="Ilosc kolumn" type="number" bind:value={columnsCount} min={1} />
		<Input label="Ilosc rzedow" type="number" bind:value={rowsCount} min={1} />
		<SeatsArrangement bind:grid={seats} {onAction} />
		<div class="flex text-sm justify-between">
			<button
				class="mr-4 bg-blue hover:bg-blue-hover text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				type="button"
				on:click={switchAllSeats(1)}
			>
				Odznacz wszystkie miejsca
			</button>
			<button
				class="bg-blue hover:bg-blue-hover text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				type="button"
				on:click={switchAllSeats(3)}
			>
				Zaznacz wszystkie miejsca
			</button>
		</div>
		<div class="flex items-center justify-center mt-8">
			<button
				class="bg-blue hover:bg-blue-hover text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-30"
				type="submit"
				on:click={submit}
				disabled={!isValid}
			>
				Stwórz salę
			</button>
		</div>
	</form>
</div>

<Popup bind:show={showPopup} onClose={popupCloseAction} title={popupTitle}>
	<p>{popupContent}</p>
</Popup>
