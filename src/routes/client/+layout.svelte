<script>
	import '../../app.postcss';
	import SideNav from '$lib/components/SideNav.svelte';
</script>

<main class=" flex">
	<section class="flex flex-col w-64 h-full px-4 py-8 overflow-y-auto">
		<SideNav/>
	</section>
	<slot />
</main>