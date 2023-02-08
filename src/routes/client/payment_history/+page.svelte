<svelte:head>
	<title>JECCO | Payment History</title>
</svelte:head>
<section class="flex flex-col w-full h-screen overflow-y-auto bg-gray-200">
	<div class=" w-full flex flex-col p-3 h-full">
		<div class="bg-white mb-3 rounded-lg p-2 text-2xl">
			Payment History
		</div>
			<div class="bg-white rounded-lg p-2 h-screen overflow-x-auto ">
				<table class="table max-sm:table-compact w-full max-sm:w-fit">
					<thead>
						<tr class="hover">
							<td>#</td> 
							<th>Loan Status</th> 
							<th>Amount Paid</th> 
							<th>Date Paid</th> 								
						</tr>
					</thead> 
					<tbody>
						<tr class="hover">
							<td>1</td> 
							<td>Active</td> 
							<td>5,000.00 php</td> 
							<td>12/16/2020</td> 
						</tr>
						<tr class="hover">
							<td>2</td> 
							<td>Active</td> 
							<td>10,000.00 php</td> 
							<td>12/15/2020</td> 
						</tr>
					</tbody> 
				</table>	
		</div>
	</div>
</section>	
