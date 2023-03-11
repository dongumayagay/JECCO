<script>
    import SideNavAdmin from "$lib/components/SideNavAdmin.svelte";
    import {userStore} from '$lib/store.js';
    import {goto} from '$app/navigation';
    import {getDoc,doc} from 'firebase/firestore';
    import {auth} from '$lib/firebase/client.js'
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
    <main class="md:flex hidden " >    
        <SideNavAdmin/>
    <section class="flex flex-col w-full h-screen p-6 overflow-y-auto bg-gray-100 ">
        <slot />           
    </section>
    </main>
    
    <main class=" flex justify-center items-center w-screen h-screen md:hidden " >
        <div class=" flex flex-col items-center gap-6">
             <img class=" w-48 " src="/accessdenied.svg" alt="">
             <p class=" flex text-2xl font-semibold max-sm:text-lg"> Please open on a `Larger Screen` </p>
        </div>
    </main>
    {/if}

