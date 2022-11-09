<script>
	import { goto } from '$app/navigation';
	let username = '';
	let password = '';

	async function login() {
		console.log(username, password);
		await goto('/client');
	}
</script>

<main class="h-full grid place-items-center">
	<form
		class=" bg-green-300 w-full max-w-sm flex flex-col p-4 gap-2"
		on:submit|preventDefault={login}
	>
		<h1 class="text-center font-bold">Client Login</h1>
		<input class=" rounded-lg" type="text" placeholder="username" bind:value={username} required />
		<input class=" rounded-lg" type="password" placeholder="Password" bind:value={password} required />
		<button class="bg-blue-500 py-2 rounded-lg text-white" type="submit">Login</button>
	</form>
</main>
