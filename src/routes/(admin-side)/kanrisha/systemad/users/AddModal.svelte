<script>
    let addModal = false
	let addUserInput = {
		name:'',
		email:'',
		password:'',
		confirmPassword:''
	} 
	
	async function addUser(){
		if(addUserInput.password != addUserInput.confirmPassword){
			alert('Password does not match')
			return;
		}
		try {

			const response = await fetch('/api/users/admins',{method:'POST',
			body: JSON.stringify({
					name:addUserInput.name,
					email:addUserInput.email,
					password:addUserInput.password,

				})})
		} catch (error) {
			console.log(error)

		}

		resetAddUserInput()
		addModal = false
	}

	function resetAddUserInput(){
		addUserInput = {
		name:'',
		email:'',
		password:'',
		confirmPassword:''
	} 
	}
</script>

<input type="checkbox" bind:checked={addModal} id="add" class="modal-toggle" />
	<div class="modal">
		<div class="modal-box">

			<!-- Modal -->
			<form class="relative bg-white rounded-lg shadow dark:bg-gray-700" on:submit={addUser}>
				<!-- Modal header -->
				<div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">					
					<h3 class="text-xl font-semibold text-gray-900 dark:text-white">Add User</h3>
				</div>
				<!-- Modal body -->
				<div>
					<div>
						<div class="col-span-6 sm:col-span-3">
							<label for="Name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
							<input type="text" bind:value={addUserInput.name} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required>
						</div>
						<div class="col-span-6 sm:col-span-3">
							<label for="Email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
							<input type="email" bind:value={addUserInput.email} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="adminuser01@gmail.com" required>
						</div>
						<div class="col-span-6 sm:col-span-3">
							<label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
							<input type="password" bind:value={addUserInput.password} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="password" required>
						</div>
						<div class="col-span-6 sm:col-span-3">
							<label for="confirmPassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
							<input type="password" bind:value={addUserInput.confirmPassword} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Confirm password" required>
						</div>
						
					</div>

					<div class="modal-action">
						<button type="submit" class="btn border-transparent bg-green-600">Add</button>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<label for="add" on:click={resetAddUserInput}  class="btn border-transparent bg-red-600">Cancel</label>
					</div>
				</div>	
			</form>
			
		</div>
	</div>