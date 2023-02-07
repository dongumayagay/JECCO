<script>
    import { onMount } from 'svelte';
    import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
    import {db} from '$lib/firebase/client.js';
	import UpdateLoanModal from './UpdateLoanModal.svelte';
    import SearchClientModal from '$lib/components/SearchClientModal.svelte';
    import AddLoanPProcess from '$lib/components/AddLoanPProcess.svelte';


    let rowSelected = false;
    let searchSelected = false;
    let loans = []
    let clientInfo
    let client = []
    let getAllClients;

    onMount(() => {
        const unsubscribe = onSnapshot(collection(db, 'loanprocess'), (querySnapshot) => {
            loans = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        });
        return () => unsubscribe();
        
    })
    async function deleteLoan(id){
        await deleteDoc(doc(db, "loanprocess", id));
    }

    $: if(client.length !== 0){
        searchSelected = true;
    } else{
        searchSelected = false;
    }
</script>


<div class="flex items-center p-4 shadow-md sm:rounded-lg bg-white gap-4">
    <h1 class=" font-bold">LOAN PROCESSING</h1>
    <div class=" absolute right-10">
        <label for="editborrow" class={rowSelected ? ' btn-info rounded-lg py-1 px-2 font-semibold ' : 'btn btn-sm'} disabled={!rowSelected}>EDIT</label>
        <label for="add2" class={searchSelected ? ' btn-info rounded-lg py-1 px-2 font-semibold ' : 'btn btn-sm'} disabled={!searchSelected}>BORROWER SETUP</label>
    </div>
</div>

<div class="overflow-x-auto shadow-md sm:rounded-lg w-full h-72 bg-white mt-4">
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
            <tr on:click={() => rowSelected = !rowSelected} class={rowSelected ? ' hover cursor-pointer bg-blue-400 text-white ' : 'hover cursor-pointer'}>
                    <td class="px-6">
                        <p>1</p>
                    </td>
                    <td class="px-6">
                        09sd7a0s97xz90c7a09s7d
                    </td>
                    <td class="px-6">
                        
                    </td>
                    <td class="px-6">
                        <!-- {loan.releaseDate} -->
                    </td>
                    <td class="px-6">
                        
                    </td>
                    <td class="px-6">
                        <!-- {loan.loanAmount} -->
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
                    <td class="px-6">
                        
                    </td>
                </tr>
		</table>	
	</div>		
</div>
<UpdateLoanModal bind:clientInfo={clientInfo} />
<SearchClientModal bind:selected={client} bind:getAllClients={getAllClients}/>
<AddLoanPProcess/>