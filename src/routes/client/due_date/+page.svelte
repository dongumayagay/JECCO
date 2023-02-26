<svelte:head>
	<title>JECCO | Due Dates</title>
</svelte:head>
<section class="flex flex-col w-full h-screen overflow-y-auto">
		<div class=" flex bg-white mb-3 rounded-lg">
			<h1 class=" m-2 text-2xl">Due Dates</h1>
			<div class=" flex items-center justify-end pr-4 absolute p-2 right-10">
				<button class="btn btn-sm bg-green-500 border-none">Pay Online</button>
			</div>
		</div>
		<div class="bg-white rounded-lg p-2 h-screen overflow-x-auto">
				<table class="table max-sm:table-compact w-full">
					<thead>
						<tr class="hover">
							<td>#</td> 
							<th>Amount to Pay</th> 
							<th>Due Date</th> 
						</tr>
					</thead> 
					<tbody>
						<tr class="hover">
							<td>1</td> 
							<td>50,000.00 php</td> 
							<td>12/16/2020</td> 				
						</tr>
						<tr class="hover">
							<td>2</td> 
							<td>100,000.00 php</td> 
							<td>3/5/2021</td> 				
						</tr>
					</tbody> 
				</table>	
		</div>
</section>

