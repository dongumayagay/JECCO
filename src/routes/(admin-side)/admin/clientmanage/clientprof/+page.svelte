<script>
    import AddClientProfile from "$lib/components/AddClientProfile.svelte";
    import EditClientModal from "./EditClientModal.svelte";
    import AddLoanPProcess from "$lib/components/AddLoanPProcess.svelte";
    import { onMount } from 'svelte';
    import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
    import {db} from '$lib/firebase/client.js';
	
    let clientInfo
    let clients = []

    onMount(() => {
        const unsubscribe = onSnapshot(collection(db, 'clientinfo'), (querySnapshot) => {
            clients = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        });
        return () => unsubscribe();
        
    })
    async function deleteClient(id){
        await deleteDoc(doc(db, "clientinfo", id));
    }
</script>    
<div class="flex items-center p-4 shadow-md sm:rounded-lg h-10 bg-white gap-4">
        
    <h1 class=" left-0 pr-10">Client Profile</h1>
    <label for="add" class=" btn btn-ghost absolute right-10 px-2 bg-gray-200 btn-xs sm:btn-2xs md:btn-xs lg:btn-sm hover:bg-green-300">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
    </label>
    
</div>    

<div class="overflow-x-auto relative shadow-md sm:rounded-lg h-full bg-white mt-4">
    
    <table class="table table-normal w-full ">
        <thead>
            <tr>
                <th scope="col" class="px-6"></th>
                <th scope="col" class="px-6">Username</th> 
                <th scope="col" class="px-6">First Name</th> 
                <th scope="col" class="px-6">Last Name</th> 
                <th scope="col" class="px-6">Address</th> 
                <th scope="col" class="px-6" >Email</th> 
                <th scope="col" class="px-6">Contact Number</th> 
                <th scope="col" class="px-6" >Loan type</th> 
                <th scope="col" class="px-6" >Mode of Payment</th> 
                <th scope="col" class="px-6" >Date Created</th> 
            </tr>
        </thead> 
        {#each clients as client }
            <tr class="hover">
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
                                <li><label for="update" on:click={clientInfo(client)}>Edit Client Information</label></li>
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <li><label for="add2" on:click={clientInfo(client)}>Process Loan</label></li>
                                <li><button on:click={deleteClient(client.id)}>Delete</button></li>
                            </ul>
                        </div>
                    </div>
                </td>
                <td class="px-6">
                    {client.username}
                </td>
                <td class="px-6">
                    {client.firstname}
                </td>
                <td class="px-6">
                    {client.lastname}
                </td>
                <td class="px-6">
                    {client.address}
                </td>
                <td class="px-6">
                    {client.email}
                </td>
                <td class="px-6">
                    {client.number}
                </td>
                <td class="px-6">
                    {client.loanType}
                </td>
                <td class="px-6">
                    {client.paymentMode}
                </td>
                <td class="px-6">
                    {client.dateCreated}
                </td>
            </tr>      
        {/each}
    </table>	
</div>
<AddClientProfile/>
<EditClientModal bind:clientInfo={clientInfo} />    
<AddLoanPProcess bind:clientInfo={clientInfo} />   