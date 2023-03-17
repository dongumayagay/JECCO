<script>
    import { collection, updateDoc, query, where, orderBy, limit, doc, getDocs, addDoc, getDoc } from "firebase/firestore";
    import {db} from '$lib/firebase/client.js';
    import { sendEmail } from '$lib/utils';

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

    $: if ((addUserInput.firstname != null || addUserInput.firstname != undefined) && (addUserInput.lastname != null || addUserInput.lastname != undefined)) {
        let fnameUser = ""
        const fname = addUserInput.firstname.split(" ")
        for (let i = 0; i < fname.length; i++) {
            fnameUser = fnameUser + fname[i].slice(0,1)
        }
        let lnameUser = ""
        const lname = addUserInput.lastname.split(" ")
        for (let i = 0; i < lname.length; i++) {
            lnameUser = lnameUser + lname[i]
        }
        addUserInput.username = fnameUser.toLowerCase() + lnameUser.toLowerCase() + "@jem.com"

        if (addUserInput.firstname == "" || addUserInput.lastname == "") {
            addUserInput.username = ""
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

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    async function addUser(){
        
        if(addUserInput.password != addUserInput.confirmPassword){
			alert('Password does not match')
        }

		try {

			const response = await fetch('/api/clients',{method:'POST',
			body: JSON.stringify({
                clientNumber:addUserInput.clientNumber,
                name:addUserInput.firstname + ' ' + addUserInput.lastname,
                username:addUserInput.username,
                password:addUserInput.password,
                firstname:addUserInput.firstname.toLowerCase().split(" ").map(capitalize).join(" "),
                lastname:addUserInput.lastname.toLowerCase().split(" ").map(capitalize).join(" "),
                email:addUserInput.email,
                coMaker:addUserInput.coMaker.toLowerCase().split(" ").map(capitalize).join(" "),
                number:addUserInput.number,
                barangay:addUserInput.barangay.toLowerCase().split(" ").map(capitalize).join(" "),
                houseNo:addUserInput.houseNo.toLowerCase().split(" ").map(capitalize).join(" "),
                municipality:addUserInput.municipality.toLowerCase().split(" ").map(capitalize).join(" "),
                province:addUserInput.province.toLowerCase().split(" ").map(capitalize).join(" "),
                dateCreated:addUserInput.dateCreated,
                status:"No Loan"
                
			})})
			if(response.status != 500 && response.status != 400){
                await updateDoc(doc(db, "id_counters", "clients_counter"), {
                    count: count.count
                })
                await sendAccountInfoEmail()
            }

		} catch (error) {
			alert(error);
		} 

		resetAddUserInput()
		addModal = false;
     
	}

    function validatePassword(){
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8}$/.test(password)) {
            errorPassword = 'Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters';
        } else {
            errorPassword = '';
        }

    }

    function toggleShowPassword(){
        showPassword = !showPassword;
    }

    async function sendAccountInfoEmail() {
		try {
			const result = await sendEmail({
				to: 'maxpascual16@gmail.com',
				subject: 'Jem App Account Credentials',
				html: `<h3>Username: ${addUserInput.username}</h3><br><h3>Password: ${addUserInput.password}</h3>`
			});
			alert('Email for Account Information sent successfully');
		} catch (error) {
			console.log(error);
			alert('Error in sending Account Information');
		}
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

    function generatePassword() {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
        const length = Math.floor(Math.random() * 4) + 11;
        let newPassword = '';
        for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        newPassword += chars[randomIndex];
        }
        addUserInput.password = newPassword;
    }

</script>


