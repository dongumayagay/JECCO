		<div class="flex items-center p-4 shadow-md sm:rounded-lg h-auto bg-white gap-4">
			<input class="p-2" type="text" placeholder="Collector Name">
			<select name="status" id="status">
				<option value="inactive">Inactive</option>
				<option value="active">Active</option>
			</select>

			<label for="add" class="absolute right-16 font-medium text-blue-600 dark:text-blue-500 hover:underline">
                <div class=" btn btn-ghost bg-gray-200 btn-xs sm:btn-2xs md:btn-xs lg:btn-sm hover:bg-green-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                    </div>

            </label>
		</div>

		<div class="overflow-x-auto relative shadow-md sm:rounded-lg h-full bg-white mt-4">
			<div class="overflow-x-auto">
				<table class="table table-normal w-full">
					<thead>
						<tr class="hover">
							<th>SEQ #</th> 
							<th>Area Name</th> 
							<th>Status</th> 
							<th></th>
						</tr>
					</thead> 
					<tbody>
						<tr class="hover">
							<th>1</th> 
							<td>Cuyab</td> 
							<td>Active</td> 
							<td class="py-4 px-6"><label for="my-modal" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</label> 
							</td>
						</tr>
						<tr class="hover">
							<th>2</th>  
							<td>Pacita</td> 
							<td>Inactive</td> 
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
                            Edit
                        </h3>
                        <!-- <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover: rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="editUserModal">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                        </button> -->
                    </div>
                    <!-- Modal body -->
                    <div class="p-6 space-y-6">
                        <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6 sm:col-span-3">
                                <label for="first-name" class="block mb-2 text-sm font-medium  ">SEQ #</label>
                                <input type="text" name="first-name" id="first-name" class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=" 1 " required="">
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="first-name" class="block mb-2 text-sm font-medium  ">AREA NAME</label>
                                <input type="text" name="first-name" id="first-name" class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cuyab" required="">
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

        <input type="checkbox" id="add" class="modal-toggle" />
        <div class="modal">
            <div class="modal-box">
        
                <!-- Modal -->
                <form action="#" class="relative rounded-lg shadow">
                    <!-- Modal header -->
                    <div class="flex justify-between items-start p-4 rounded-t border-b ">
                        <h3 class="text-xl font-semibold  ">
                            Add
                        </h3>
                        <!-- <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover: rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="editUserModal">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                        </button> -->
                    </div>
                    <!-- Modal body -->
                    <div class="p-6 space-y-6">
                        <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6 sm:col-span-3">
                                <label for="first-name" class="block mb-2 text-sm font-medium  ">SEQ #</label>
                                <input type="text" name="first-name" id="first-name" class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=" 1 " required="">
                            </div>
                            <div class="col-span-6 sm:col-span-3">
                                <label for="first-name" class="block mb-2 text-sm font-medium  ">AREA NAME</label>
                                <input type="text" name="first-name" id="first-name" class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cuyab" required="">
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
                    <label for="add" class="btn border-transparent bg-green-600">Save</label>
                    <label for="add" class="btn border-transparent bg-red-600">Cancel</label>
				</div>	
            </div>
        </div>