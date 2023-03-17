<script>
	import {db} from '$lib/firebase/client.js';
	import { collection, onSnapshot, query, where, orderBy, limit } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import {userStore} from '$lib/store.js'
	import Calendar from './Calendar.svelte';

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
		const paymentAmount = dueDates[0].dailyPayment * 100
		if (dueDates.length === 0 ) {
			return
		}
		const response = await fetch("/api/paymongo/links",{method:'POST',body:JSON.stringify({amount: paymentAmount, description: 'Payment', remarks:dueDates[0].id}) })
		const result = await response.json();
		const checkOutUrl = result.data.attributes.checkout_url

		open(checkOutUrl);
	}
</script>


<svelte:head>
	<title>JEM | Due Dates</title>
</svelte:head>
<section class="flex flex-col w-full h-screen overflow-y-auto">
		<div class=" flex bg-white mb-3 rounded-lg">
			<h1 class=" font-semibold m-2 text-2xl max-sm:text-lg">Due Dates</h1>
			<div class=" flex items-center justify-end max-sm:pr-4 absolute p-2 right-10 max-sm:right-5">
				<button class="btn btn-sm bg-green-500 border-none max-[320px]:text-xs max-[320px]:w-12" on:click={payOnline}>Pay Online</button>
			</div>
		</div>
		<div class="bg-white rounded-lg p-2 h-28 overflow-x-auto mb-3 max-sm:mb-10">
				<table class="table table-compact max-sm:table-compact w-full">
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
		<div class=" flex justify-center items-center bg-white h-screen max-lg:h-fit max-sm:h-64 rounded-lg overflow-auto pt-4 px-10 max-sm:px-0 max-sm:pt-0 max-lg:pb-5 ">
			<Calendar/>
		</div>
</section>

