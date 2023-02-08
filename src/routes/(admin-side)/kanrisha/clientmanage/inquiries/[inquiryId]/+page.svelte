<script>
    import AddClientProfile from "$lib/components/AddClientProfile.svelte";
	import { doc, onSnapshot } from 'firebase/firestore';
    import {db, storage} from '$lib/firebase/client.js';
    import { onMount } from 'svelte';
    import { ref, getDownloadURL } from 'firebase/storage'


    let clientInfo

    /** @type {import('./$types').PageData} */
    export let data;

    let inquiry = null;

    let downloadLink = null;

    const {inquiryId} = data

    onMount(() => {
        const unsubscribe = onSnapshot(doc(db,'inquiries', inquiryId ), (querySnapshot)=> {
          inquiry =  {...querySnapshot.data(), id: inquiryId}

        });
        getDownloadLink();
        return () => unsubscribe();
    })

    // file display1

    async function getDownloadLink(){
        const pathName = 'inquiries/' + inquiryId + '/' + 'ApplicationForm.pdf' 
        const pathReference = ref(storage, pathName);

        downloadLink = await getDownloadURL(pathReference);
        
    }

    
    

</script>

<div class="flex items-center p-4 sm:rounded-lg h-10">
    <a href="/kanrisha/clientmanage/inquiries/"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
    </a>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <label for="add" on:click={clientInfo(inquiry)} class=" btn btn-ghost absolute right-10 px-2 bg-white btn-xs sm:btn-2xs md:btn-xs lg:btn-sm hover:bg-green-300">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
    </label>
</div>

<div class="overflow-x-auto relative shadow-md sm:rounded-lg h-full bg-white mt-4">

    {#if inquiry}
    <div class="grid grid-cols-2 mt-2 mb-2">
        <div class="font-semibold px-6">
            <p class="my-2">Firstname:</p>
            <p class="my-2">Lastname:</p>
            <p class="my-2">Email:</p>
            <p class="my-2 ">Number:</p>
        </div>

        <div class="font-semibold px-6" >
            <p class="my-2">{inquiry.firstname}</p>
            <p class="my-2">{inquiry.lastname}</p>
            <p class="my-2">{inquiry.email}</p>
            <p class="my-2">{inquiry.number}</p>
            
        </div>
        
    </div>
    <hr />
        <div class=" py-4">
            <h1 class="flex font-semibold px-6"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4.5 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
              </svg>Attachmets 
              </h1>
        </div>
             {#if downloadLink}

                <!-- svelte-ignore a11y-missing-attribute -->

                <iframe class="p-4 w-full h-full" src={downloadLink} frameborder="1"></iframe>

            {/if}

        {/if}

</div>
<AddClientProfile bind:clientInfo={clientInfo}/>