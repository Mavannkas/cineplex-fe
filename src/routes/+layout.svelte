<script>
	import { PUBLIC_API_ENDPOINT } from '$env/static/public';
	import '../app.css';
</script>

<main class="flex-container bg-gray-100">
	<!-- Main container with centered content -->
	<section class="flex-grow flex items-center justify-center">
		<slot />
	</section>

	<!-- Footer at the bottom -->
	<footer class="bg-gray-800 text-white p-4">
		<p class="text-center">Your Footer Content</p>
	</footer>
</main>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}

	main {
		display: flex;
		flex-direction: column;
		min-height: 100vh; /* Make sure the container takes at least the full height of the viewport */
	}

	html,
	body {
		height: 100%;
		margin: 0;
		padding: 0;
	}
</style>
