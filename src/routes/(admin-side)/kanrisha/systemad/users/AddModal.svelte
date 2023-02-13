<script>
    let addModal = false;
	let showPassword = false;
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

	
    function validatePassword(){
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
            errorPassword = 'Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters';
        } else {
            errorPassword = '';
        }

    }

    function toggleShowPassword(){
        showPassword = !showPassword;
    }
</script>

<input type="checkbox" bind:checked={addModal} id="add" class="modal-toggle" />
	<div class="modal">
		<div class="modal-box">

			<!-- Modal -->
			<form class="relative bg-white rounded-lg shadow dark:bg-gray-700" on:submit={addUser}>
				<!-- Modal header -->
				<div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">					
					<h3 class="text-xl font-semibold text-gray-900">Add User</h3>
				</div>
				<!-- Modal body -->
				<div>
					<div class=" flex flex-col gap-6 p-6 ">
						<div class="col-span-6 sm:col-span-3">
							<label for="Name" class="mb-2 text-sm font-medium text-gray-900">Fullname</label>
							<input type="text" bind:value={addUserInput.name} class=" bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5 capitalize" placeholder="Fullname" minlength="2" maxlength="50" required>
						</div>
						<div class="col-span-6 sm:col-span-3">
							<label for="Email" class="mb-2 text-sm font-medium text-gray-900">Email</label>
							<input type="email" bind:value={addUserInput.email} class=" bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5" placeholder="Ex. admin@jecco.com" minlength="5" maxlength="50" required>
						</div>
						<div class="col-span-6 sm:col-span-3">
							<label for="password" class="mb-2 text-sm font-medium text-gray-900">Password</label>
							{#if showPassword}
								<input type="text" bind:value={addUserInput.password} class=" bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5" placeholder="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required>
							{:else}
								<input type="password" bind:value={addUserInput.password} class=" bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5" placeholder="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required>
							{/if}
						</div>
						<div class="col-span-6 sm:col-span-3">
							<label for="confirmPassword" class="mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
							{#if showPassword}
							<input type="text" bind:value={addUserInput.confirmPassword} class=" bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5" placeholder="Confirm password" required>
							{:else}
							<input type="password" bind:value={addUserInput.confirmPassword} class=" bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5" placeholder="Confirm password" required>
							{/if}
							<div class=" relative text-sm mt-3 font-mono ">
								<input type="checkbox" class="checkbox checkbox-xs" on:click={toggleShowPassword}>
									{showPassword ? "Show" : "Show"} password
							</div>
						</div>
						
					</div>

					<div class="modal-action p-4 gap-4">
						<button type="submit" class="btn border-transparent bg-green-600">Add</button>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<label for="add" on:click={resetAddUserInput}  class="btn border-transparent bg-red-600">Cancel</label>
					</div>
				</div>	
			</form>
			
		</div>
	</div>