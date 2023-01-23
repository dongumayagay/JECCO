<script>
    import SideNavAdmin from "$lib/components/SideNavAdmin.svelte";
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
            await signOut(auth)
            await goto('/');
            return;
        
        }
        show = true;
    }

    $: checkIfAdmin($userStore)
    
</script>
    {#if show}
    <main class="flex" >

        <section class="w-64 h-screen px-4 py-8 overflow-y-auto pr-20">
        <SideNavAdmin/>
        </section>
    
    
    <section class="flex flex-col w-full h-screen p-6 ml-8 overflow-y-auto bg-gray-200 ">

        <slot />           


    </section>
    </main>
        
    {/if}

