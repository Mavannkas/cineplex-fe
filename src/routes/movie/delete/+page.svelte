<script lang="ts">
	import { onMount } from 'svelte';
	import { PUBLIC_API_ENDPOINT } from '$env/static/public';

	let movies = [];

	onMount(async () => {
		try {
			const response = await fetch(`${PUBLIC_API_ENDPOINT}/movies`);
			if (response.ok) {
				movies = await response.json();
			} else {
				console.error('Wystąpił błąd podczas pobierania listy filmów.');
			}
		} catch (error) {
			console.error('Wystąpił błąd sieciowy:', error);
		}
	});

	function deleteMovie(movieId) {
		// Wysyłanie żądania usunięcia filmu do backendu
		fetch(`${PUBLIC_API_ENDPOINT}/movie/${movieId}`, {
			method: 'DELETE'
		})
			.then((response) => {
				if (response.ok) {
					console.log('Film usunięty pomyślnie.');
				} else {
					console.error('Wystąpił błąd podczas usuwania filmu.');
				}
			})
			.catch((error) => {
				console.error('Wystąpił błąd sieciowy:', error);
			});
	}
</script>

<!-- Strona z listą filmów i przyciskiem usuwania -->
<div class="w-full max-w-4xl">
	<h1
		class="mb-4 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl"
	>
		Lista filmów
	</h1>
	{#if movies.length === 0}
		<p class="text-center text-gray-700">Brak dostępnych filmów.</p>
	{:else}
		<ul class="divide-y divide-gray-300">
			{#each movies as movie (movie.id)}
				<li class="py-4">
					<h2 class="text-2xl font-semibold mb-2">{movie.title}</h2>
					<p class="text-gray-500">Rok produkcji: {movie.production_year}</p>
					<p class="text-gray-500">Reżyser: {movie.director}</p>

					<!-- Przycisk usuwania -->
					<button
						class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="button"
						on:click={() => deleteMovie(movie.id)}
					>
						Usuń film
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>
