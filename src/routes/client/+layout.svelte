<script>
	import '../../app.postcss';
	import SideNav from '$lib/components/SideNav.svelte';
    import {userStore} from '$lib/store.js';
    import {goto} from '$app/navigation';
    import {getDoc,doc} from 'firebase/firestore';
    import {db} from '$lib/firebase/client.js';
    import {signOut} from 'firebase/auth'
    let show = false;

    async function checkIfAdmin(_){
        if($userStore===undefined){
            return;
        }
        if($userStore===null){
           await goto('/');
           return;
        }

      const snapshot = await getDoc(doc(db,'userinfo',$userStore.uid))
      const isAdmin = snapshot.get('admin')

        if(isAdmin===undefined || isAdmin===false){
            show = true;
            return;
        
        }
        await goto('/');
    }

    $: checkIfAdmin($userStore)
    
</script>

{#if show}
<main class=" flex">
	<section class="flex flex-col w-64 h-full px-4 py-8 overflow-y-auto">
		<SideNav/>
	</section>
	<slot />
</main>
{/if}