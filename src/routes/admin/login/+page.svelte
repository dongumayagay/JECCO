<script>
	import { goto } from '$app/navigation';
	let username = '';
	let password = '';

	async function login() {
		console.log(username, password);
		await goto('/admin');
	}
</script>

<main class=" bg-gray-200 h-full flex">

	<div class=" flex-1 grid place-items-center ">
		<img class=" w-lg " src="/Admin.svg" alt="">
	</div>

<div class="flex flex-1  ">
	<div class=" flex-1 grid place-items-center p-10">
		<form class=" bg-white rounded-lg shadow-lg w-96 flex flex-col p-4 gap-4" on:submit|preventDefault={login}>
		<h1 class="text-center font-bold">Admin Login</h1>
		<input class=" rounded-lg" type="text" placeholder="username" bind:value={username} />
		<input class=" rounded-lg" type="password" placeholder="Password" bind:value={password} /> 
		<button class="bg-blue-500 py-2 mt-4 rounded-lg text-white transition duration-200 ease-in-out hover:bg-blue-900" type="submit">Login</button>
		</form>
	</div>
</div>

</main>