<script>
    let updateModal = false;
    let cliInfo = [];
    let addUserInput = {} 
    
    export async function clientsInfo(infoClient){
        cliInfo = infoClient
        addUserInput = {
            firstname:cliInfo.firstname,
            lastname:cliInfo.lastname,
            email:cliInfo.email,
            number:cliInfo.number,
            address:cliInfo.address,
            barangay:cliInfo.barangay,
            houseNo:cliInfo.houseNo,
            municipality:cliInfo.municipality,
            province:cliInfo.province
	    }
    }

    function resetAddUserInput(){
		addUserInput = {
            firstname:cliInfo.firstname,
            lastname:cliInfo.lastname,
            email:cliInfo.email,
            number:cliInfo.number,
            address:cliInfo.address,
	    } 
	}

    async function updateClient(){
        try {
			const response = await fetch(`/api/clients/${cliInfo.id}`, { method: 'PUT',
            body: JSON.stringify({
                id:cliInfo.id,
                firstname:addUserInput.firstname,
                lastname:addUserInput.lastname,
                email:addUserInput.email,
                number:addUserInput.number,
                barangay:addUserInput.barangay,
                houseNo:addUserInput.houseNo,
                municipality:addUserInput.municipality,
                province:addUserInput.province
			})});
		} catch (error) {
			console.log("Error adding document: ",error);
		}
        resetAddUserInput()
		updateModal = false
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

    function limitInputLength(event) {
        const maxLength = 11;
        const value = event.target.value;
        const pattern = /^09\d*$/;

        if (value.length > maxLength) {
            event.target.value = addUserInput.number;
        }
            else if(value.length < maxLength){
                event.target.setCustomValidity('Your number is too short. (Ex. 09XX XXX XXX)');
        }
             else if (!pattern.test(value) ) {
            event.target.setCustomValidity('Input must start with "09" and only contain numbers (Ex. 09XX XXX XXX)');
        } else {
            event.target.setCustomValidity('');
            addUserInput.number = value;
        }
  }


</script>
<input type="checkbox" bind:checked={updateModal} id="update" class="modal-toggle" />
<div class="modal">
    <div class="modal-box">

        <!-- Modal -->
        <form class="relative bg-white rounded-lg shadow dark:bg-gray-700" on:submit={updateClient}>
            <!-- Modal header -->
            <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Update Client Information
                </h3>
            </div>
            <!-- Modal body -->
            <div class="p-6 space-y-6">
                <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-3">
                        <label for="first-name" class="block mb-2 text-sm font-medium  ">First Name</label>
                        <!-- <input type="text" bind:value={addUserInput.firstname} class=" border text-sm rounded-lg" placeholder="First Name" maxlength="30" minlength="2" required> -->
                        <input type="text" bind:value={addUserInput.firstname} on:input={(event) => handleRegexInput(event, 'addUserInput.firstname')} class="border text-sm capitalize rounded-lg"  placeholder="First Name" maxlength="30" minlength="2" required>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="last-name" class="block mb-2 text-sm font-medium  ">Last Name</label>
                        <!-- <input type="text" bind:value={addUserInput.lastname} class=" border text-sm rounded-lg" placeholder="Last Name" maxlength="30" minlength="2" required> -->
                        <input type="text" bind:value={addUserInput.lastname} on:input={(event) => handleRegexInput(event, 'addUserInput.lastname')} class="border text-sm capitalize rounded-lg" placeholder="Last Name" maxlength="30" minlength="2" required>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="email" class="block mb-2 text-sm font-medium  ">Email</label>
                        <input type="email" bind:value={addUserInput.email} class=" border text-sm rounded-lg" placeholder="Email" minlength="5" maxlength="50" required>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="contact-number" class="block mb-2 text-sm font-medium  ">Contact Number</label>
                        <input class="border text-sm rounded-lg" type="text" on:input={limitInputLength} bind:value={addUserInput.number} placeholder="Contact Number" required />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="house" class="block mb-2 text-sm font-medium  ">House No.</label>
                        <input type="text" bind:value={addUserInput.houseNo} class=" border text-sm rounded-lg" placeholder="House No." maxlength="30" required>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="brgy" class="block mb-2 text-sm font-medium  ">Barangay</label>
                        <input type="text" bind:value={addUserInput.barangay} class=" border text-sm rounded-lg capitalize" placeholder="Barangay" minlength="3" maxlength="30" required>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="muni" class="block mb-2 text-sm font-medium  ">Municipality</label>
                        <!-- <input type="text"  bind:value={addUserInput.municipality} class=" border text-sm rounded-lg" placeholder="Municipality" minlength="3" maxlength="30" required> -->
                        <input type="text" bind:value={addUserInput.municipality} on:input={(event) => handleRegexInput(event, 'addUserInput.municipality')} class=" border text-sm capitalize rounded-lg" placeholder="Municipality" minlength="3" maxlength="30" required>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="prov" class="block mb-2 text-sm font-medium  ">Province</label>
                        <!-- <input type="text" bind:value={addUserInput.province} class=" border text-sm rounded-lg " placeholder="Province" minlength="3" maxlength="30" required> -->
                        <input type="text" bind:value={addUserInput.province} on:input={(event) => handleRegexInput(event, 'addUserInput.province')} class=" border text-sm capitalize rounded-lg" placeholder="Province" minlength="3" maxlength="30" required>
                    </div>
                </div>
            </div>

            <div class="modal-action">    
                <button type="submit" class="btn border-transparent bg-blue-600">Save</button>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <label for="update" on:click={resetAddUserInput}  class="btn border-transparent bg-red-600">Cancel</label>
            </div>
        </form>
    </div>
</div>