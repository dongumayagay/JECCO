<script>
    let updateModal = false;
    let uInfo = [];
    let addUserInput = {} 
    
    export async function userInfo(infoEmployee){
        uInfo = infoEmployee
        addUserInput = {
            name:uInfo.name,
		    address:uInfo.address,
            contactInfo:uInfo.contactInfo,
            role:uInfo.role,
	    }
    }

    function resetAddUserInput(){
		addUserInput = {
            name:uInfo.name,
		    address:uInfo.address,
            contactInfo:uInfo.contactInfo,
            role:uInfo.role,
            
	    } 
	}

    async function updateEmployee(){
        try {
            const response = await fetch(`/api/employees/${uInfo.id}`, { method: 'PUT',
            body: JSON.stringify({
            id:uInfo.id,    
            name:addUserInput.name,
		    address:addUserInput.address,
            contactInfo:addUserInput.contactInfo,
            role:addUserInput.role,
        })});    
        } catch (e) {
            console.error("Error adding document: ", e); 
        }
        resetAddUserInput()
		updateModal = false
    }

</script>
<input type="checkbox" bind:checked={updateModal} id="update" class="modal-toggle" />
<div class="modal">
    <div class="modal-box">

        <!-- Modal -->
        <form class="relative bg-white rounded-lg shadow dark:bg-gray-700" on:submit={updateEmployee}>
            <!-- Modal header -->
            <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Update 
                </h3>
            </div>
            <!-- Modal body -->
            <div class="p-6 space-y-6">
                <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-3">
                        <label for="first-name" class="mb-2 text-sm font-medium">Name</label>
                        <input type="text" bind:value={addUserInput.name} class="bg-gray-50 border border-gray-400 text-sm capitalize rounded-lg w-full p-2.5" maxlength="60" required>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="address" class="mb-2 text-sm font-medium">Adress</label>
                        <input type="text" bind:value={addUserInput.address} class="bg-gray-50 border border-gray-400 text-sm rounded-lg w-full p-2.5" maxlength="100" required>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="phone-number" class="mb-2 text-sm font-medium">Phone Number</label>
                        <input type="text" bind:value={addUserInput.contactInfo} class="bg-gray-50 border border-gray-400 text-sm rounded-lg w-full p-2.5" minlength="11" maxlength="11" required>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="phone-number" class="block mb-2 text-sm font-medium">Role</label>
                        <input type="text" bind:value={addUserInput.role} class="bg-gray-50 border border-gray-400 text-sm capitalize rounded-lg w-full p-2.5" placeholder="Role" pattern="[0-9]+" title="(ex. 09XX XXX XXXX)" minlength="11" maxlength="11" required>
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