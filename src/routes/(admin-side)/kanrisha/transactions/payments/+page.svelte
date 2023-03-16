<script>
    import { onMount } from 'svelte';
    import { collection, onSnapshot, doc, deleteDoc, query, where, orderBy, limit } from 'firebase/firestore';
    import {db} from '$lib/firebase/client.js';
    import SearchClientModal from '$lib/components/SearchClientModal.svelte';
	import PaymentModal from '$lib/components/paymentModal.svelte';
    import Editpayment from "./Editpayment.svelte";
    import ConfirmDeleteModal from "$lib/components/ConfirmDeleteModal.svelte";

    let selectedRowIndex = null;
    let searchSelected = false;
    let payments = []
    let clientInfo
    let clienInfo
    let client = []
    let getAllClients;

    let showModal = false;
    let deleteSuccess = false;
    let idToDelete;
    let clientWithLoans = true;

    async function userPayments() {
        payments = []

        const q = query(collection(db, 'payments'), where("owner", "==", client.id), orderBy("transactionDate", "desc") );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            payments = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        });
        return () => unsubscribe();
        
    }

    async function deletePayment(id){
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

    function confirmDelete() {
        showModal = true;
    }

    function handleConfirm() {
        deletePayment(idToDelete);
        showModal = false;
    }

    function handleCancel() {
        showModal = false;
    }

    function resetSelected(){
        selectedRowIndex = null
    }
</script>


<div class="flex items-center p-4 shadow-md sm:rounded-lg bg-white gap-4">
    <h1 class=" font-bold">PAYMENTS</h1>
    <div class=" absolute right-10">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <label for="edit_payment" on:click={resetSelected} class={selectedRowIndex !== null ? ' btn-info rounded-lg py-1 px-2 font-semibold ' : 'btn btn-sm'} disabled={selectedRowIndex === null}>EDIT</label>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <label for="payment" on:click={clienInfo(client)} class="btn-info rounded-lg py-1 px-2 font-semibold">ADD</label>
    </div>
</div>

<div class="overflow-x-auto shadow-md sm:rounded-lg w-full h-72 bg-white mt-4">
    <div class="flex">
        <div class=" p-4">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <label for="search" on:click={getAllClients(clientWithLoans)} class=" btn btn-sm">Search</label>
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
            <th></th>
            <th>Transaction ID</th>
            <th>Loan Payment</th> 
            <th>Arrears Payment</th> 
            <th>Past Due Payment</th> 
            <th class="px-6">Transaction Date</th>
                                                
        </tr>
    </thead>
        {#each payments as payment}                 
            <tr on:click={() => handleRowClick(payment.id)} on:click={clientInfo(payment,client)} class={selectedRowIndex === payment.id ? ' hover cursor-pointer bg-blue-400 text-white ' : 'hover cursor-pointer'}>
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
                            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-38 text-black">
                                <li><button on:click={() => {idToDelete = payment.id, confirmDelete(); }}>Delete</button></li>
                                
                            </ul>
                        </div>
                    </div>
                </td>
                <td>
                    {payment.transactionId}
                </td>
                <td class="px-6">
                    {payment.loanPayment}
                </td>
                <td class="px-6">
                    {payment.arrearsPayment}
                </td>
                <td class="px-6">
                    {payment.pastDuePayment}
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
<Editpayment bind:clientInfo={clientInfo}/>
<ConfirmDeleteModal showModal={showModal}
onConfirm={handleConfirm}
onCancel={handleCancel}/>