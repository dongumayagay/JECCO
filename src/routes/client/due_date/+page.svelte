<script>
	import {getAuth} from 'firebase/auth'
	import {db} from '$lib/firebase/client.js';
	import { collection, onSnapshot, query, where, orderBy, limit } from 'firebase/firestore';
	import { onDestroy, onMount } from 'svelte';

	let userClient = getAuth().currentUser;
	let dueDates = []
	


	onMount(() =>{

		const unsubscribe = userDueDates();

		return () => {
			unsubscribe();
		}

	})

	function userDueDates() {
        const q = query(collection(db, 'duedates'), where("owner", "==", userClient.uid), orderBy("duedate", "desc"), limit(1));
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

		const response = await fetch("/api/paymongo/links",{method:'POST',body:JSON.stringify({amount:15000, description: 'payment', remarks:dueDates[0].id}) })
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
			<h1 class=" m-2 text-2xl">Due Dates</h1>
			<div class=" flex items-center justify-end pr-4 absolute p-2 right-10">
				<button class="btn btn-sm bg-green-500 border-none" on:click={payOnline}>Pay Online</button>
			</div>
		</div>
		<div class="bg-white rounded-lg p-2 h-screen overflow-x-auto">
				<table class="table max-sm:table-compact w-full">
					<thead>

						<tr class="hover">
							<th>Amount to Pay</th> 
							<th>Due Date</th> 
							<th>Arrears Penalty</th> 
							<th>Past Due</th> 
						</tr>
					</thead> 
					<tbody>
						{#each dueDates as duedate}
						<tr class="hover">
							<td>{duedate.dailyPayment}</td> 
							<td>{duedate.duedate}</td>
							<td>{duedate.arrearsPenalty}</td>
							<td>{duedate.pastDue}</td> 				
						</tr>
						{/each}
						
					</tbody> 
				</table>	
		</div>
</section>

