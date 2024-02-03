<script lang="ts">
	import { onMount } from 'svelte';
	import { PUBLIC_API_ENDPOINT } from '$env/static/public';

	// Movie fields
	let title = '';
	let description = '';
	let minimumAge = 0;
	let productionYear = 0;
	let duration = 0;
	let director = '';
	let productionCountry = '';
	let premiereDate = '';
	let cast = '';

	let movieId = 0;

	onMount(async () => {
		// Pobierz id filmu z parametrów adresu URL
		const urlParams = new URLSearchParams(window.location.search);
		const idParam = urlParams.get('id');
		if (idParam) {
			movieId = parseInt(idParam, 10);
			await fetchMovieDetails();
		}
	});

	async function fetchMovieDetails() {
		try {
			const response = await fetch(`${PUBLIC_API_ENDPOINT}/movie/${movieId}`);
			if (response.ok) {
				const movieDetails = await response.json();
				// Ustaw pola formularza na podstawie pobranych danych
				({
					title,
					description,
					minimumAge,
					productionYear,
					duration,
					director,
					productionCountry,
					premiereDate,
					cast
				} = movieDetails);
			} else {
				console.error('Wystąpił błąd podczas pobierania szczegółów filmu.');
			}
		} catch (error) {
			console.error('Wystąpił błąd sieciowy:', error);
		}
	}

	async function submitForm() {
		// Tu dodaj logikę do wysłania danych do backendu i zapisania zmian
		// Przykład: możesz użyć fetch z metodą PUT lub PATCH
		try {
			const response = await fetch(`${PUBLIC_API_ENDPOINT}/movie/${movieId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					title,
					description,
					minimum_age: minimumAge,
					production_year: productionYear,
					duration,
					director,
					production_country: productionCountry,
					premiere_date: new Date(premiereDate),
					cast
				})
			});

			if (response.ok) {
				// Film został zaktualizowany pomyślnie
				console.log('Film zaktualizowany pomyślnie!');
			} else {
				console.error('Wystąpił błąd podczas aktualizacji filmu.');
			}
		} catch (error) {
			console.error('Wystąpił błąd sieciowy:', error);
		}
	}
</script>

<!-- Formularz edycji filmu -->
<div class="w-full max-w-4xl">
	<h1
		class="mb-4 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl"
	>
		Edycja filmu
	</h1>
	<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
		<!-- Pola formularza -->
		<!-- ... (zgodnie z interfejsem Movie) -->

		<!-- Przycisk "Zapisz zmiany" -->
		<div class="flex items-center justify-center mt-8">
			<button
				class="bg-blue hover:bg-blue-hover text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-30"
				type="submit"
				on:click={submitForm}
			>
				Zapisz zmiany
			</button>
		</div>
	</form>
</div>
