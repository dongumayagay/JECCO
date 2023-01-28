<script>
    import { onMount } from 'svelte';
    import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
    import {db} from '$lib/firebase/client.js';
	import UpdateLoanModal from './UpdateLoanModal.svelte';
    import SearchClientModal from '$lib/components/SearchClientModal.svelte';

    let loans = []
    let clientInfo
    let client = []
    let getAllClients
    onMount(() => {
        const unsubscribe = onSnapshot(collection(db, 'loanprocess'), (querySnapshot) => {
            loans = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        });
        return () => unsubscribe();
        
    })
    async function deleteLoan(id){
        await deleteDoc(doc(db, "loanprocess", id));
    }

</script>


<div class="flex items-center p-4 shadow-md sm:rounded-lg bg-white gap-4">
    <h1 class=" font-bold">LOAN PROCESSING</h1>
</div>

<div class="overflow-x-auto shadow-md sm:rounded-lg w-full h-60 bg-white mt-4">
    <div class="flex">
        <div class=" p-4">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <label for="search" on:click={getAllClients} class=" btn btn-sm">Search</label>
        </div>
    </div>
        <div class="flex pl-6 font-semibold">
            <div class=" flex flex-col gap-2">
                <p>Client Number: </p>
                <p>BORROWER:</p>
                <p>ADDRESS:</p>
                <p>CO-MAKER:</p>
            </div>
            <div class=" flex flex-col gap-2 text-blue-600 font-semibold pl-6">
                {#await client}
                    <p>...waiting</p>
                {:then info}
                    {#if info.clientNumber == undefined}
                        <p></p>
                    {:else}
                        <p>{info.clientNumber}</p>
                        <p>{info.firstname + " " + info.lastname}</p>
                        <p>{info.houseNo + ', ' + info.barangay + ', ' + info.municipality + ', ' + info.province}</p>
                        <p>{info.coMaker}</p>
                    {/if}
                {:catch error}
                    <p style="color: red">{error.message}</p>
                {/await}
                                
            </div>
        </div>
</div>

<div class="overflow-x-auto shadow-md sm:rounded-lg h-full bg-white mt-4">
	<div>
		<table class="table table-normal w-full">
			<thead>
				<tr class="hover">
                    <th scope="col" class="px-6"></th>
                    <th scope="col" class="px-6">#</th>
                    <th scope="col" class="px-6">REF</th>
					<th scope="col" class="px-6">TYPE</th>
                    <th scope="col" class="px-6">R.DAYS</th>
					<th scope="col" class="px-6">RELEASED DATE</th> 
					<th scope="col" class="px-6">DUE DATE</th> 
                    <th scope="col" class="px-6">LOAN AMOUNT</th> 
                    <th scope="col" class="px-6">D.I.</th> 
					<th scope="col" class="px-6">BALANCE</th> 
                    <th scope="col" class="px-6">T.PAYMNET</th> 
                    <th scope="col" class="px-6">STATUS</th> 
                    <th scope="col" class="px-6">JEM'S BENEFIT FUND</th> 
				</tr>
			</thead> 
			{#each loans as loan }
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
                                    <li><label for="update" on:click={clientInfo(loan)}>Edit</label></li>
                                    <li><button on:click={deleteLoan(loan.id)}>Delete</button></li>
                                </ul>
                            </div>
                        </div>
                    </td>
                    <td class="px-6">
                        {loan.loanNumber}
                    </td>
                    <td class="px-6">
                        
                    </td>
                    <td class="px-6">
                        
                    </td>
                    <td class="px-6">
                        
                    </td>
                    <td class="px-6">
                        {loan.releaseDate}
                    </td>
                    <td class="px-6">
                        
                    </td>
                    <td class="px-6">
                        {loan.loanAmount}
                        <!-- {loan.username} -->
                    </td>
                    <td class="px-6">
                        <!-- {loan.area} -->
                    </td>
                    <td class="px-6">
                        
                    </td>
                    <td class="px-6">
                        <!-- {loan.duration} -->
                    </td>
                    <td class="px-6">
                        
                    </td>
                    <td class="px-6">
                        
                    </td>
                </tr>
            {/each}
		</table>	
	</div>		
</div>
<UpdateLoanModal bind:clientInfo={clientInfo} />
<SearchClientModal bind:selected={client} bind:getAllClients={getAllClients}/>