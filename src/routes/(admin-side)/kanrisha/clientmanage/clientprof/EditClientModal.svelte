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
                        <label for="last-name" class="block mb-2 text-sm font-medium  ">Last Name</label>
                        <input type="text" bind:value={addUserInput.lastname} class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Last Name" required>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="first-name" class="block mb-2 text-sm font-medium  ">First Name</label>
                        <input type="text" bind:value={addUserInput.firstname} class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First Name" required>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="email" class="block mb-2 text-sm font-medium  ">Email</label>
                        <input type="email" bind:value={addUserInput.email} class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="contact-number" class="block mb-2 text-sm font-medium  ">Contact Number</label>
                        <input type="text" bind:value={addUserInput.number} class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Contact Info" required>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="house" class="block mb-2 text-sm font-medium  ">House No.</label>
                        <input type="text" bind:value={addUserInput.houseNo} class="shadow-sm  border text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="House No." required>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="brgy" class="block mb-2 text-sm font-medium  ">Barangay</label>
                        <input type="text" bind:value={addUserInput.barangay} class="shadow-sm  border text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Barangay" required>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="muni" class="block mb-2 text-sm font-medium  ">Municipality</label>
                        <input type="text"  bind:value={addUserInput.municipality} class="shadow-sm  border text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Municipality" required="">
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="prov" class="block mb-2 text-sm font-medium  ">Province</label>
                        <input type="text" bind:value={addUserInput.province} class="shadow-sm  border text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500 " placeholder="Province" required="">
                    </div>
                </div>
            </div>

            <div class="modal-action">    
                <button type="submit" class="btn border-transparent bg-blue-600">Update</button>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <label for="update" on:click={resetAddUserInput}  class="btn border-transparent bg-red-600">Cancel</label>
            </div>
        </form>
    </div>
</div>