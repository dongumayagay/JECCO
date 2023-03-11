<script>
	import {db} from '$lib/firebase/client.js';
	import {userStore} from '$lib/store.js'
	import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
	
	let loans = []
	
	async function userLoans() {
        loans = []

        const q = query(collection(db, 'loanprocess'), where("owner", "==", $userStore.uid), orderBy("numberOfLoan", "desc") );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            loans = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        });
        return () => unsubscribe();
        
    }

	userLoans()
  
</script>
<svelte:head>
	<title>JEM | Loans</title>
</svelte:head>

<section class="flex flex-col w-full h-screen overflow-y-auto">
		<div class="bg-white mb-3 rounded-lg p-2 text-2xl max-sm:text-lg font-semibold">
			Loans
		</div>
		<div class="bg-white rounded-lg p-2 h-screen overflow-x-auto ">
			<table class="table max-sm:table-compact w-full">
				<thead>
					<tr>
						<td class="px-6">#</td>
						<th scope="col" class="px-6">LOAN REF</th>
						<th scope="col" class="px-6">RELEASED DATE</th> 
						<th scope="col" class="px-6">DUE DATE</th> 
						<th scope="col" class="px-6">LOAN AMOUNT</th> 
						<th scope="col" class="px-6">D.PAYMENT</th> 
						<th scope="col" class="px-6">BALANCE</th> 
						<th scope="col" class="px-6">T.PAYMENT</th>
						<th scope="col" class="px-6">STATUS</th> 
					</tr>
				</thead>
				{#each loans as loan}
					<tr>
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
							{loan.balance}
						</td>
						<td class="px-6">
							{loan.totalPayment}
						</td>
						<td class="px-6">
							{loan.status}
						</td>
					</tr>
				{/each}
			</table>	
		</div>
</section>	

