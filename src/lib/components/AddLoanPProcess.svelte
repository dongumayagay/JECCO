<script>
    import {addDoc, onSnapshot, collection, where, query, getCountFromServer, getDoc, updateDoc, doc, orderBy, limit, getDocs } from 'firebase/firestore';
	import {db} from '$lib/firebase/client.js';
    import LoanMatrixModal from './LoanMatrixModal.svelte';

    let addModal = false  
    let cliInfo = [];
    let addUserInput = {} 
    let chosenMatrix = []
    let resetChosenMatrix
    let numberOfLoans;
    let releaseDate;
    let dueDate;
    let formattedDueDate;
    //loan ref id generator
    let loans
    let canApply
    let totalLoans = 0 
    let ctrlNumber = "000000"
    let thisLoanNumber = ""
    let loanNumber;

    //user loan counter
    async function userLoanCounter(clientId) {
        const q = query(collection(db, 'loanprocess'), where("owner", "==", clientId));
        const snapshot = await getCountFromServer(q);
        numberOfLoans = snapshot.data().count;
        loanNumber = numberOfLoans+1;

        const qTwo = query(collection(db, 'loanprocess'), where("owner", "==", clientId), orderBy("numberOfLoan", "desc"), limit(1) );
        const docSnap = await getDocs(qTwo);
        loans = docSnap.docs.map((doc) => {
        return {
            id:doc.id,
            ...doc.data()
        }
        }); 
        if (loans.length != 0) {
            if (loans[0].status == "Completed") {
                canApply = true
            } else {
                canApply = false
            }
        }else{
            canApply = true
        }
        
    }

    export async function clienInfo(infoClient){
        const docSnap = await getDoc(doc(db, "id_counters", "loan_counter")); 
        totalLoans = docSnap.data()
        totalLoans.count ++
        ctrlNumber = ctrlNumber + totalLoans.count.toString()
        thisLoanNumber = ctrlNumber.slice(-6)
        cliInfo = infoClient
        await userLoanCounter(cliInfo.id)
        addUserInput = {
            owner: cliInfo.id, 
            loanNumber:thisLoanNumber,
            name: cliInfo.firstname + ' ' + cliInfo.lastname,
            clientNumber: cliInfo.clientNumber,
            numberOfLoan: numberOfLoans,
            id:cliInfo.id,
        }
        
    }

    function resetAddUserInput(){
        ctrlNumber = "000000"
		addUserInput = {
            loanNumber:thisLoanNumber,
            name: cliInfo.firstname + ' ' + cliInfo.lastname,
            clientNumber: cliInfo.clientNumber,
            numberOfLoan: numberOfLoans,
            loanAmount:'',
            purpose:'',
            releaseDate:'',
            accountOfficer:'',
            creditInvestigatedBy:'',
            approvedBy: '',
            releasedBy: '',
            collectorAssigned:'',
	    }
        releaseDate = ""
        formattedDueDate = ""
        document.getElementById("due-date").value = formattedDueDate;
	}

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    async function addLoan(){
		try {
			const docRef = await addDoc(collection(db, "loanprocess"), {
                loanNumber:addUserInput.loanNumber,
                owner:addUserInput.owner ,
                loanAmount:addUserInput.loanAmount,
                numberOfLoan: loanNumber,
                releaseDate: releaseDate.toString(),
                formattedDueDate: formattedDueDate.toString(),
                days: chosenMatrix.days,
                loanAmount:chosenMatrix.loanAmount,
                serviceCharge: chosenMatrix.serviceCharge,
                totalAmountDue: chosenMatrix.totalAmountDue,
                dailyPayment: chosenMatrix.dailyPayment,
                miscellanoeusFee: chosenMatrix.miscellanoeusFee,
                notarialFee: chosenMatrix.notarialFee,
                balance: chosenMatrix.totalAmountDue,
                totalPayment:0,
                arrearsPenalty:0,
                pastDue:0,
                status: "Ongoing",
                accountOfficer: addUserInput.accountOfficer.toLowerCase().split(" ").map(capitalize).join(" "),
                creditInvestigatedBy: addUserInput.creditInvestigatedBy.toLowerCase().split(" ").map(capitalize).join(" "),
                approvedBy: addUserInput.approvedBy.toLowerCase().split(" ").map(capitalize).join(" "),
                releasedBy: addUserInput.releasedBy.toLowerCase().split(" ").map(capitalize).join(" "),
                collectorAssigned: addUserInput.collectorAssigned.toLowerCase().split(" ").map(capitalize).join(" "),
        	});
            await updateDoc(doc(db, "id_counters", "loan_counter"), {
                count: totalLoans.count
            });
            await updateDoc(doc(db, "clientinfo", addUserInput.owner), {
                status: "Ongoing"
            });
		} catch (error) {
			console.log(error)
		}
		resetAddUserInput()
        resetChosenMatrix()
        releaseDate = ""
        formattedDueDate = ""
        document.getElementById("due-date").value = formattedDueDate;
		addModal = false
	}

    $: if(chosenMatrix.days > 0 && releaseDate != null) {
        setDueDate()
    }
    function setDueDate() {
        // Create a new Date object from the release date
        let date = new Date(releaseDate);

        // Remove time from release date
        date.setHours(0, 0, 0, 0);

        // Compute due date
        dueDate = new Date(date.getTime() + chosenMatrix.days * 24 * 60 * 60 * 1000);

        // Format the due date
        formattedDueDate = `${dueDate.getFullYear()}-${("0" + (dueDate.getMonth() + 1)).slice(-2)}-${("0" + dueDate.getDate()).slice(-2)}`;

        // Set due date in input
        document.getElementById("due-date").value = formattedDueDate;
        
    }
