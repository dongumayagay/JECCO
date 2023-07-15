<script>
	import {getAuth} from 'firebase/auth'
	import {db} from '$lib/firebase/client.js';
	import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
	import { jsPDF } from "jspdf";
    import autoTable from 'jspdf-autotable'
	import { onMount, afterUpdate } from 'svelte';

	let userClient = getAuth().currentUser;
	let payments = []
	let currentPage = 1;
    let itemsPerPage = 12;

    let totalItems = 0;
    let totalPages = 0;
    let displayedItems = [];
	
	async function userPaymment() {
        payments = []

        const q = query(collection(db, 'payments'), where("owner", "==", userClient.uid), orderBy("transactionDate", "desc") );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            payments = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
			totalItems = payments.length;
            totalPages = Math.ceil(totalItems / itemsPerPage);
            updateDisplayedItems();
        });
        return () => unsubscribe();
        
    }

	function updateDisplayedItems() {
        let startIndex = (currentPage - 1) * itemsPerPage;
        let endIndex = startIndex + itemsPerPage;
        displayedItems = payments.slice(startIndex, endIndex);
    }

    function goToPage(pageNumber) {
        currentPage = pageNumber;
        updateDisplayedItems();
    }

    onMount(() => {
        userPaymment();
    });

    afterUpdate(() => {
        updateDisplayedItems();
    });

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
				{#each displayedItems as payment}                 
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

	<!-- Pagination -->
<div class="mt-4 flex justify-center">
    <button class="cursor-pointer px-2 py-1 rounded hover:bg-gray-200" disabled={currentPage === 1} on:click={() => goToPage(1)}>
      First
    </button>
    <button class="cursor-pointer px-2 py-1 rounded hover:bg-gray-200" disabled={currentPage === 1} on:click={() => goToPage(currentPage - 1)}>
      Previous
    </button>

    <!-- {#if currentPage > 3}
      <span class="cursor-pointer px-2 py-1 rounded hover:bg-gray-200">...</span>
    {/if} -->

    <!-- {#each Array.from({ length: totalPages }, (_, i) => i + 1) as page}
      {#if currentPage - 2 <= page && page <= currentPage + 2}
        <button class="cursor-pointer px-2 py-1 rounded hover:bg-gray-200" aria-current={currentPage === page} on:click={() => goToPage(page)}>
          {page}
        </button>
      {/if}
    {/each} -->

    <!-- {#if currentPage < totalPages - 2}
      <span class="cursor-pointer px-2 py-1 rounded hover:bg-gray-200">...</span>
    {/if} -->

    <button class="cursor-pointer px-2 py-1 rounded hover:bg-gray-200" disabled={currentPage === totalPages} on:click={() => goToPage(currentPage + 1)}>
      Next
    </button>
    <button class="cursor-pointer px-2 py-1 rounded hover:bg-gray-200" disabled={currentPage === totalPages} on:click={() => goToPage(totalPages)}>
      Last
    </button>
  </div>
</section>	
