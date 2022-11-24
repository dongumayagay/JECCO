<script>
	import SideNavAdmin from '../../../lib/components/SideNavAdmin.svelte';
</script>

<main class=" flex h-full w-full">

	<section class="flex flex-col w-64 h-full px-4 py-8 bg-green-700">
		<SideNavAdmin/>
		</section>

	<section class=" flex flex-col w-full h-full p-4 ml-8 bg-gray-100 overflow-y-auto sm:ml-32 md:ml-7">
        
		<div class="bg-white mb-3 p-2 text-2xl">
		    Inquiries
		</div>

		<div class="bg-white h-full p-2 ">
			
				<table class="table table-compact w-full">
				  	<thead>
						<tr>
					 		<th></th> 
					  		<th>Name</th> 
					  		<th>Job</th> 
					  		<th>company</th> 
						  	<th>location</th>
							  <th></th> 
					 		<th>Favorite Color</th>
						
							 <th></th> 
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
							<td class="flex gap-4 "><a href="#edit">
							  </a><a href="#delete"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
								<path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clip-rule="evenodd" />
							  </svg>
							  </a></td>
						</tr>
						<tr class="hover">
							<th>2</th> 
							<td>Hart Hagerty</td> 
							<td>Desktop Support Technician</td> 
							<td>Zemlak, Daniel and Leannon</td> 
							<td>United States</td> 
							<td>12/5/2020</td> 
							<td>Blue</td>
                            <td class="flex gap-4"><a href="#edit">
							  </a><a href="#delete"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
								<path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clip-rule="evenodd" />
							  </svg>
							  </a></td>
						  </tr>
					</tbody> 
				</table>	
			</div>		
		
	</section>
</main>	