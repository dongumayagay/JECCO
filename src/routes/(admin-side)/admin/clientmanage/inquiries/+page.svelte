<script>
	import {goto} from '$app/navigation';


	function viewInquiry(inquiryId){
		goto('/admin/clientmanage/inquiries/' + inquiryId)

	}




</script>

	
	
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
						<tr class="hover cursor-pointer" on:click={() => viewInquiry('SPL-2022-0001')}  >
							<td>SPL-2022-0001</td> 
							<td>Trishan Andrei</td> 
							<td>No. 001</td> 
							<td>New</td> 
							<td>Canada</td> 
							<td></td> 
							<td>12/12/2022</td>
							<td></td>
						</tr>
						<tr class="hover cursor-pointer" on:click={() => viewInquiry('SPL-2022-0002')}>
							<td>SPL-2022-0002</td> 
							<td>Hart Hagerty</td> 
							<td>No. 002</td> 
							<td>Renewal</td> 
							<td>United States</td> 
							<td></td> 
							<td>01/03/2023</td>
                            <td></td>
						  </tr>
					
				</table>	
			</div>	