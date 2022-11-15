<script>
	import SideNav from '../../../lib/components/SideNav.svelte';
</script>

<main class=" flex bg-cream-500 h-screen">
	<SideNav/>	
	<div class=" w-5/6 flex-col p-3 bg-gray-300">
		<div class="bg-white mb-3 p-2 text-2xl">
			Due Dates
		</div>
		<div class="bg-white mb-3 p-2 h-full">
			<div class="overflow-x-auto">
				<table class="table table-compact w-full">
				  	<thead>
						<tr class="hover">
					 		<th></th> 
					  		<th>Name</th> 
					  		<th>Job</th> 
					  		<th>company</th> 
						  	<th>location</th> 
						 	<th>Last Login</th> 
					 		<th>Favorite Color</th>
						</tr>
				 	</thead> 
				  	<tbody>
						<tr class="hover">
							<th>1</th> 
							<td>Cy Ganderton</td> 
							<td>Quality Control Specialist</td> 
							<td>Littel, Schaden and Vandervort</td> 
							<td>Canada</td> 
							<td>12/16/2020</td> 
							<td>Blue</td>
						</tr>
						<tr class="hover">
							<th>2</th> 
							<td>Hart Hagerty</td> 
							<td>Desktop Support Technician</td> 
							<td>Zemlak, Daniel and Leannon</td> 
							<td>United States</td> 
							<td>12/5/2020</td> 
							<td>Purple</td>
						  </tr>
					</tbody> 
				</table>	
			</div>		
		</div>
	</div>
	

</main>

