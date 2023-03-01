<script>
	import {db} from '$lib/firebase/client.js';
	import { collection, onSnapshot, query, where, orderBy, limit } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import {userStore} from '$lib/store.js'

	let dueDates = []

	onMount(() =>{
		const unsubscribe = userDueDates();
		return () => {
			unsubscribe();
		}

	})

	function userDueDates() {
        const q = query(collection(db, 'loanprocess'), where("owner", "==", $userStore.uid), orderBy("formattedDueDate", "desc"), limit(1));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            dueDates = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));	
			
        });
        return unsubscribe;
        
    }

	userDueDates();

	async function payOnline(){
		console.log(dueDates);
		if (dueDates.length === 0 ) {
			return
		}
		const response = await fetch("/api/paymongo/links",{method:'POST',body:JSON.stringify({amount:15000, description: 'Payment', remarks:dueDates[0].id}) })
		const result = await response.json();
		const checkOutUrl = result.data.attributes.checkout_url

		open(checkOutUrl);
	}
</script>


<svelte:head>
	<title>JECCO | Due Dates</title>
</svelte:head>
<section class="flex flex-col w-full h-screen overflow-y-auto">
		<div class=" flex bg-white mb-3 rounded-lg">
			<h1 class=" font-semibold m-2 text-2xl max-sm:text-lg">Due Dates</h1>
			<div class=" flex items-center justify-end max-sm:pr-4 absolute p-2 right-10 max-sm:right-5">
				<button class="btn btn-sm bg-green-500 border-none max-[320px]:text-xs max-[320px]:w-12" on:click={payOnline}>Pay Online</button>
			</div>
		</div>
		<div class="bg-white rounded-lg p-2 h-screen overflow-x-auto">
				<table class="table max-sm:table-compact w-full">
					<thead>

						<tr>
							<td>Amount to Pay</td> 
							<th>Due Date</th> 
							<th>Arrears Penalty</th> 
							<th>Past Due</th> 
						</tr>
					</thead> 
					<tbody>
						{#each dueDates as duedate}
						<tr class="hover">
							<td>{duedate.dailyPayment}</td> 
							<td>{duedate.formattedDueDate}</td>
							<td>{duedate.arrearsPenalty}</td>
							<td>{duedate.pastDue}</td> 				
						</tr>
						{/each}
						
					</tbody> 
				</table>	
		</div>
</section>

