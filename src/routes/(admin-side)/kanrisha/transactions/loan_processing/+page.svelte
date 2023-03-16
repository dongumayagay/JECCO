<script>
    import { collection, onSnapshot, doc, deleteDoc, query, where, orderBy, updateDoc, getDoc } from 'firebase/firestore';
    import {db} from '$lib/firebase/client.js';
	import UpdateLoanModal from './UpdateLoanModal.svelte';
    import SearchClientModal from '$lib/components/SearchClientModal.svelte';
    import AddLoanPProcess from '$lib/components/AddLoanPProcess.svelte';
    import {peso} from '$lib/utils.js'
    import ConfirmDeleteModal from "$lib/components/ConfirmDeleteModal.svelte";
    import { jsPDF } from "jspdf";


    let selectedRowIndex = null;
    let searchSelected = false;
    let loans = []
    let clientInfo
    let clienInfo
    let client = []
    let getAllClients;

    let showModal = false;
    let deleteSuccess = false;
    let idToDelete;

    async function userLoans() {
        loans = []

        const q = query(collection(db, 'loanprocess'), where("owner", "==", client.id), orderBy("numberOfLoan", "desc") );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            loans = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        });
        return () => unsubscribe();
        
    }

    async function deleteLoan(id){
        await deleteDoc(doc(db, "loanprocess", id));
    }

    async function statusComplete(id){
        await updateDoc(doc(db, "loanprocess", id), {
            status: "Completed"
        });
        await updateDoc(doc(db, "clientinfo", addUserInput.owner), {
            status: "Paid Off"
        });    
    }
    async function statusPastDue(id){
        await updateDoc(doc(db, "loanprocess", id), {
            status: "Past Due"
        });
    }

    async function addArrears(id){
        const arrearsComputation = loans.dailyPayment * 0.05 
        await updateDoc(doc(db, "loanprocess", id), {
            arrearsPenalty: loans.dailyPayment + arrearsComputation
        });
    }
    async function addDue(id){
        const pastDueComputation = loans.balance * 0.07 
        await updateDoc(doc(db, "loanprocess", id), {
            arrearsPenalty: 0,
            pastDue: loans.balance + pastDueComputation
        });
    }

    const handleRowClick = (index) => {
        selectedRowIndex = selectedRowIndex === index ? null : index;
    };

    $: if(client.length !== 0){
        searchSelected = true;
        userLoans();
    } else{
        searchSelected = false;
    }

    function confirmDelete() {
        showModal = true;
    }

    function handleConfirm() {
        deleteLoan(idToDelete);
        showModal = false;
    }

    function handleCancel() {
        showModal = false;
    }

    const disclosure = new jsPDF();
     
    async function generateDisclosure(){
        const today = new Date();
        const startOfDay = `${today.getFullYear()}-${("0" + (today.getMonth() + 1)).slice(-2)}-${("0" + today.getDate()).slice(-2)}`
        disclosure.addImage("/disclosure.jpg", "JPEG", 5, 0, 200, 275);
        disclosure.setFontSize(11);
        disclosure.text('San Pedro City, Laguna', 83, 32);
        disclosure.text(startOfDay, 93, 38);
        disclosure.text(client.clientNumber, 60, 52);
        disclosure.text(loans[0].loanNumber, 60, 58);
        disclosure.text(client.firstname + ' ' + client.lastname, 145, 52);
        disclosure.text('Php ' + loans[0].loanAmount + '.00', 55, 73);
        disclosure.text('Php ' + loans[0].totalAmountDue + '.00', 55, 105);
        disclosure.text('Php ' + loans[0].dailyPayment + '.00', 55, 115);
        disclosure.text('Php ' + loans[0].loanAmount + '.00', 135, 73);
        disclosure.text('Php ' + loans[0].notarialFee + '.00', 135, 93);
        disclosure.text(loans[0].releaseDate, 135, 102);
        disclosure.text(loans[0].formattedDueDate, 135, 110);
        disclosure.text(loans[0].releasedBy, 142, 172);
        

        window.open(disclosure.output('bloburl'));
    }

    function resetSelected(){
        selectedRowIndex = null
    }

