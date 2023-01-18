<script>
    import { db } from '$lib/firebase/client.js'
    import { updateDoc, doc } from 'firebase/firestore';
    let updateModal = false;
    let cliInfo = [];
    let addUserInput = {} 
    export async function clientInfo(infoEmployee){
        cliInfo = infoEmployee
        addUserInput = {
            username:cliInfo.username,
            loanType:cliInfo.loanType,
            paymentMode:cliInfo.paymentMode,
            loanAmount:cliInfo.loanAmount,
            duration:cliInfo.duration,
            purpose:cliInfo.purpose,
            releaseDate:cliInfo.releaseDate
	    }
    }

    function resetAddUserInput(){
		addUserInput = {
            loanType:cliInfo.loanType,
            paymentMode:cliInfo.paymentMode,
            loanAmount:cliInfo.loanAmount,
            duration:cliInfo.duration,
            purpose:cliInfo.purpose,
            releaseDate:cliInfo.releaseDate
	    } 
	}

    async function updateEmployee(){
        try {
            await updateDoc(doc(db, 'loanprocess', cliInfo.id),{
                loanType:addUserInput.loanType,
                paymentMode:addUserInput.paymentMode,
                loanAmount:addUserInput.loanAmount,
                duration:addUserInput.duration,
                purpose:addUserInput.purpose,
                releaseDate:addUserInput.releaseDate
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
                        <label for="loan-type" class="block mb-2 text-sm font-medium  ">Loan type</label>
                        <input type="text" bind:value={addUserInput.loanType} class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Loan Type" required>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="mode-of-payment" class="block mb-2 text-sm font-medium  ">Mode of Payment</label>
                        <input type="text" bind:value={addUserInput.paymentMode} id="phone-number" class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mode of Payment" required>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="loan-amount" class="block mb-2 text-sm font-medium  ">Loan Amount</label>
                        <input type="text" bind:value={addUserInput.loanAmount} class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Amount php" required>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="duration" class="block mb-2 text-sm font-medium  ">Duration</label>
                        <input type="text" bind:value={addUserInput.duration} class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Duration" required>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="purpose" class="block mb-2 text-sm font-medium  ">Purpose</label>
                        <input type="text" bind:value={addUserInput.purpose} class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Purpose" required>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="date-created" class="block mb-2 text-sm font-medium  ">Release Date</label>
                        <input type="date" bind:value={addUserInput.releaseDate} class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Date created" required>
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