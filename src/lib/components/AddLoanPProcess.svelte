<script>
    import {setDoc, doc, onSnapshot, collection } from 'firebase/firestore';
	import {db} from '$lib/firebase/client.js';
	import AddClientProfile from './AddClientProfile.svelte';

    let addModal = false
    let cliInfo = [];
    let addUserInput = {} 

    //auto incrementers
    let loans = []
    let totalLoans = 0 
    const unsubscribe = onSnapshot(collection(db, 'loanprocess'), (querySnapshot) => {
            loans = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            totalLoans = loans.length + 1;
    });
    //

    export async function clientInfo(infoClient){
        cliInfo = infoClient
        addUserInput = {
            loanNumber:totalLoans,
            id:cliInfo.id,
            username: cliInfo.username,
            area:cliInfo.barangay
        }
    }

    function resetAddUserInput(){
		addUserInput = {
            loanNumber:totalLoans,
            loanType:'',
            paymentMode:'',
            loanAmount:'',
            duration:'',
            purpose:'',
            releaseDate:'',
            area:cliInfo.barangay
	    } 
	}

    async function addUser(){
		try {
			const docRef = await setDoc(doc(db, "loanprocess", cliInfo.id), {
                loanNumber:addUserInput.loanNumber,
                username:cliInfo.username,
                loanType:addUserInput.loanType,
                paymentMode:addUserInput.paymentMode,
                loanAmount:addUserInput.loanAmount,
                duration:addUserInput.duration,
                purpose:addUserInput.purpose,
                releaseDate:addUserInput.releaseDate,
                area:addUserInput.area
        	});
		} catch (error) {
			console.log(error)

		}
		resetAddUserInput()
		addModal = false
	}

</script>

<input type="checkbox" bind:checked={addModal} id="add2" class="modal-toggle" />
<div class="modal">
    <div class="modal-box">

        <!-- Modal -->
        <form class="relative bg-white rounded-lg shadow dark:bg-gray-700" on:submit={addUser}>
            <!-- Modal header -->
            <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Process Loan
                </h3>
            </div>
            <!-- Modal body -->
            <div class="p-6 space-y-6">
                <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-3">
                        <label for="date-created" class="block mb-2 text-sm font-medium  ">Loan Number</label>
                        <input type="text" disabled bind:value={addUserInput.loanNumber} class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Loan Number" required="">
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="loan-type" class="block mb-2 text-sm font-medium  ">Loan type</label>
                        <input type="text" bind:value={addUserInput.loanType} class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Loan Type" required="">
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="mode-of-payment" class="block mb-2 text-sm font-medium  ">Mode of Payment</label>
                        <input type="text" bind:value={addUserInput.paymentMode} id="phone-number" class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mode of Payment" required="">
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="loan-amount" class="block mb-2 text-sm font-medium  ">Loan Amount</label>
                        <input type="text" bind:value={addUserInput.loanAmount} class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Amount php" required="">
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="duration" class="block mb-2 text-sm font-medium  ">Duration</label>
                        <input type="text" bind:value={addUserInput.duration} class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Duration" required="">
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="purpose" class="block mb-2 text-sm font-medium  ">Purpose</label>
                        <input type="text" bind:value={addUserInput.purpose} class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Purpose" required="">
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="date-created" class="block mb-2 text-sm font-medium  ">Release Date</label>
                        <input type="date" bind:value={addUserInput.releaseDate} class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Date created" required="">
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="date-created" class="block mb-2 text-sm font-medium  ">Area</label>
                        <input type="text" disabled bind:value={addUserInput.area} class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Area" required="">
                    </div>
                </div>
            </div>

            <div class="modal-action">    
                <button type="submit" class="btn border-transparent bg-green-600">Add</button>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <label for="add2" on:click={resetAddUserInput()} class="btn border-transparent bg-red-600">Cancel</label>
            </div>
        </form>
    </div>
</div>
<AddClientProfile/>