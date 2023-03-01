<script>
	import {getAuth} from 'firebase/auth'
	import {db} from '$lib/firebase/client.js';
	import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';

	let userClient = getAuth().currentUser;
	let payments = []
	
	async function userPaymment() {
        payments = []

        const q = query(collection(db, 'payments'), where("owner", "==", userClient.uid), orderBy("transactionDate", "desc") );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            payments = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        });
        return () => unsubscribe();
        
    }

	userPaymment()
  
</script>
<svelte:head>
	<title>JECCO | Payment History</title>
</svelte:head>
<section class="flex flex-col w-full h-screen overflow-y-auto">
		<div class="bg-white mb-3 rounded-lg p-2 text-2xl max-sm:text-lg font-semibold">
			Payment History
		</div>
		<div class="bg-white rounded-lg p-2 h-screen overflow-x-auto ">
			<table class="table table-normal max-sm:table-compact w-full">
				<thead>
					<tr>
						<td>Transaction ID</td>
						<th>Amount</th> 
						<th>Transaction Date</th>
						<th>Arrears Payment</th>
						<th>Past Due Payment</th>			
					</tr>
				</thead>
				{#each payments as payment}                 
					<tr >
						<td>
							{payment.transactionId}
						</td>
						<td class="px-6">
							{payment.loanPayment}
						</td>
						<td>
							{payment.transactionDate}
						</td>
						<td>
							{payment.arrearsPayment}
						</td>
						<td>
							{payment.pastDuePayment}
						</td>
					</tr>
				{/each}	
			</table>			
		</div>
</section>	
