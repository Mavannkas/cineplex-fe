<script>
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1
		class="mb-4 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl"
	>
		Index
	</h1>
	<ul class="list-disc">
		<li>
			<a class="text-blue hover:text-blue-hover hover:underline" href="/screening/1"
				>przyklad rezerwacji miejsc</a
			>
		</li>
		<li>
			<a class="text-blue hover:text-blue-hover hover:underline" href="/room/create"
				>przyklad tworzenia sali</a
			>
		</li>
		<li>
			<a class="text-blue hover:text-blue-hover hover:underline" href="/movie/create"
				>przyklad dodawania filmów</a
			>
		</li>
		<li>
			<a class="text-blue hover:text-blue-hover hover:underline" href="/movie/fetch"
				>przykład wyświetlania filmów</a
			>
		</li>
		<li>
			<a class="text-blue hover:text-blue-hover hover:underline" href="/movie/update"
				>przykład edycja filmu</a
			>
		</li>
		<li>
			<a class="text-blue hover:text-blue-hover hover:underline" href="/movie/delete"
				>przykład usuwanie filmów</a
			>
		</li>
	</ul>
	<p></p>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
