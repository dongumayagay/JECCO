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
            province:cliInfo.province
        }
    }

    function resetAddUserInput(){
		addUserInput = {
            username:'',
            password:'',
            confirmPassword:'',
            barangay:'',
            houseNo:'',
            municipality:'',
            province:'',
            firstname:cliInfo.firstname,
            lastname:cliInfo.lastname,
            email:cliInfo.email,
            number:cliInfo.number,
            barangay:cliInfo.barangay,
            houseNo:cliInfo.houseNo,
            municipality:cliInfo.municipality,
            province:cliInfo.province
	    } 
	}

    async function addUser(){
		if(addUserInput.password != addUserInput.confirmPassword){
			alert('Password does not match')
			return;
		}
		try {

			const response = await fetch('/api/users/admins',{method:'POST',
			body: JSON.stringify({
                name:addUserInput.firstname + ' ' + addUserInput.lastname,
                email:addUserInput.username,
                password:addUserInput.password
			})})
			const userRecord = await response.json()
			const docRef = await setDoc(doc(db, "clientinfo", userRecord.uid), {
                username:addUserInput.username,
                firstname:addUserInput.firstname,
                lastname:addUserInput.lastname,
                email:addUserInput.email,
                number:addUserInput.number,
                barangay:addUserInput.barangay,
                houseNo:addUserInput.houseNo,
                municipality:addUserInput.municipality,
                province:addUserInput.province
        	});
			
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
                        <label for="username" class="block mb-2 text-sm font-medium  ">Username</label>
                        <input type="email" bind:value={addUserInput.username} class="shadow-sm  border text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 w-56 p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required>
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
                        <input type="text"  bind:value={addUserInput.municipality} class="shadow-sm  border overflow-y-auto text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-56 p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Municipality" required="">
                    </div>
                    <div class="">
                        <label for="prov" class="block mb-2 text-sm font-medium  ">Province</label>
                        <input type="text" bind:value={addUserInput.province} class="shadow-sm  border overflow-y-auto text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-56 p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500 " placeholder="Province" required="">
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