<input type="checkbox" bind:checked={addModal} id="add" class="modal-toggle" />
<div class="modal">
    <div class="modal-box max-w-xl">

        <!-- Modal -->
        <form class="relative bg-white rounded" on:submit={addUser}>
            <!-- Modal header -->
            <div class="p-4 border-b ">
                <h3 class="text-xl font-semibold">
                    Add Client Profile
                </h3>
            </div>
            <!-- Modal body -->
            <div class="p-6">
                <div class="grid grid-cols-2 gap-4">
                    <div class="flex flex-col">
                        <span class="flex mb-2 font-bold">System Information <p class="text-red-500">*</p></span>
                        <label for="client-num" class="mb-2 text-sm font-medium">Client Number</label>
                        <input type="text" disabled bind:value={addUserInput.clientNumber} class=" border text-sm rounded-lg w-56 p-3" placeholder="Client Number" required>
                    </div>
                    <div class="mt-9">
                        <label for="first-name" class="mb-2 text-sm font-medium">First Name</label>
                        <input type="text" bind:value={addUserInput.firstname} on:input={(event) => handleRegexInput(event, 'addUserInput.firstname')} class="border text-sm capitalize rounded-lg w-56 p-3"  placeholder="First Name" maxlength="30" minlength="2" required>
                    </div>
                    <div>
                        <label for="last-name" class="mb-2 text-sm font-medium">Last Name</label>
                        <input type="text" bind:value={addUserInput.lastname} on:input={(event) => handleRegexInput(event, 'addUserInput.lastname')} class="border text-sm capitalize rounded-lg w-56 p-3" placeholder="Last Name" maxlength="30" minlength="2" required>
                    </div>
                    <div>
                        <label for="username" class="mb-2 text-sm font-medium">Username</label>
                        <input type="email" disabled bind:value={addUserInput.username} class=" border text-sm rounded-lg w-56 p-2.5 opacity-80" placeholder="Email" maxlength="30" minlength="5" required>
                    </div>
                    <div>
                        <label for="password" class="mb-2 text-sm font-medium">Password</label>
                        {#if showPassword}
						<input type="text"  bind:value={addUserInput.password} on:input={validatePassword} class="border opacity-80 text-sm rounded-lg w-56 p-3 " placeholder="Password" minlength="8" disabled required>
                        {:else}
                        <input  type="password" bind:value={addUserInput.password} on:input={validatePassword} class="border opacity-80 text-sm rounded-lg w-56 p-3" placeholder="Password" minlength="8" disabled required>
                        {/if}
                        <div class=" absolute left-7 text-sm mt-2 font-mono ">
                            <input type="checkbox" class=" checkbox checkbox-xs" on:click={toggleShowPassword}>
                                {showPassword ? "Show" : "Show"} password
                        </div>
					</div>
					<div class=" flex justify-center items-center">
                        <button class="btn btn-sm text-xs mt-5 bg-gray-500" type="button" on:click={generatePassword}>Generate Password</button>
					</div> 
                    
                    <div class=" flex flex-col mt-7">
                        <span class=" flex mb-2 font-bold">Other Information <p class="text-red-500">*</p> </span>
                        <label for="email" class="mb-2 text-sm font-medium">Email</label>
                        <input type="email" bind:value={addUserInput.email} class=" border text-sm rounded-lg w-56 p-3" placeholder="Email" minlength="5" maxlength="50" required>
                    </div>
                    <div class="mt-16">
                        <label for="co-maker" class="mb-2 text-sm font-medium">Co-Maker Complete Name</label>
                        <input type="text"  bind:value={addUserInput.coMaker} on:input={(event) => handleRegexInput(event, 'addUserInput.coMaker')} class="border text-sm capitalize rounded-lg w-56 p-3" placeholder="Co Maker" maxlength="60" required>
                    </div>
                    <div>
                        <label for="contact-number" class="mb-2 text-sm font-medium">Contact Number</label>
                        <input class="border text-sm rounded-lg w-56 p-3" type="text" on:input={limitInputLength} bind:value={addUserInput.number} placeholder="Contact Number" required />
                    </div>
                    <div>
                        <label for="house" class="mb-2 text-sm font-medium">House No.</label>
                        <input type="text" bind:value={addUserInput.houseNo} class=" border overflow-y-auto text-sm capitalize rounded-lg w-56 p-3" placeholder="House No." maxlength="30" required>
                    </div>
                    <div>
                        <label for="brgy" class="mb-2 text-sm font-medium">Barangay</label>
                        <input type="text" bind:value={addUserInput.barangay} class=" border overflow-y-auto text-sm capitalize rounded-lg w-56 p-3" placeholder="Barangay" minlength="3" maxlength="30" required>
                    </div>
                    <div>
                        <label for="muni" class="mb-2 text-sm font-medium">Municipality</label>
                        <input type="text" bind:value={addUserInput.municipality} on:input={(event) => handleRegexInput(event, 'addUserInput.municipality')} class=" border overflow-y-auto text-sm capitalize rounded-lg w-56 p-3" placeholder="Municipality" minlength="3" maxlength="30" required>
                    </div>
                    <div>
                        <label for="prov" class="mb-2 text-sm font-medium">Province</label>
                        <input type="text" bind:value={addUserInput.province} on:input={(event) => handleRegexInput(event, 'addUserInput.province')} class=" border overflow-y-auto text-sm capitalize rounded-lg w-56 p-3 " placeholder="Province" minlength="3" maxlength="30" required>
                    </div>
                    <div>
                        <label for="date-created" class="mb-2 text-sm font-medium">Date Created</label>
                        <input type="date" bind:value={addUserInput.dateCreated} class=" border overflow-y-auto text-sm rounded-lg w-56 p-3" placeholder="dd/mm/yyyy" required>
                    </div>
                </div>
            </div>

            <div class="modal-action">    
                <button type="submit" class="btn border-transparent bg-green-600">Create</button>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <label for="add" on:click={resetAddUserInput} class="btn border-transparent bg-red-600">Cancel</label>
            </div>
        </form>
    </div>
</div>