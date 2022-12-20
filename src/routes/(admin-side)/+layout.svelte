<script>
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
    <slot />        
    {/if}

