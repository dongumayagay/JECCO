<script>
    let addModal = false;
	let showPassword = false;
	let passwordError = '';
	let addUserInput = {
		name:'',
		email:'',
		password:'',
		confirmPassword:''
	} 
	
	function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
	
	async function addUser(){
		if(addUserInput.password != addUserInput.confirmPassword){
			alert('Password does not match')
			return;
		}
		try {

			const response = await fetch('/api/users/admins',{method:'POST',
			body: JSON.stringify({
					name:addUserInput.name.toLowerCase().split(" ").map(capitalize).join(" "),
					email:addUserInput.email,
					password:addUserInput.password,

				})})
		} catch (error) {
			console.log(error)

		}

		resetAddUserInput()
		addModal = false
		location.reload();
	}

	function resetAddUserInput(){
			addUserInput = {
			name:'',
			email:'',
			password:'',
			confirmPassword:''
		} 
	}

	function validateInput(value) {
        const pattern = /^[a-zA-Z ]+([-]?[a-zA-Z ]+)?(\.[a-zA-Z ]+([-]?[a-zA-Z ]+)?)?$/;
        return pattern.test(value);
    }

    function handleRegexInput(event, inputBinding) {
        const value = event.target.value;
        if (!validateInput(value)) {
            event.target.setCustomValidity('Please enter only text, 1 dot, and 1 dash');
            addUserInput[inputBinding] = '';
        } else {
            event.target.setCustomValidity('');
            addUserInput[inputBinding] = value;
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
							<input type="text" bind:value={addUserInput.name} on:input={(event) => handleRegexInput(event, 'addUserInput.name')} class="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5 capitalize" placeholder="Fullname" minlength="2" maxlength="60" required>
						</div>
						<div class="col-span-6 sm:col-span-3">
							<label for="Email" class="mb-2 text-sm font-medium text-gray-900">Email</label>
							<input type="email" bind:value={addUserInput.email} class=" bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5" placeholder="Ex. admin@gmail.com" minlength="5" maxlength="50" required>
						</div>
						<div class="col-span-6 sm:col-span-3">
							<label for="password" class="mb-2 text-sm font-medium text-gray-900">Password</label>
							{#if showPassword}
								<input type="text" bind:value={addUserInput.password} class=" bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5" placeholder="password" required>
							{:else}
								<input type="password" bind:value={addUserInput.password} class=" bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5" placeholder="password" required>
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