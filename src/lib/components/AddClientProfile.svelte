<script>
    import { collection, updateDoc, query, where, orderBy, limit, doc, getDocs, addDoc, getDoc } from "firebase/firestore";
    import {db} from '$lib/firebase/client.js';
    let addModal = false;
    let cliInfo = []
    let addUserInput = {}
    let prefix = "SPL";
    let count = 1
    let ctrlNumber = "000000"
    let thisClientNumber="";
    let errorPassword = '';
    let showPassword = false;

    export async function clientInfo(infoClient,clients){
        cliInfo = infoClient
        const docSnap = await getDoc(doc(db, "id_counters", "clients_counter")); 
        count = docSnap.data()
        count.count ++  
        ctrlNumber = ctrlNumber + count.count.toString()
        thisClientNumber = prefix+new Date().getFullYear()+ctrlNumber.slice(-6)
        addUserInput = {
            clientNumber: thisClientNumber,
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
        ctrlNumber = "000000"
        addUserInput = {
            username:'',
            password:'',
            confirmPassword:'',
            clientNumber:thisClientNumber,
            firstname:cliInfo.firstname,
            lastname:cliInfo.lastname,
            email:cliInfo.email,
            number:cliInfo.number,
            barangay:cliInfo.barangay,
            houseNo:cliInfo.houseNo,
            municipality:cliInfo.municipality,
            province:cliInfo.province,
            dateCreated:'',
            coMaker:'',
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
                clientNumber:addUserInput.clientNumber,
                name:addUserInput.firstname + ' ' + addUserInput.lastname,
                username:addUserInput.username,
                password:addUserInput.password,
                firstname:addUserInput.firstname,
                lastname:addUserInput.lastname,
                email:addUserInput.email,
                coMaker:addUserInput.coMaker,
                number:addUserInput.number,
                barangay:addUserInput.barangay,
                houseNo:addUserInput.houseNo,
                municipality:addUserInput.municipality,
                province:addUserInput.province,
                dateCreated:addUserInput.dateCreated,
                
			})})
			await updateDoc(doc(db, "id_counters", "clients_counter"), {
                count: count.count
            })    
			
		} catch (error) {
			console.log(error)

		}

		resetAddUserInput()
		addModal = false
	}

    function validatePassword(){
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
            errorPassword = 'Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters';
        } else {
            errorPassword = '';
        }

    }

    function toggleShowPassword(){
        showPassword = !showPassword;
    }
</script>

