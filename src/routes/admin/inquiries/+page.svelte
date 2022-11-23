<script>
	import SideNavAdmin from '../../../lib/components/SideNavAdmin.svelte';
</script>

<main class=" flex h-full w-full">
	<SideNavAdmin/>
   
	<div class=" w-full flex flex-col p-3 bg-gray-200 h-full">
        
		<div class="bg-white mb-3 p-2 text-2xl">
		    Inquiries
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
                            <td><a href="edit" class="btn btn-info btn-sm">edit</a><a href="#delete" class="btn btn-sm bg-red-600 ">delete</a></td>
						</tr>
						<tr class="hover">
							<th>2</th> 
							<td>Hart Hagerty</td> 
							<td>Desktop Support Technician</td> 
							<td>Zemlak, Daniel and Leannon</td> 
							<td>United States</td> 
							<td>12/5/2020</td> 
							<td>Blue</td>
                            <td><a href="edit" class="btn btn-info btn-sm">edit</a><a href="#delete" class="btn btn-sm bg-red-600 ">delete</a></td>
						  </tr>
					</tbody> 
				</table>	
			</div>		
		</div>
    </div>
</main>	