<script>
	import AddModal from "./AddModal.svelte";

	let users = []

	async function getListOfUsers(){
		const response = await fetch('/api/users')
		users = await response.json()
	}

	getListOfUsers()

</script>

	<div class="flex items-center p-4 shadow-md sm:rounded-lg h-10 bg-white gap-4">
		Users
		<div class="flex items-center absolute right-10 sm:rounded-lg bg-white gap-4">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<label for="add" class=" btn btn-ghost bg-gray-200 btn-xs sm:btn-2xs md:btn-xs lg:btn-sm hover:bg-green-300">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-5 h-5">
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
			</label>
		</div>    
	</div>
    
	<div class="overflow-x-auto relative shadow-md sm:rounded-lg h-full bg-white mt-4">
		<table class=" table w-full text-sm text-left text-gray-500 dark:text-gray-700 dark:bg-gray-700">
			<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-700">
				<tr>
					<th scope="col" class="px-6">
						Name
					</th>
					<th scope="col" class="px-6">
						Email
					</th>
					
				</tr>
			</thead>
			<tbody>
				{#each users as user }
				<tr class="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-600">
					<td class="px-6">
						{user.displayName}
					</td>
					<td>            
						{user.email}
					</td>
				</tr>
				{/each}
				
			</tbody>

		</table>
	
	</div>
	<AddModal/>
	