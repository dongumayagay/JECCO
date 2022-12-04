<script>
	import SideNavAdmin from '../../../lib/components/SideNavAdmin.svelte';
</script>

<main class=" flex ">

	<section class="flex flex-col w-64 h-full px-4 py-8 overflow-y-auto md:mr-6">
        <SideNavAdmin/>
    </section>
    

	<section class="flex flex-col w-full h-screen p-6 ml-8 overflow-y-auto bg-gray-200 ">
        
		<div class="overflow-x-auto relative shadow-md sm:rounded-lg h-full bg-white mt-4">
			
				<table class="table table-normal w-full bg-white ">
				  	<thead>
						<tr>
					 		<th>Client #</th> 
					  		<th>Name</th> 
					  		<th>Loan No.</th> 
					  		<th>Loan Type</th> 
						  	<th>location</th>
							  <th></th> 
					 		<th>Release Date</th>
							 <th></th> 
						</tr>
				 	</thead> 
						<tr class="hover">
							<td>SPL 2022 0001</td> 
							<td>Trishan Andrei</td> 
							<td>No. 001</td> 
							<td>New</td> 
							<td>Canada</td> 
							<td></td> 
							<td>12/12/2022</td>
							<td>
								<a href="#delete"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
								<path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clip-rule="evenodd" />
							  </svg>
							  </a></td>
						</tr>
						<tr class="hover">
							<td>SPL 2022 0002</td> 
							<td>Hart Hagerty</td> 
							<td>No. 002</td> 
							<td>Renewal</td> 
							<td>United States</td> 
							<td></td> 
							<td>01/03/2023</td>
                            <td>
							<a href="#delete"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
								<path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clip-rule="evenodd" />
							  </svg>
							  </a></td>
						  </tr>
					
				</table>	
			</div>		
		
	</section>
</main>	