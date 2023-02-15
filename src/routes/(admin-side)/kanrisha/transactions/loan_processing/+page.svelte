<script>
    import { onMount } from 'svelte';
    import { collection, onSnapshot, doc, deleteDoc, query, where, orderBy } from 'firebase/firestore';
    import {db} from '$lib/firebase/client.js';
	import UpdateLoanModal from './UpdateLoanModal.svelte';
    import SearchClientModal from '$lib/components/SearchClientModal.svelte';
    import AddLoanPProcess from '$lib/components/AddLoanPProcess.svelte';

    let selectedRowIndex = null;
    let searchSelected = false;
    let loans = []
    let clientInfo
    let clienInfo
    let client = []
    let getAllClients;

    async function userLoans() {
        if (client.id != null) {
            const q = query(collection(db, 'loanprocess'), where("owner", "==", client.id), orderBy("numberOfLoan", "desc") );
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
            loans = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        });
        console.log(loans)
        return () => unsubscribe();
        }
    }
    $: if(client.id != null) {
        userLoans();
    }

    async function deleteLoan(id){
        await deleteDoc(doc(db, "loanprocess", id));
    }

    const handleRowClick = (index) => {
          selectedRowIndex = selectedRowIndex === index ? null : index;
    };

    $: if(client.length !== 0){
        searchSelected = true;
    } else{
        searchSelected = false;
    }
</script>


<div class="flex items-center p-4 shadow-md sm:rounded-lg bg-white gap-4">
    <h1 class=" font-bold">LOAN PROCESSING</h1>
    <div class=" absolute right-10">
        <label for="editborrow" class={selectedRowIndex !== null ? ' btn-info rounded-lg py-1 px-2 font-semibold ' : 'btn btn-sm'} disabled={selectedRowIndex === null}>EDIT</label>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <label for="add2" on:click={() => clienInfo(client)} class={searchSelected ? ' btn-info rounded-lg py-1 px-2 font-semibold ' : 'btn btn-sm'} disabled={!searchSelected}>Add Loan</label>
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
                    <td class="px-6">#</td>
                    <th scope="col" class="px-6">LOAN REF</th>
					<th scope="col" class="px-6">RELEASED DATE</th> 
					<th scope="col" class="px-6">DUE DATE</th> 
                    <th scope="col" class="px-6">LOAN AMOUNT</th> 
                    <th scope="col" class="px-6">D.PAYMENT</th> 
					<!-- <th scope="col" class="px-6">BALANCE</th> 
                    <th scope="col" class="px-6">T.PAYMENT</th>  -->
                    <th scope="col" class="px-6">STATUS</th> 
				</tr>
			</thead>
            {#each loans as loan}
                <tr on:click={() => handleRowClick(loan.id)} class={selectedRowIndex === loan.id ? ' hover cursor-pointer bg-blue-400 text-white ' : 'hover cursor-pointer'}>
                <td class="px-6">
                <p>{loan.numberOfLoan}</p>
                </td>
                <td class="px-6">
                    {loan.loanNumber}
                </td>
                <td class="px-6">
                    {loan.releaseDate}    
                </td>
                <td class="px-6">
                    {loan.formattedDueDate}
                </td>
                <td class="px-6">
                    {loan.loanAmount}        
                </td>
                <td class="px-6">
                    {loan.dailyPayment}
                </td>
                <td class="px-6">
                    {loan.status}
                </td>
            </tr>
            {/each}
		</table>	
	</div>		
</div>
<UpdateLoanModal bind:clientInfo={clientInfo} />
<SearchClientModal bind:selected={client} bind:getAllClients={getAllClients}/>
<AddLoanPProcess bind:clienInfo={clienInfo} />