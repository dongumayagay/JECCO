<script>
	import {getAuth} from 'firebase/auth'
	import {db} from '$lib/firebase/client.js';
	import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
	import { jsPDF } from "jspdf";
    import autoTable from 'jspdf-autotable'

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

	userPaymment();

	async function generatePaymentHistory(){
	 const paymentHistory = new jsPDF();

	 		paymentHistory.text('JEMPOWERS CREDIT COPORATION', 56, 22);
            paymentHistory.text('Payment History', 84, 37);
            // paymentHistory.text(startOfDay, 89, 45);
            paymentHistory.setFontSize(11);
            paymentHistory.text('San Pedro City, Laguna', 83, 27);
            paymentHistory.autoTable({
                theme: 'grid',
                margin: {top: 50, left:3}, 
                tableWidth: 205,
                headStyles: {fontSize: 6},
                style:{fontSize: 5, item:'center'},
                html: '#payment_history',
            });
            window.open(paymentHistory.output('bloburl'));

	}
  
</script>
<svelte:head>
	<title>JEM | Payment History</title>
</svelte:head>
<section class="flex flex-col w-full h-screen overflow-y-auto">
		<div class="flex bg-white mb-3 w-full rounded-lg p-2">
			 <span class=" flex-1 text-2xl max-sm:text-lg font-semibold">Payment History</span>
			<div class="flex flex-1 w-full items-center justify-end ">
				<button class="btn btn-sm max-sm:btn-xs flex text-xs" on:click={generatePaymentHistory}>Generate PDF</button>
			</div>
		</div>
		<div class="bg-white rounded-lg p-2 h-screen overflow-x-auto ">
			<table class="table max-sm:table-compact w-full" id="payment_history">
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
