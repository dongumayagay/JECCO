<script>
	import AddModal from "./AddModal.svelte";
	import ConfirmDeleteModal from "$lib/components/ConfirmDeleteModal.svelte";

	let users = []

	let showModal = false;
    let deleteSuccess = false;
    let idToDelete;

	async function getListOfUsers(){
		const response = await fetch('/api/users/admins')
		users = await response.json()
	}

	async function deleteUser(uid) {
		try {
			const response = await fetch(`/api/users/${uid}`, { method: 'DELETE',
			body: JSON.stringify({
					uid:uid,

			})});
		} catch (error) {
			console.log(error);
		}
	}

	getListOfUsers()

	function confirmDelete() {
        showModal = true;
    }

    function handleConfirm() {
        deleteUser(idToDelete);
        showModal = false;
    }

    function handleCancel() {
        showModal = false;
    }
</script>

<svelte:head>
	<title>JEM | Admin User</title>
</svelte:head>

	<div class="flex items-center p-4 shadow-md sm:rounded-lg h-10 bg-white gap-4">
		Admin Users
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
					</th>
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
					<td class="px-4">
						<div  class="flex items-center space-x-2 text-sm">
							<div class="dropdown">
								<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
								<label for='' tabindex="0" class="flex items-center justify-between text-sm font-medium leading-5 rounded-lg text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Delete">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" fill="currentColor" class="w-5 h-5">
										<path d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clip-rule="evenodd" />
									</svg>
								</label>
								<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
								<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-38">
									<!-- <li><label for="update">Edit</label></li> -->
									<li><button on:click={() => {idToDelete = user.uid, confirmDelete(); }}>Delete</button></li>
								</ul>
							</div>
						</div>  
					</td>
					<!-- <td>            
						{user.uid}
					</td> -->
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
	<ConfirmDeleteModal showModal={showModal}
onConfirm={handleConfirm}
onCancel={handleCancel}/>
	