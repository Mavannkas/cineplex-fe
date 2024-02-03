<script lang="ts">
	import { onMount } from 'svelte';
	import { PUBLIC_API_ENDPOINT } from '$env/static/public';
	import { type MovieCreateParams } from '../../../types/movie.types';

	// const PUBLIC_API_ENDPOINT = 'http://localhost:3000';

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

	let isValid = false;

	$: isValid =
		title !== '' &&
		description !== '' &&
		minimumAge > 0 &&
		productionYear > 0 &&
		duration > 0 &&
		director !== '' &&
		productionCountry !== '' &&
		premiereDate !== '' &&
		cast !== '';

	async function submitForm() {
		if (!isValid) {
			return;
		}

		const requestBody = {
			title,
			description,
			minimum_age: minimumAge,
			production_year: productionYear,
			duration,
			director,
			production_country: productionCountry,
			premiere_date: new Date(premiereDate) as Date,
			cast
		};

		try {
			const response = await fetch(`${PUBLIC_API_ENDPOINT}/movie`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ ...requestBody } satisfies MovieCreateParams)
			});

			if (response.ok) {
				console.log('Film dodany pomyślnie!');
			} else {
				console.error('Wystąpił błąd podczas dodawania filmu.');
			}
		} catch (error) {
			console.error('Wystąpił błąd sieciowy:', error);
		}
	}
</script>

<div class="w-full max-w-4xl">
	<h1
		class="mb-4 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl"
	>
		Dodawanie filmu
	</h1>
	<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
		<div class="mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="title"> Tytuł filmu </label>
			<input
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id="title"
				type="text"
				bind:value={title}
				placeholder="Wprowadź tytuł filmu"
			/>
		</div>
		<div class="mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="description"> Opis </label>
			<textarea
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id="description"
				bind:value={description}
				placeholder="Wprowadź opis filmu"
			></textarea>
		</div>
		<div class="mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="minimumAge">
				Minimalny wiek
			</label>
			<input
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id="minimumAge"
				type="number"
				bind:value={minimumAge}
				placeholder="Wprowadź minimalny wiek"
			/>
		</div>
		<div class="mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="productionYear">
				Rok produkcji
			</label>
			<input
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id="productionYear"
				type="number"
				bind:value={productionYear}
				placeholder="Wprowadź rok produkcji"
			/>
		</div>
		<div class="mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="duration">
				Czas trwania (minuty)
			</label>
			<input
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id="duration"
				type="number"
				bind:value={duration}
				placeholder="Wprowadź czas trwania"
			/>
		</div>
		<div class="mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="director"> Reżyser </label>
			<input
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id="director"
				type="text"
				bind:value={director}
				placeholder="Wprowadź reżysera"
			/>
		</div>
		<div class="mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="productionCountry">
				Kraj produkcji
			</label>
			<input
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id="productionCountry"
				type="text"
				bind:value={productionCountry}
				placeholder="Wprowadź kraj produkcji"
			/>
		</div>
		<div class="mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="premiereDate">
				Data premiery
			</label>
			<input
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id="premiereDate"
				type="date"
				bind:value={premiereDate}
				placeholder="Wprowadź datę premiery"
			/>
		</div>
		<div class="mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="cast"> Obsada </label>
			<input
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id="cast"
				type="text"
				bind:value={cast}
				placeholder="Wprowadź obsadę"
			/>
		</div>

		<div class="flex items-center justify-center mt-8">
			<button
				class="bg-blue hover:bg-blue-hover text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-30"
				type="submit"
				on:click={submitForm}
				disabled={!isValid}
			>
				Dodaj film
			</button>
		</div>
	</form>
</div>
