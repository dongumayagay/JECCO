<script>
    let addModal = false;

    let addUserInput = {
		name:'',
		address:'',
        contactInfo:'',
        role:''
	} 

    function resetAddUserInput(){
		addUserInput = {
            name:'',
		    address:'',
            contactInfo:'',
            role:''
	} 
	}

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    async function addEmployee(){
        try {
        const docRef = await fetch('/api/employees',{method:'POST',
			body: JSON.stringify({
            name:addUserInput.name.toLowerCase().split(" ").map(capitalize).join(" "),
		    address:addUserInput.address.toLowerCase().split(" ").map(capitalize).join(" "),
            contactInfo:addUserInput.contactInfo,
            role:addUserInput.role.toLowerCase().split(" ").map(capitalize).join(" "),
        })});
        } catch (e) {
        console.error("Error adding document: ", e);
        }
        resetAddUserInput()
		addModal = false
    }

    function limitInputLength(event) {
        const maxLength = 11;
        const value = event.target.value;
        const pattern = /^09\d*$/;

        if (value.length > maxLength) {
            event.target.value = addUserInput.contactInfo;
        }
            else if(value.length < maxLength){
                event.target.setCustomValidity('Your number is too short. (Ex. 09XX XXX XXX)');
        }
             else if (!pattern.test(value) ) {
            event.target.setCustomValidity('Input must start with "09" and only contain numbers (Ex. 09XX XXX XXX)');
        } else {
            event.target.setCustomValidity('');
            addUserInput.contactInfo = value;
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
</script>

<input type="checkbox" bind:checked={addModal} id="add" class="modal-toggle" />
<div class="modal">
    <div class="modal-box">

        <!-- Modal -->
        <form class="relative bg-white rounded-lg shadow dark:bg-gray-700" on:submit={addEmployee}>
            <!-- Modal header -->
            <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                <h3 class="text-xl font-semibold dark:text-white">
                    Add
                </h3>
            </div>
            <!-- Modal body -->
            <div class="p-6 space-y-6">
                <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-3">
                        <label for="first-name" class="block mb-2 text-sm font-medium">Fullname</label>
                        <input type="text" bind:value={addUserInput.name} on:input={(event) => handleRegexInput(event, 'addUserInput.name')} class="bg-gray-50 border border-gray-400 text-sm capitalize rounded-lg w-full p-3" placeholder="Fullname" minlength="4" maxlength="60" required/>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="address" class="block mb-2 text-sm font-medium">Complete Adress</label>
                        <input type="text" bind:value={addUserInput.address} class="bg-gray-50 border border-gray-400 text-sm rounded-lg w-full capitalize p-3" placeholder="complete address" maxlength="100" required/>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="phone-number" class="block mb-2 text-sm font-medium">Contact Number</label>
                        <input class="bg-gray-50 border border-gray-400 text-sm rounded-lg w-full p-3" type="text" on:input={limitInputLength} bind:value={addUserInput.contactInfo} placeholder="Contact Number" required />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="role" class="block mb-2 text-sm font-medium">Role</label>
                        <select name="role" class="select select-bordered w-full" bind:value={addUserInput.role}>
                            <option value="Collector">Collector</option>
                            <option value="Admin1">Admin1</option>
                            <option value="Admin2">Admin2</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="modal-action">    
                <button type="submit" class="btn border-transparent bg-green-600">Add</button>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <label for="add" on:click={resetAddUserInput}  class="btn border-transparent bg-red-600">Cancel</label>
            </div>
        </form>
    </div>
</div>