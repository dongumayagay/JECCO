<script>
	import SideNav from '../../../lib/components/SideNav.svelte';
</script>

<main class=" flex bg-cream-500 h-screen">
	<section class="flex flex-col w-64 h-full px-4 py-8 overflow-y-auto">
		<SideNav/>
	</section>
	
	<section class="flex flex-col w-full h-screen p-6 ml-8 overflow-y-auto bg-gray-200">
		<div class=" w-full flex flex-col p-3 bg-gray-200 h-full">
			<div class="bg-white mb-3 p-2 text-2xl">
				Loans
			</div>
			<div class="bg-white mb-3 p-2 h-full">
				<div class="overflow-x-auto">
					<table class="table table-normal w-full">
						<thead>
							<tr class="hover">
								<th></th> 
								<th>Type of Loan</th> 
								<th>Mode of Payment</th> 
								<th>Loan Amount</th> 
								<th>Duration</th> 
								<th>Status</th> 
							</tr>
						</thead> 
						<tbody>
							<tr class="hover">
								<th>1</th> 
								<td>CSB Loan</td> 
								<td>Monthly Payment</td> 
								<td>500,000.00 php</td> 
								<td>3 years</td> 
								<td>Active</td> 
							</tr>
							<tr class="hover">
								<th>2</th>  
								<td>CSB Loan</td> 
								<td>Monthly Payment</td> 
								<td>300,000.00 php</td> 
								<td>3 years</td> 
								<td>Fully Paid</td> 
							</tr>
						</tbody> 
					</table>	
				</div>		
			</div>
		</div>
	</section>	

</main>

