<script>
    import { onMount } from 'svelte';
    import { collection, onSnapshot, doc, deleteDoc, query, where, orderBy, limit } from 'firebase/firestore';
    import {db} from '$lib/firebase/client.js';
    import SearchClientModal from '$lib/components/SearchClientModal.svelte';
	import PaymentModal from '$lib/components/paymentModal.svelte';
    import Editpayment from "./Editpayment.svelte";

    let selectedRowIndex = null;
    let searchSelected = false;
    let payments = []
    let clientInfo
    let clienInfo
    let client = []
    let getAllClients;
    let rowSelected = false;

    async function userPayments() {
        payments = []

        const q = query(collection(db, 'payments'), where("owner", "==", client.id), orderBy("transactionDate", "desc") );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            payments = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        });
        return () => unsubscribe();
        
    }

    async function deleteLoan(id){
        await deleteDoc(doc(db, "payments", id));
    }

    const handleRowClick = (index) => {
          selectedRowIndex = selectedRowIndex === index ? null : index;
    };

    $: if(client.length !== 0){
        searchSelected = true;
        userPayments() 
    } else{
        searchSelected = false;
    }
</script>


<div class="flex items-center p-4 shadow-md sm:rounded-lg bg-white gap-4">
    <h1 class=" font-bold">PAYMENTS</h1>
    <div class=" absolute right-10">
        <label for="edit_payment" class={rowSelected ? ' btn-info rounded-lg py-1 px-2 font-semibold ' : 'btn btn-sm'} disabled={!rowSelected}>EDIT</label>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <label for="payment" on:click={() => clienInfo(client)} class={searchSelected ? ' btn-info rounded-lg py-1 px-2 font-semibold ' : 'btn btn-sm'} disabled={!searchSelected}>ADD</label>
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
        <tr>
            <th>Transaction ID</th>
            <th>Amount</th> 
            <th class="px-6">Transaction Date</th>
                                                
        </tr>
    </thead>
        {#each payments as payment}                 
            <tr on:click={() => rowSelected = !rowSelected} class={rowSelected ? ' hover cursor-pointer bg-blue-400 text-white ' : 'hover cursor-pointer'}>
                <td>
                    {payment.transactionId}
                </td>
                <td class="px-6">
                    {payment.loanPayment}
                </td>
                <td>
                    {payment.transactionDate}
                </td>
            </tr>
        {/each}	
		</table>	
	</div>		
</div>

<SearchClientModal bind:selected={client} bind:getAllClients={getAllClients}/>
<PaymentModal bind:clienInfo={clienInfo}/>
<Editpayment/>