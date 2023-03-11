<script>
    import AddClientProfile from "$lib/components/AddClientProfile.svelte";
    import EditClientModal from "./EditClientModal.svelte";
    import AddLoanPProcess from "$lib/components/AddLoanPProcess.svelte";
    import ConfirmDeleteModal from "$lib/components/ConfirmDeleteModal.svelte";
    import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
    import {db} from '$lib/firebase/client.js';

    
	let clientsInfo
    let clientInfo
    let clienInfo
    let clients = []

    let showModal = false;
    let deleteSuccess = false;
    let idToDelete;

    const q = query(collection(db, 'clientinfo'), orderBy("clientNumber","desc"))
    async function getListOfClients(){
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
            clients = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        });
        return () => unsubscribe();
	}

    async function deleteClient(id){
        try {
			const response = await fetch(`/api/clients/${id}`, { method: 'DELETE',
            body: JSON.stringify({
					id:id,
			})});
            if (response.ok) {
            deleteSuccess = true;
            setTimeout(() => { deleteSuccess = false; }, 3000);
      }
		} catch (error) {
			console.log(error);
		}
    }

    function confirmDelete() {
        showModal = true;
    }

    function handleConfirm() {
        deleteClient(idToDelete);
        showModal = false;
    }

    function handleCancel() {
        showModal = false;
    }
</script>  

<svelte:head>
	<title>JEM | Client Profile</title>
</svelte:head>

  <div class="fixed top-4 right-4 z-50">
    {#if deleteSuccess}
        <div class=" absolute right-0 top-20 alert w-96 alert-success shadow-lg">
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-4 w-4" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Deleted!</span>
            </div>
        </div>
    {/if}
</div>
<div class="flex flex-1 items-center p-4 shadow-md sm:rounded-lg h-10 bg-white gap-4">
        
    <h1 class=" left-0 pr-10">Client Profile</h1>
    {#await getListOfClients()}
        <p class="absolute right-10">Loading....</p>
    {:then}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <label for="add" on:click={clientInfo( '',clients)} class=" btn btn-ghost absolute right-10 px-2 bg-gray-200 btn-xs sm:btn-2xs md:btn-xs lg:btn-sm hover:bg-green-300">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
    </label>
    {/await}
    
</div>    

<div class="overflow-x-auto relative shadow-md rounded-lg h-full bg-white mt-4">
    <table class="table table-compact w-full overflow-y-scroll ">
        <thead>
            <tr>
                <th class=""></th>
                <th class="">Client#</th> 
                <th class="">Username</th> 
                <th class="">First Name</th> 
                <th class="">Last Name</th> 
                <th class="flex justify-center">Address</th> 
                <th class="" >Email</th> 
                <th class="">Contact Number</th> 
                <th class="">Status</th> 
            </tr>
        </thead> 
        {#each clients as client }
            <tr class=" hover">
                <td class="p-4 w-4">
                    <div  class="flex items-center space-x-2 text-sm">
                        <div class="dropdown">
                            <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                            <label for='' tabindex="0" class="flex items-center justify-between text-sm font-medium leading-5 rounded-lg text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Delete">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" fill="currentColor" class="w-5 h-5">
                                    <path d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clip-rule="evenodd" />
                                </svg>
                            </label>
                            <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-38">
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <li><label for="update" on:click={clientsInfo(client)}>Edit Client Information</label></li>
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <li><label for="add2" on:click={clienInfo(client)}>Process Loan</label></li>
                                <li><button on:click={() => {idToDelete = client.id, confirmDelete(); }}>Delete</button></li>
                                
                            </ul>
                        </div>
                    </div>
                </td>
                <td class="">
                    {client.clientNumber}
                </td>
                <td class="">
                    {client.username}
                </td>
                <td class="">
                    {client.firstname}
                </td>
                <td class="">
                    {client.lastname}
                </td>
                <td class="">
                    {client.houseNo + ', ' + client.barangay + ', ' + client.municipality + ', ' + client.province}
                </td>
                <td class="">
                    {client.email}
                </td>
                <td class="">
                    {client.number}
                </td>
                <td class="">
                    {client.status}
                </td>
            </tr>      
        {/each}
    </table>	
</div>
<EditClientModal bind:clientsInfo={clientsInfo} />    
<AddClientProfile bind:clientInfo={clientInfo}/>
<AddLoanPProcess bind:clienInfo={clienInfo} />   
<ConfirmDeleteModal showModal={showModal}
onConfirm={handleConfirm}
onCancel={handleCancel}/>