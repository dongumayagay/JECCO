<script>
    import { onMount } from 'svelte';
    import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
    import {db} from '$lib/firebase/client.js';
	import UpdateLoanModal from './UpdateLoanModal.svelte';
    
    let loans = []
    let clientInfo
    
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

<div class="flex items-center p-4 shadow-md sm:rounded-lg h-10 bg-white gap-4">
    Loan Processing 
</div>

<div class="overflow-x-auto relative shadow-md sm:rounded-lg h-full bg-white mt-4">
	<div>
		<table class="table table-normal w-full">
			<thead>
				<tr class="hover">
                    <th scope="col" class="px-6"></th>
                    <th scope="col" class="px-6">Loan Number</th>
					<th scope="col" class="px-6">Username</th>
                    <th scope="col" class="px-6">Area</th>  
					<th scope="col" class="px-6">Type of Loan</th> 
					<th scope="col" class="px-6">Mode of Payment</th> 
					<th scope="col" class="px-6">Loan Amount</th> 
					<th scope="col" class="px-6">Duration</th> 
                    <th scope="col" class="px-6">Purpose</th> 
					<th scope="col" class="px-6">Release Date</th> 
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
                        {loan.username}
                    </td>
                    <td class="px-6">
                        {loan.area}
                    </td>
                    <td class="px-6">
                        {loan.loanType}
                    </td>
                    <td class="px-6">
                        {loan.paymentMode}
                    </td>
                    <td class="px-6">
                        {loan.loanAmount}
                    </td>
                    <td class="px-6">
                        {loan.duration}
                    </td>
                    <td class="px-6">
                        {loan.purpose}
                    </td>
                    <td class="px-6">
                        {loan.releaseDate}
                    </td>
                </tr>
            {/each}
		</table>	
	</div>		
</div>
<UpdateLoanModal bind:clientInfo={clientInfo}/>