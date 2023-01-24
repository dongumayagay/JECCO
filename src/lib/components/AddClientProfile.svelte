<script>
    import {setDoc, doc } from 'firebase/firestore';
	import {db} from '$lib/firebase/client.js';

    let addModal = false
    let cliInfo = [];
    let addUserInput = {} 

    export async function clientInfo(infoClient){
        cliInfo = infoClient
        addUserInput = {
            firstname:cliInfo.firstname,
            lastname:cliInfo.lastname,
            email:cliInfo.email,
            number:cliInfo.number,
            houseNo:cliInfo.houseNo,
            barangay:cliInfo.barangay,
            municipality:cliInfo.municipality,
            province:cliInfo.province,
        }
    }

    function resetAddUserInput(){
		addUserInput = {
            username:'',
            email:'',
            password:'',
            confirmPassword:'',
            barangay:'',
            houseNo:'',
            municipality:'',
            province:'',
            acctOfficer:'',
            crdtInv:'',
            approved:'',
            released:'',
            collector:'',
            firstname:cliInfo.firstname,
            lastname:cliInfo.lastname,
            email:cliInfo.email,
            number:cliInfo.number,
            barangay:cliInfo.barangay,
            houseNo:cliInfo.houseNo,
            municipality:cliInfo.municipality,
            province:cliInfo.province,
            
            
	    } 
	}

    async function addUser(){
		if(addUserInput.password != addUserInput.confirmPassword){
			alert('Password does not match')
			return;
		}
		try {

			const response = await fetch('/api/clients',{method:'POST',
			body: JSON.stringify({
                name:addUserInput.firstname + ' ' + addUserInput.lastname,
                username:addUserInput.username,
                password:addUserInput.password,
                firstname:addUserInput.firstname,
                lastname:addUserInput.lastname,
                email:addUserInput.email,
                number:addUserInput.number,
                barangay:addUserInput.barangay,
                houseNo:addUserInput.houseNo,
                municipality:addUserInput.municipality,
                province:addUserInput.province,
                acctOfficer:addUserInput.acctOfficer,
                crdtInv:addUserInput.crdtInv,
                approved:addUserInput.approved,
                released:addUserInput.released,
                collector:addUserInput.collector
			})})
			
			
		} catch (error) {
			console.log(error)

		}

		resetAddUserInput()
		addModal = false
	}

</script>

<input type="checkbox" bind:checked={addModal} id="add" class="modal-toggle" />
<div class="modal">
    <div class="modal-box max-w-xl">

        <!-- Modal -->
        <form class="relative bg-white rounded shadow dark:bg-gray-700" on:submit={addUser}>
            <!-- Modal header -->
            <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Add Client Profile
                </h3>
            </div>
            <!-- Modal body -->
            <div class="p-6 space-y-6">
                <div class="grid grid-cols-2 gap-6">
                    <div class="">
                        <label for="first-name" class="block mb-2 text-sm font-medium  ">First Name</label>
                        <input type="text" bind:value={addUserInput.firstname} class="shadow-sm border text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 w-56 p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First Name" required>
                    </div>
                    <div class>
                        <label for="last-name" class="block mb-2 text-sm font-medium  ">Last Name</label>
                        <input type="text" bind:value={addUserInput.lastname} class="shadow-sm border text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 w-56 p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Last Name" required>
                    </div>
                    <div class="col-span-2">
                        <label for="username" class="block mb-2 text-sm font-medium  ">Email</label>
                        <input type="email" bind:value={addUserInput.username} class="shadow-sm  border text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 w-56 p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required>
                    </div>
                    <div class="">
						<label for="password" class="block mb-2 text-sm font-medium">Password</label>
						<input type="password" bind:value={addUserInput.password} class="shadow-sm border text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-56 p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required>
					</div>
					<div class="">
						<label for="confirmPassword" class="block mb-2 text-sm font-medium">Confirm Password</label>
						<input type="password" bind:value={addUserInput.confirmPassword} class="shadow-sm border text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-56 p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Confirm password" required>
					</div> 
                    <div class="">
                        <label for="email" class="block mb-2 text-sm font-medium  ">Email</label>
                        <input type="email" bind:value={addUserInput.email} class="shadow-sm  border text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-56 p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required>
                    </div>
                    <div class="">
                        <label for="contact-number" class="block mb-2 text-sm font-medium  ">Contact Number</label>
                        <input type="text" bind:value={addUserInput.number} class="shadow-sm  border text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-56 p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Contact Info" required>
                    </div>
                    <div class="">
                        <label for="house" class="block mb-2 text-sm font-medium  ">House No.</label>
                        <input type="text" bind:value={addUserInput.houseNo} class="shadow-sm  border overflow-y-auto text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-56 p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="House No." required>
                    </div>
                    <div class="">
                        <label for="brgy" class="block mb-2 text-sm font-medium  ">Barangay</label>
                        <input type="text" bind:value={addUserInput.barangay} class="shadow-sm  border overflow-y-auto text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-56 p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Barangay" required>
                    </div>
                    <div class="">
                        <label for="muni" class="block mb-2 text-sm font-medium  ">Municipality</label>
                        <input type="text"  bind:value={addUserInput.municipality} class="shadow-sm  border overflow-y-auto text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-56 p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Municipality" required>
                    </div>
                    <div class="">
                        <label for="prov" class="block mb-2 text-sm font-medium  ">Province</label>
                        <input type="text" bind:value={addUserInput.province} class="shadow-sm  border overflow-y-auto text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-56 p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500 " placeholder="Province" required>
                    </div>
                    <div class="">
                        <label for="prov" class="block mb-2 text-sm font-medium  ">Account Officer:</label>
                        <input type="text" bind:value={addUserInput.acctOfficer} class="shadow-sm  border overflow-y-auto text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-56 p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500 " placeholder="Account Officer" required>
                    </div>
                    <div class="">
                        <label for="prov" class="block mb-2 text-sm font-medium  ">Credit Investigated By:</label>
                        <input type="text" bind:value={addUserInput.crdtInv} class="shadow-sm  border overflow-y-auto text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-56 p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500 " placeholder="Credit Investigated By" required>
                    </div>
                    <div class="">
                        <label for="prov" class="block mb-2 text-sm font-medium  ">Approved By:</label>
                        <input type="text" bind:value={addUserInput.approved} class="shadow-sm  border overflow-y-auto text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-56 p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500 " placeholder="Approved By" required>
                    </div>
                    <div class="">
                        <label for="prov" class="block mb-2 text-sm font-medium  ">Released By:</label>
                        <input type="text" bind:value={addUserInput.released} class="shadow-sm  border overflow-y-auto text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-56 p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500 " placeholder="Released By" required>
                    </div>
                    <div class="">
                        <label for="prov" class="block mb-2 text-sm font-medium  ">Collector Assigned:</label>
                        <input type="text" bind:value={addUserInput.collector} class="shadow-sm  border overflow-y-auto text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-56 p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500 " placeholder="Collector Assigned" required>
                    </div>
                </div>
            </div>

            <div class="modal-action">    
                <button type="submit" class="btn border-transparent bg-green-600">Add</button>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <label for="add" on:click={resetAddUserInput()} class="btn border-transparent bg-red-600">Cancel</label>
            </div>
        </form>
    </div>
</div>