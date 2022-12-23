	<div class="flex items-center p-4 shadow-md sm:rounded-lg h-10 bg-white gap-4">
		Admin Users
		<div class="flex items-center absolute right-10 p-4 shadow-md sm:rounded-lg h-10 bg-white gap-4">
			
			<label for="my-modal" class=" btn btn-ghost bg-gray-200 btn-xs sm:btn-2xs md:btn-xs lg:btn-sm hover:bg-green-300">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-5 h-5">
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
			</label>
			
			<button for="my-modal" class=" btn btn-ghost bg-gray-200 btn-xs sm:btn-2xs md:btn-xs lg:btn-sm hover:bg-red-300">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>   
			</button>
			 
		</div>    
	</div>
    

	<div class="overflow-x-auto relative shadow-md sm:rounded-lg h-full bg-white mt-4">
		<table class=" table w-full text-sm text-left text-gray-500 dark:text-gray-700 dark:bg-gray-700">
			<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-700">
				<tr>
					<th scope="col" class="">
					</th>
					<th scope="col" class="px-6">
						id
					</th>
					<th scope="col" class="px-6">
						Username
					</th>
					<th scope="col" class="px-6">
						Password
					</th>
					<th scope="col" class="px-6">
						
					</th>
				</tr>
			</thead>
			<tbody>
				<tr class="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-600">
					<td class="p-4 w-4">
						<div class="flex items-center">
							<input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
						</div>
					</td>
					<td>            
						01
					</td>
					<td class="px-6">
						adminuser01@gmail.com
					</td>
					<td>            
						password
					</td>
					<td class="px-6">
						<!-- Modal toggle -->
						<label for="my-modal" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</label> 
					</td>
				</tr>
				
				<tr class="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-600">
					<td class="p-4 w-4">
						<div class="flex items-center">
							<input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
						</div>
					</td>
					<td>            
						02
					</td>
					<td class="px-6">
						adminuser02@gmail.com
					</td>
					<td>            
						password
					</td>
					<td class="px-6">
						<!-- Modal toggle -->
						<label for="my-modal" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</label> 
					</td>
				</tr>

				<tr class="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-600">
					<td class="p-4 w-4">
						<div class="flex items-center">
							<input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
						</div>
					</td>
					<td>            
						03
					</td>
					<td class="px-6">
						adminuser03@gmail.com
					</td>
					<td>            
						password
					</td>
					<td class="px-6">
						<!-- Modal toggle -->
						<label for="my-modal" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</label> 
					</td>
				</tr>

			</tbody>

		</table>
	
	</div>

	<input type="checkbox" id="my-modal" class="modal-toggle" />
	<div class="modal">
		<div class="modal-box">

			<!-- Modal -->
			<form action="#" class="relative bg-white rounded-lg shadow dark:bg-gray-700">
				<!-- Modal header -->
				<div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
					<h3 class="text-xl font-semibold text-gray-900 dark:text-white">
						Edit Profile
					</h3>
				</div>
				<!-- Modal body -->
				<div class="p-6 space-y-6">
					<div class="grid grid-cols-6 gap-6">
						<div class="col-span-6 sm:col-span-3">
							<label for="Email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
							<input type="text" name="Email" id="Email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="adminuser01@gmail.com" required="">
						</div>
						<div class="col-span-6 sm:col-span-3">
							<label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
							<input type="text" name="password" id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="password" required="">
						</div>
						
				</div>
			</form>
			<div class="modal-action">
				<label for="my-modal" class="btn border-transparent bg-green-600">Save</label>
				<label for="my-modal" class="btn border-transparent bg-red-600">Cancel</label>
			</div>
		</div>
	</div>