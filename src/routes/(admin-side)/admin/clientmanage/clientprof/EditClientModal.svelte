<script>
    import { db } from '$lib/firebase/client.js'
    import { updateDoc, doc } from 'firebase/firestore';
    let updateModal = false;
    let cliInfo = [];
    let addUserInput = {} 
    
    export async function clientInfo(infoClient){
        cliInfo = infoClient
        addUserInput = {
            firstname:cliInfo.firstname,
            lastname:cliInfo.lastname,
            email:cliInfo.email,
            number:cliInfo.number,
            address:cliInfo.address,
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
            await updateDoc(doc(db, 'clientinfo', cliInfo.id),{
                firstname:addUserInput.firstname,
                lastname:addUserInput.lastname,
                email:addUserInput.email,
                number:addUserInput.number,
                address:addUserInput.address,
        });    
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
                        <input type="text" bind:value={addUserInput.lastname} class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Last Name" required="">
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="first-name" class="block mb-2 text-sm font-medium  ">First Name</label>
                        <input type="text" bind:value={addUserInput.firstname} class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First Name" required="">
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="adress" class="block mb-2 text-sm font-medium  ">Address</label>
                        <input type="text" bind:value={addUserInput.address} class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Address" required="">
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="email" class="block mb-2 text-sm font-medium  ">Email</label>
                        <input type="email" bind:value={addUserInput.email} class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required="">
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="contact-number" class="block mb-2 text-sm font-medium  ">Contact Number</label>
                        <input type="text" bind:value={addUserInput.number} class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Contact Info" required="">
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