<input type="checkbox" bind:checked={addModal} id="add" class="modal-toggle" />
<div class="modal">
    <div class="modal-box max-w-xl">

        <!-- Modal -->
        <form class="relative bg-white rounded shadow" on:submit={addUser}>
            <!-- Modal header -->
            <div class="p-4 border-b ">
                <h3 class="text-xl font-semibold">
                    Add Client Profile
                </h3>
            </div>
            <!-- Modal body -->
            <div class="p-6">
                <div class="grid grid-cols-2 gap-6">
                    <div>
                        <label for="client-num" class="mb-2 text-sm font-medium">Client Number</label>
                        <input type="text" id="client-num" disabled bind:value={addUserInput.clientNumber} class=" border text-sm rounded-lg w-56 p-2.5" placeholder="Client Number">
                    </div>
                    <div>
                        <label for="first-name" class="mb-2 text-sm font-medium">First Name</label>
                        <input type="text" id="first-name" bind:value={addUserInput.firstname} class="border text-sm capitalize rounded-lg w-56 p-2.5" placeholder="First Name" maxlength="30" minlength="2" required>
                    </div>
                    <div>
                        <label for="last-name" class="mb-2 text-sm font-medium">Last Name</label>
                        <input type="text" id="last-name" bind:value={addUserInput.lastname} class="border text-sm capitalize rounded-lg w-56 p-2.5" placeholder="Last Name" maxlength="30" minlength="2" required>
                    </div>
                    <div>
                        <label for="username" class="mb-2 text-sm font-medium">Username</label>
                        <input type="email" id="username" bind:value={addUserInput.username} class=" border text-sm rounded-lg w-56 p-2.5" placeholder="Email" maxlength="30" minlength="5" required>
                    </div>
                    <div>
                        <label for="password" class="mb-2 text-sm font-medium">Password</label>
                        {#if showPassword}
						<input type="text" id="password" bind:value={addUserInput.password} on:input={validatePassword} class="border text-sm rounded-lg w-56 p-2.5" placeholder="Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required>
                        {:else}
                        <input id="password" type="password" bind:value={addUserInput.password} on:input={validatePassword} class="border text-sm rounded-lg w-56 p-2.5" placeholder="Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required>
                        {/if}
                        <div class=" relative text-sm mt-3 font-mono ">
                            <input type="checkbox" class="checkbox checkbox-xs" on:click={toggleShowPassword}>
                                {showPassword ? "Show" : "Show"} password
                        </div>
					</div>
					<div>
						<label for="confirm-pass" class="mb-2 text-sm font-medium dark:text-white">Confirm Password</label>
                        {#if showPassword}
						<input type="text" id="confirm-pass" bind:value={addUserInput.confirmPassword} class="border text-sm rounded-lg w-56 p-2.5" placeholder="Confirm password" required>
                        {:else}
                        <input type="password" id="confirm-pass" bind:value={addUserInput.confirmPassword} class="border text-sm rounded-lg w-56 p-2.5" placeholder="Confirm password" required>
                        {/if}
					</div> 
                    <div>
                        <label for="email" class="mb-2 text-sm font-medium">Email</label>
                        <input type="email" id="email" bind:value={addUserInput.email} class=" border text-sm rounded-lg w-56 p-2.5" placeholder="Email" minlength="5" maxlength="50" required>
                    </div>
                    <div>
                        <label for="co-maker" class="mb-2 text-sm font-medium">Co-Maker Complete Name</label>
                        <input type="text" id="co-maker" bind:value={addUserInput.coMaker} class="border text-sm capitalize rounded-lg w-56 p-2.5" placeholder="Co Maker" maxlength="60" required>
                    </div>
                    <div>
                        <label for="contact-number" class="mb-2 text-sm font-medium">Contact Number</label>
                        <input type="text" id="contact-number" bind:value={addUserInput.number} class=" border text-sm rounded-lg w-56 p-2.5" placeholder="Contact Number" minlength="11" maxlength="11" required>
                    </div>
                    <div>
                        <label for="house" class="mb-2 text-sm font-medium">House No.</label>
                        <input type="text" id="house" bind:value={addUserInput.houseNo} class=" border overflow-y-auto text-sm rounded-lg w-56 p-2.5" placeholder="House No." maxlength="30" required>
                    </div>
                    <div>
                        <label for="brgy" class="mb-2 text-sm font-medium">Barangay</label>
                        <input type="text" id="brgy" bind:value={addUserInput.barangay} class=" border overflow-y-auto text-sm capitalize rounded-lg w-56 p-2.5" placeholder="Barangay" minlength="3" maxlength="30" required>
                    </div>
                    <div>
                        <label for="muni" class="mb-2 text-sm font-medium">Municipality</label>
                        <input type="text" id="muni" bind:value={addUserInput.municipality} class=" border overflow-y-auto text-sm capitalize rounded-lg w-56 p-2.5" placeholder="Municipality" minlength="3" maxlength="30" required>
                    </div>
                    <div>
                        <label for="prov" class="mb-2 text-sm font-medium">Province</label>
                        <input type="text" id="prov" bind:value={addUserInput.province} class=" border overflow-y-auto text-sm rounded-lg w-56 p-2.5 " placeholder="Province" minlength="3" maxlength="30" required>
                    </div>
                    <div>
                        <label for="date-created" class="mb-2 text-sm font-medium">Date Created</label>
                        <input type="date" id="date-created" bind:value={addUserInput.dateCreated} class=" border overflow-y-auto text-sm rounded-lg w-56 p-2.5" placeholder="dd/mm/yyyy" required>
                    </div>
                </div>
            </div>

            <div class="modal-action">    
                <button type="submit" class="btn border-transparent bg-green-600">Add</button>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <label for="add" on:click={resetAddUserInput} class="btn border-transparent bg-red-600">Cancel</label>
            </div>
        </form>
    </div>
</div>