     <div class="flex items-center p-4 shadow-md sm:rounded-lg h-10 bg-white gap-4">
            Loan Processing 
            <div class="absolute right-16">
                <label for="my-modal" class="font-medium text-blue-600 p-2 dark:text-blue-500 hover:underline">
                    <div class=" btn btn-ghost bg-gray-200 btn-xs sm:btn-2xs md:btn-xs lg:btn-sm hover:bg-green-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                        </div>
                </label>
                <button for="my-modal" class=" btn btn-ghost bg-gray-200 btn-xs sm:btn-2xs md:btn-xs lg:btn-sm hover:bg-red-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>   
                </button>
            </div>
        </div>
        
		
			<div class="overflow-x-auto relative shadow-md sm:rounded-lg h-full bg-white mt-4">
				<div class="overflow-x-auto">
					<table class="table table-normal w-full">
						<thead>
							<tr class="hover">
								<th>Ctrl No.</th> 
                                <th>Member</th> 
								<th>Type of Loan</th> 
								<th>Mode of Payment</th> 
								<th>Loan Amount</th> 
								<th>Duration</th> 
                                <th>purpose</th> 
								<th>Status</th> 
                                <th></th>
							</tr>
						</thead> 
						<tbody>
							<tr class="hover">
								<th>1</th> 
                                <td>Smith</td> 
								<td>CSB Loan</td> 
								<td>Monthly Payment</td> 
								<td>500,000.00 php</td> 
								<td>3 years</td> 
                                <td>Renovation</td> 
								<td>Active</td> 
                                <td class="py-4 px-6"><label for="my-modal" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</label> 
                                </td>
							</tr>
							<tr class="hover">
								<th>2</th>  
                                <td>Will</td> 
								<td>CSB Loan</td> 
								<td>Monthly Payment</td> 
								<td>300,000.00 php</td> 
								<td>3 years</td> 
                                <td>Renovations</td> 
								<td>Fully Paid</td> 
                                <td class="py-4 px-6"><label for="my-modal" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</label> 
                                </td>
							</tr>
						</tbody> 
					</table>	
				</div>		
			</div>

        <input type="checkbox" id="my-modal" class="modal-toggle" />
        <div class="modal">
            <div class="modal-box">
        
                <!-- Modal -->
                <form action="#" class="relative rounded-lg shadow">
                    <!-- Modal header -->
                    <div class="flex justify-between items-start p-4 rounded-t border-b ">
                        <h3 class="text-xl font-semibold  ">
                            Process Loan
                        </h3>
                        <!-- <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover: rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="editUserModal">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                        </button> -->
                    </div>
                    <!-- Modal body -->
                    <div class="p-6 space-y-6">
                        <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6 sm:col-span-3">
                                <label for="first-name" class="block mb-2 text-sm font-medium  ">CTRL NO.</label>
                                <input type="text" name="first-name" id="first-name" class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="number10" required="">
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="first-name" class="block mb-2 text-sm font-medium  ">MEMBER</label>
                                <input type="text" name="first-name" id="first-name" class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Francis" required="">
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="first-name" class="block mb-2 text-sm font-medium  ">TYPE OF LOAN</label>
                                <input type="text" name="first-name" id="first-name" class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="CSB Loan" required="">
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="first-name" class="block mb-2 text-sm font-medium  ">MODE OF PAYMENT</label>
                                <input type="text" name="first-name" id="first-name" class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Monthly Payment" required="">
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="last-name" class="block mb-2 text-sm font-medium  ">LOAN AMOUNT</label>
                                <input type="text" name="last-name" id="last-name" class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="500,000 php" required="">
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="email" class="block mb-2 text-sm font-medium  ">DURATION</label>
                                <input type="email" name="email" id="email" class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="3 years" required="">
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="phone-number" class="block mb-2 text-sm font-medium  ">PURPOSE</label>
                                <input type="text" name="phone-number" id="phone-number" class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Renovation" required="">
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="department" class="block mb-2 text-sm font-medium  ">STATUS</label>
                                <input type="text" name="department" id="department" class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Active" required="">
                            </div>
                        </div>
                    </div>
                    <!-- Modal footer -->
                    <!-- <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save all</button>
                    </div> -->
                </form>
        
        
                <div class="modal-action">
                    <label for="my-modal" class="btn border-transparent bg-green-600">Save</label>
                    <label for="my-modal" class="btn border-transparent bg-red-600">Cancel</label>
                </div>    
            </div>
        </div>