</script>

<input type="checkbox" bind:checked={addModal} id="add2" class="modal-toggle" />
<div class="modal">
    <div class="modal-box max-w-5xl overflow-y-auto">

        <!-- Modal -->
        <form class="relative bg-white rounded-lg shadow" on:submit={addLoan}>
            <!-- Modal header -->
            <div class="flex justify-between items-start p-4 rounded-t border-b">
                <h3 class="text-xl font-semibold text-gray-900">
                    Borrow Set-up
                </h3>
            </div>
            <!-- Modal body -->
            <div class=" p-2 space-y-2">
                <div class="flex gap-4">
                <div>
                    <label for="borrowerName" class="font-medium">Name</label>
                    <input type="text" disabled bind:value={addUserInput.name} class=" border text-sm rounded-lg w-72 "> 
                </div>
                <div>
                    <label for="borrowerName" class="font-medium">Client Number</label>
                    <input type="text" disabled bind:value={addUserInput.clientNumber} class=" border text-sm rounded-lg w-72 "> 
                </div>
                <div>
                    <label for="loanNum" class="font-medium">Loan Ref#:</label>
                    <input type="text" disabled bind:value={addUserInput.loanNumber} class="border text-sm rounded-lg">
                </div>
                </div>

                <hr/>
                
            <div class="flex gap-4 py-6">
                   
                    <div class="flex flex-col gap-4">
                    <div class="flex">
                        <div class=" pl-4">
                            {#if canApply}
                                <label for="matrix" class=" btn btn-sm">Loan Matrix</label>
                            {:else}
                            <label for="matrix" disabled class=" btn btn-sm">Loan Matrix</label>
                            {/if}
                            {#await chosenMatrix}
                                <p>...waiting</p>
                            {:then matrix}   
                                {#if chosenMatrix.loanAmount == undefined}
                                    <input type="text" disabled class="border text-sm rounded-lg w-24">
                                {:else}
                                <input type="text" disabled bind:value={chosenMatrix.days} class="border text-sm rounded-lg w-24">
                                {/if}
                            {:catch error}
                                <p style="color: red">{error.message}</p>
                            {/await}    
                        </div>
                        <div  class=" absolute right-16"> 
                            <label for="loanNum" class="font-medium">Number of Loans:</label>
                            <input type="text" disabled bind:value={addUserInput.numberOfLoan} class=" relative left-6 text-sm rounded-lg w-24">
                        </div>
                    </div>
                    <div class="flex">
                        {#if chosenMatrix.days > 0}
                            <div class=" pl-4">
                                <label for="rDate" class="font-medium">Release Date:</label>
                                <input type="date" bind:value={releaseDate} on:input={setDueDate} class=" relative left-6 text-sm rounded-lg w-36">
                            </div> 
                        {:else}
                            <div class=" pl-4">
                                <label for="rDate" class="font-medium">Release Date:</label>
                                <input type="date" disabled class=" relative left-6 text-sm rounded-lg w-36">
                            </div>
                        {/if}    
                        <div class=" absolute right-16">
                            <label for="dDate" class="font-medium">Due Date:</label>
                            <input type="date" disabled id="due-date" class=" relative left-6 text-sm rounded-lg w-36">
                        </div>
                    </div>
                    </div>
                <hr/>
                
            </div>
            <hr/>
        <div class="grid grid-cols-2 my-2 pb-4">
            <div class="flex flex-col gap-4 mt-1">
                <p class="font-medium">Loan Amount:</p>
                <p class="font-medium">Interest Rate:</p>
                <p class="font-medium">Service-Charge:</p>
                <p class="font-medium">Total Loan Amount Due:</p>
                <p class="font-medium">Daily Payment:</p>
                <p class="font-medium">Miscellanoeus Fee:</p>
                <p class="font-medium">Notarial Fee:</p>
                
            </div>
            
            <div class=" flex flex-col gap-2">
                {#await chosenMatrix}
                    <p>...waiting</p>
                {:then matrix}   
                    {#if chosenMatrix.loanAmount == undefined}    
                        <p><input type="number" disabled class=" h-8 rounded-md w-60" ></p>
                        <p class="flex gap-2"><input type="number" disabled class=" h-8 rounded-md w-60" ><input type="number" disabled class=" h-8 rounded-md w-28 bg-yellow-100" >%</p>
                        <p class="flex gap-2"><input type="number" disabled class=" h-8 rounded-md w-60" ><input type="number" disabled class=" h-8 rounded-md w-28 bg-yellow-100" >%</p>
                        <p><input type="number" disabled class=" h-8 rounded-md w-60" ></p>
                        <p><input type="number" disabled class=" h-8 rounded-md w-60" ></p>
                        <p class="flex gap-2"><input type="number" disabled class=" h-8 rounded-md w-60" ><input type="number" disabled class=" h-8 rounded-md w-28 bg-yellow-100" >%</p>
                        <p><input type="number" disabled class=" h-8 rounded-md w-60" ></p>
                        
                    {:else}
                        <input type="number" disabled bind:value={chosenMatrix.loanAmount} class=" h-8 rounded-md w-60 text-right" >
                        <p class="flex gap-2"><input type="number" disabled bind:value={chosenMatrix.interestRate} class=" h-8 rounded-md w-60 text-right" ><input type="number" disabled bind:value={chosenMatrix.interestPercent} class=" h-8 rounded-md w-28 text-right bg-yellow-100" >%</p>
                        <p class="flex gap-2"><input type="number" disabled bind:value={chosenMatrix.serviceCharge} class=" h-8 rounded-md w-60 text-right" ><input type="number" disabled bind:value={chosenMatrix.serviceChargePercent} class=" h-8 rounded-md w-28 text-right bg-yellow-100" >%</p>
                        <input type="number" disabled bind:value={chosenMatrix.totalAmountDue} class=" h-8 rounded-md w-60 text-right" >
                        <input type="number" disabled bind:value={chosenMatrix.dailyPayment} class=" h-8 rounded-md w-60 text-right" >
                        <p class="flex gap-2"><input type="number" bind:value={chosenMatrix.miscellanoeusFee} disabled class=" h-8 rounded-md w-60 text-right" ><input type="number" bind:value={chosenMatrix.miscellanoeusFeePercent} disabled class=" h-8 rounded-md w-28 text-right bg-yellow-100">%</p>
                        <input type="number" bind:value={chosenMatrix.notarialFee} disabled class=" h-8 rounded-md w-60 text-right" >
                    {/if}
                {:catch error}
                    <p style="color: red">{error.message}</p>
                {/await}
            </div>
           
        </div>
        <hr/>
        <div class="grid grid-cols-2 my-2 pt-4 p">
            <div class="flex flex-col gap-6 mt-2">
                <p class="font-medium">Account Officer:</p>
                <p class="font-medium">Credit Investigated By:</p>
                <p class="font-medium">Approved By:</p>
                <p class="font-medium">Released By:</p>
                <p class="font-medium">Collector Assigned:</p>
            </div>
            
            <div class=" flex flex-col gap-2">
                <input type="text" bind:value={addUserInput.accountOfficer} class=" h-10 rounded-md w-60 capitalize">
                <input type="text" bind:value={addUserInput.creditInvestigatedBy} class=" h-10 rounded-md w-60 capitalize">
                <input type="text" bind:value={addUserInput.approvedBy} class=" h-10 rounded-md w-60 capitalize">
                <input type="text" bind:value={addUserInput.releasedBy} class=" h-10 rounded-md w-60 capitalize">
                <input type="text" bind:value={addUserInput.collectorAssigned} class=" h-10 rounded-md w-60 capitalize">
            </div>
        </div>
            <div class="modal-action pt-8">    
                <button type="submit" disabled={!canApply} class="btn border-transparent bg-green-600">Process</button>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <label for="add2" on:click={resetAddUserInput} on:click={resetChosenMatrix} class="btn border-transparent bg-red-600">Cancel</label>
            </div>
        </form>
    </div>
</div>

<LoanMatrixModal bind:chosenMatrix={chosenMatrix} bind:resetChosenMatrix={resetChosenMatrix}/>  