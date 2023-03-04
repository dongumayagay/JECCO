<script>
    let addModal = false

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
    async function addEmployee(){
        try {
        const docRef = await fetch('/api/employees',{method:'POST',
			body: JSON.stringify({
            name:addUserInput.name,
		    address:addUserInput.address,
            contactInfo:addUserInput.contactInfo,
            role:addUserInput.role,
        })});
        } catch (e) {
        console.error("Error adding document: ", e);
        }
        resetAddUserInput()
		addModal = false
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
                        <input type="text" bind:value={addUserInput.name} class="bg-gray-50 border border-gray-400 text-sm capitalize rounded-lg w-full p-2.5" placeholder="Fullname" minlength="4" maxlength="60" required>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="address" class="block mb-2 text-sm font-medium">Complete Adress</label>
                        <input type="text" bind:value={addUserInput.address} class="bg-gray-50 border border-gray-400 text-sm rounded-lg w-full p-2.5 capitalize" placeholder="complete address" maxlength="100" required>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="phone-number" class="block mb-2 text-sm font-medium">Contact Number</label>
                        <input type="number" bind:value={addUserInput.contactInfo} class="bg-gray-50 border border-gray-400 text-sm rounded-lg w-full p-2.5" placeholder="Contact Number" pattern="[0-9]+" title="(ex. 09XX XXX XXXX)" minlength="11" maxlength="11" required>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="phone-number" class="block mb-2 text-sm font-medium">Role</label>
                        <input type="text" bind:value={addUserInput.role} class="bg-gray-50 border border-gray-400 text-sm capitalize rounded-lg w-full p-2.5" placeholder="Role" pattern="[0-9]+" title="(ex. 09XX XXX XXXX)" minlength="11" maxlength="11" required>
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