</script>


<div class="flex items-center p-4 shadow-md sm:rounded-lg bg-white gap-4">
    <h1 class=" font-bold">LOAN PROCESSING</h1>
    <div class=" absolute right-10">
        <button class={selectedRowIndex !== null ? ' btn-info rounded-lg py-1 px-2 font-semibold mx-2 ' : 'btn btn-sm'} disabled={selectedRowIndex === null} on:click={generateDisclosure}>Disclosure</button>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <label for="editborrow" on:click={resetSelected} class={selectedRowIndex !== null ? ' btn-info rounded-lg py-1 px-2 font-semibold mx-2 ' : 'btn btn-sm'} disabled={selectedRowIndex === null}>EDIT</label>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <label for="add2" on:click={() => clienInfo(client)} class={searchSelected ? ' btn-info rounded-lg py-1 px-2 font-semibold mx-2 ' : 'btn btn-sm'} disabled={!searchSelected}>Add Loan</label>
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
                    <th></th>
                    <td class="px-6">#</td>
                    <th scope="col" class="px-6">LOAN REF</th>
					<th scope="col" class="px-6">RELEASED DATE</th> 
					<th scope="col" class="px-6">DUE DATE</th> 
                    <th scope="col" class="px-6">LOAN AMOUNT</th> 
                    <th scope="col" class="px-6">D.PAYMENT</th> 
					<th scope="col" class="px-6">BALANCE</th> 
                    <th scope="col" class="px-6">T.PAYMENT</th>
                    <th scope="col" class="px-6">ARREARS PENALTY</th>
                    <th scope="col" class="px-6">PAST DUE</th>
                    <th scope="col" class="px-6">STATUS</th> 
				</tr>
			</thead>
            {#each loans as loan}
                <tr on:click={() => handleRowClick(loan.id)} on:click={clientInfo(loan,client)} class={selectedRowIndex === loan.id ? ' hover cursor-pointer bg-blue-400 text-white ' : 'hover cursor-pointer'}>
                <td class="pr-0 ">
                    <div  class="flex items-center space-x-1 text-sm">
                        <div class="dropdown">
                            <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                            <label for='' tabindex="0" class="flex items-center justify-between text-sm font-medium leading-5 rounded-lg text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Delete">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" fill="currentColor" class="w-5 h-5">
                                    <path d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clip-rule="evenodd" />
                                </svg>
                            </label>
                            <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-38 text-black">
                                {#if loan.status == "Ongoing"}
                                <li><button on:click={statusComplete(loan.id)}>Set Status as Complete</button></li> 
                                <li><button on:click={statusPastDue(loan.id)}>Set Status as Past Due</button></li> 
                                <li><button on:click={addArrears(loan.id)}>Add Arrears Penalty</button></li> 
                                {:else if loan.status == "PastDue"}
                                <li><button on:click={addDue(loan.id)}>Add Past Due</button></li> 
                                {/if}
                                <li><button on:click={() => {idToDelete = loan.id, confirmDelete(); }}>Delete</button></li>  
                            </ul>
                        </div>
                    </div>
                </td>    
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
                    {peso.format(loan.loanAmount)}
                </td>
                <td class="px-6">
                    {loan.dailyPayment}
                </td>
                <td class="px-6">
                    {loan.balance}
                </td>
                <td class="px-6">
                    {loan.totalPayment}
                </td>
                <td class="px-6">
                    {loan.arrearsPenalty}
                </td>
                <td class="px-6">
                    {loan.pastDue}
                </td>
                <td class="px-6">
                    {loan.status}
                </td>
            </tr>
            {/each}
		</table>	
	</div>		
</div>

<SearchClientModal bind:selected={client} bind:getAllClients={getAllClients}/>
<AddLoanPProcess bind:clienInfo={clienInfo} />
<UpdateLoanModal bind:clientInfo={clientInfo} />
<ConfirmDeleteModal showModal={showModal}
onConfirm={handleConfirm}
onCancel={handleCancel}/>