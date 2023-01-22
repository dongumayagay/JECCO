<script>
	import { goto } from '$app/navigation';
	import {userStore} from '$lib/store.js';
	import {signInWithEmailAndPassword} from 'firebase/auth';
	import {auth, db} from '$lib/firebase/client.js';
	import {getDoc,doc} from 'firebase/firestore';
	import {signOut} from 'firebase/auth'

	let username = '';
	let password = '';

	async function login() {
		try {
		 	const userCredential = await signInWithEmailAndPassword(auth,username,password);
			
		} catch (error) {

			console.log(error);
			alert(error);
		}
	}

	async function checkIfAdmin(_){
        if($userStore===undefined || $userStore===null){
            return;
        }

      const snapshot = await getDoc(doc(db,'userinfo',$userStore.uid))
      const isAdmin = snapshot.get('admin')

        if(isAdmin===undefined || isAdmin===false){
            await signOut(auth)
            await goto('/');
            return;
        }

        await goto('/kanrisha');
    }
	$: checkIfAdmin($userStore)

</script>

<main class=" bg-gray-200 h-screen flex">

	<div class=" flex-1 grid place-items-center ">
		<img class=" w-lg " src="/Admin.svg" alt="">
	</div>

<div class="flex flex-1  ">
	<div class=" flex-1 grid place-items-center p-10">
		<form class=" bg-white rounded-lg shadow-lg w-96 flex flex-col p-4 gap-4" on:submit|preventDefault={login}>
		<h1 class="text-center font-bold">Admin Login</h1>
		<input class=" rounded-lg" type="email" placeholder="Email" bind:value={username} required />
		<input class=" rounded-lg" type="password" placeholder="Password" bind:value={password} required /> 
		<button class="bg-blue-500 py-2 mt-4 rounded-lg text-white transition duration-200 ease-in-out hover:bg-blue-900" type="submit">Login</button>
		</form>
	</div>
</div>

</main>