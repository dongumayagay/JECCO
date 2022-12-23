<script>
    import SideNavAdmin from "$lib/components/SideNavAdmin.svelte";
    import {userStore} from '$lib/store.js';
    import {goto} from '$app/navigation';
    import {getDoc,doc} from 'firebase/firestore';
    import {db} from '$lib/firebase/client.js';
    
    let show = false;

    async function checkIfAdmin(_){
        if($userStore===undefined){
            return;
        }
        if($userStore===null){
           await goto('/admin');
           return;
        }

      const snapshot = await getDoc(doc(db,'userinfo',$userStore.uid))
      const isAdmin = snapshot.get('admin')

        if(isAdmin===undefined || isAdmin===false){
            
            await goto('/admin');
            return;
        
        }
        show = true;
    }

    $: checkIfAdmin($userStore)
    
</script>
    {#if show}
    <main class="flex" >

        <section class="flex flex-col w-64 h-full px-4 py-8 overflow-y-auto md:mr-6">
        <SideNavAdmin/>
        </section>
    
    
    <section class="flex flex-col w-full h-screen p-6 ml-8 overflow-y-auto bg-gray-200 ">
        <slot />           


    </section>
    </main>
        
    {/if}

