<script>
	import { goto } from '$app/navigation';
	let ausername = '';
	let apassword = '';

	async function login() {
		console.log(ausername, apassword);
		await goto('/admin');
	}
</script>

<main class="h-full grid place-items-center">
	<form
		class=" bg-red-500 w-full max-w-sm flex flex-col p-4 gap-2"
		on:submit|preventDefault={login}
	>
		<h1 class="text-center font-bold">Admin Login</h1>
		<input class=" rounded-lg" type="text" placeholder="username" bind:value={ausername} required />
		<input
			class="rounded-lg"
			type="password"
			placeholder="Password"
			bind:value={apassword}
			required
		/>
		<button class="bg-blue-500 py-2 rounded-lg text-white" type="submit">Login</button>
	</form>
</main>
