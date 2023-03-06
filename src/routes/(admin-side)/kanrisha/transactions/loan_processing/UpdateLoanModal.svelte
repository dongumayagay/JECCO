<script>
    import { db } from '$lib/firebase/client.js';
    import { updateDoc, doc } from 'firebase/firestore';
    import LoanMatrixModalUpdate from '$lib/components/LoanMatrixModalUpdate.svelte';

    let updateModal = false;
    let cliInfo = [];
    let addUserInput = {};
    let chosenMatrix = {}; 
    let infoOfClient = [];
    let canApply

    $: if (chosenMatrix.loanAmount > 0){
        addUserInput = {
            name: infoOfClient.firstname + ' ' + infoOfClient.lastname,
            clientNumber: infoOfClient.clientNumber,
            username:cliInfo.username,
            loanNumber: cliInfo.loanNumber,
            numberOfLoan: cliInfo.numberOfLoan,
            releaseDate:addUserInput.releaseDate,
            formattedDueDate:addUserInput.formattedDueDate,
            loanAmount: chosenMatrix.loanAmount,
            interestRate: chosenMatrix.interestRate,
            interestRatePercent: 15,
            serviceCharge: chosenMatrix.serviceCharge,
            serviceChargePercent: 5,
            totalAmountDue: chosenMatrix.totalAmountDue,
            dailyPayment: chosenMatrix.dailyPayment,
            days: chosenMatrix.days,
            miscellanoeusFee:chosenMatrix.miscellanoeusFee,
            miscellanoeusFeePercent: 1.50,
            notarialFee: 100,
            accountOfficer: addUserInput.accountOfficer,
            creditInvestigatedBy: addUserInput.creditInvestigatedBy,
            approvedBy: addUserInput.approvedBy,
            releasedBy: addUserInput.releasedBy,
            collectorAssigned: addUserInput.collectorAssigned,
            area: addUserInput.area
        }
    }

    export async function clientInfo(infoLoan,infoClient){
        cliInfo = infoLoan
        infoOfClient = infoClient
        addUserInput = {
            name: infoOfClient.firstname + ' ' + infoOfClient.lastname,
            clientNumber: infoOfClient.clientNumber,
            username:cliInfo.username,
            loanNumber: cliInfo.loanNumber,
            days: cliInfo.days,
            numberOfLoan: cliInfo.numberOfLoan,
            releaseDate:cliInfo.releaseDate,
            formattedDueDate:cliInfo.formattedDueDate,
            loanAmount:cliInfo.loanAmount,
            interestRate: cliInfo.loanAmount * 0.15,
            interestRatePercent: 15,
            serviceCharge: cliInfo.loanAmount * 0.05,
            serviceChargePercent: 5,
            totalAmountDue: cliInfo.totalAmountDue,
            dailyPayment: cliInfo.dailyPayment,
            miscellanoeusFee: cliInfo.miscellanoeusFee,
            miscellanoeusFeePercent: 1.5,
            notarialFee: cliInfo.notarialFee,
            accountOfficer: cliInfo.accountOfficer,
            creditInvestigatedBy: cliInfo.creditInvestigatedBy,
            approvedBy: cliInfo.approvedBy,
            releasedBy: cliInfo.releasedBy,
            collectorAssigned: cliInfo.collectorAssigned,
            area: cliInfo.area
	    }
        if (cliInfo.status == "Completed") {
            canApply = true
        } else {
            canApply = false
        }
    }

    function resetAddUserInput(){
		addUserInput = {
            name: infoOfClient.firstname + ' ' + infoOfClient.lastname,
            clientNumber: infoOfClient.clientNumber,
            username:cliInfo.username,
            loanNumber: cliInfo.loanNumber,
            days: cliInfo.days,
            numberOfLoan: cliInfo.numberOfLoan,
            releaseDate:cliInfo.releaseDate,
            formattedDueDate:cliInfo.formattedDueDate,
            loanAmount:cliInfo.loanAmount,
            interestRate: cliInfo.loanAmount * 0.15,
            interestRatePercent: 15,
            serviceCharge: cliInfo.loanAmount * 0.05,
            serviceChargePercent: 5,
            totalAmountDue: cliInfo.totalAmountDue,
            dailyPayment: cliInfo.dailyPayment,
            miscellanoeusFee: cliInfo.miscellanoeusFee,
            miscellanoeusFeePercent: 1.5,
            notarialFee: cliInfo.notarialFee,
            balance: cliInfo.balance,
            totalPayment: cliInfo.totalPayment,
            status: cliInfo.status,
            accountOfficer: cliInfo.accountOfficer,
            creditInvestigatedBy: cliInfo.creditInvestigatedBy,
            approvedBy: cliInfo.approvedBy,
            releasedBy: cliInfo.releasedBy,
            collectorAssigned: cliInfo.collectorAssigned,
            area: cliInfo.area
	    } 
	}

    async function updateLoan(){
        try {
            await updateDoc(doc(db, 'loanprocess', cliInfo.id),{
                days: addUserInput.days,
                numberOfLoan: addUserInput.numberOfLoan,
                releaseDate:addUserInput.releaseDate,
                formattedDueDate:addUserInput.formattedDueDate,
                loanAmount:addUserInput.loanAmount,
                interestRate: addUserInput.interestRate,
                serviceCharge: addUserInput.serviceCharge,
                totalAmountDue: addUserInput.totalAmountDue,
                dailyPayment: addUserInput.dailyPayment,
                accountOfficer: addUserInput.accountOfficer,
                creditInvestigatedBy: addUserInput.creditInvestigatedBy,
                approvedBy: addUserInput.approvedBy,
                releasedBy: addUserInput.releasedBy,
                collectorAssigned: addUserInput.collectorAssigned,
                area: addUserInput.area
        });    
        } catch (e) {
            console.error("Error adding document: ", e); 
        }
        resetAddUserInput()
		updateModal = false
    }

    $: if(addUserInput.days > 0 && addUserInput.releaseDate != null) {
        setDueDate()
    }

    function setDueDate() {
        // Create a new Date object from the release date
        let date = new Date(addUserInput.releaseDate);

        // Remove time from release date
        date.setHours(0, 0, 0, 0);

        // Compute due date
        let dueDate = new Date(date.getTime() + parseInt(addUserInput.days) * 24 * 60 * 60 * 1000);

        // Format the due date
        addUserInput.formattedDueDate= `${dueDate.getFullYear()}-${("0" + (dueDate.getMonth() + 1)).slice(-2)}-${("0" + dueDate.getDate()).slice(-2)}`;
    }

</script>

<input type="checkbox" bind:checked={updateModal} id="editborrow" class="modal-toggle" />
<div class="modal">
    <div class="modal-box max-w-5xl overflow-y-auto">

        <!-- Modal -->
        <form class="relative bg-white rounded-lg shadow" on:submit={updateLoan}>
            <!-- Modal header -->
            <div class="flex justify-between items-start p-4 rounded-t border-b">
                <h3 class="text-xl font-semibold text-gray-900">
                   Edit Borrower
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
                        <label for="loanNum" class="font-medium">Loan #:</label>
                        <input type="text" disabled bind:value={addUserInput.loanNumber} class="border text-sm rounded-lg">
                    </div>
                </div>
                
                <hr/>
                
            <div class="flex gap-4 py-6">
                   
                    <div class="flex flex-col gap-4">
                        <div class="flex">
                            <div class=" pl-4">
                                {#if canApply}
                                    <label for="matrixUpdate" class=" btn btn-sm">Loan Matrix</label>
                                {:else}
                                <label for="matrix" disabled class=" btn btn-sm">Loan Matrix</label>
                                {/if}
                                <input type="text" disabled bind:value={addUserInput.days} class="border text-sm rounded-lg w-24 opacity-50">
                            </div>
                            <div  class=" absolute right-16">
                                <label for="loanNum" class="font-medium">Number of Loan:</label>
                                <input type="number" disabled bind:value={addUserInput.numberOfLoan} class=" relative left-6 text-sm rounded-lg w-24 opacity-50">
                            </div>
                        </div>
                        <div class="flex">
                            <div class=" pl-4">
                                <label for="rDate" class="font-medium">Release Date:</label>
                                <input type="date" bind:value={addUserInput.releaseDate} on:input={setDueDate} class=" relative left-6 text-sm rounded-lg w-36">
                            </div>
                            <div class=" absolute right-16">
                                <label for="dDate" class="font-medium">Due Date:</label>
                                <input type="date" disabled bind:value={addUserInput.formattedDueDate} class=" relative left-6 text-sm rounded-lg w-36">
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
                <!-- <p class="font-medium"><input type="checkbox" class=" checkbox-xs "> JBF-JEM'S Benefit Fund</p>
                <p class="font-medium">Net Proceeds:</p>
                <p class="font-medium">Arrears Percent Penalty:</p>
                <p class="font-medium">Past Due Percent Interest:</p> -->
            </div>
            
            <div class=" flex flex-col gap-2">
                <p><input type="number" disabled bind:value={addUserInput.loanAmount} class=" h-8 rounded-md w-60 text-right" ></p>
                <p class="flex gap-2"><input type="number" disabled bind:value={addUserInput.interestRate} class=" h-8 rounded-md w-60 text-right" ><input type="number" disabled bind:value={addUserInput.interestRatePercent} class=" h-8 rounded-md w-28 text-right" >%</p>
                <p class="flex gap-2"><input type="number" disabled bind:value={addUserInput.serviceCharge} class=" h-8 rounded-md w-60 text-right" ><input type="number" disabled bind:value={addUserInput.serviceChargePercent} class=" h-8 rounded-md w-28 text-right" >%</p>
                <p><input type="number" disabled bind:value={addUserInput.totalAmountDue} class=" h-8 rounded-md w-60 text-right" ></p>
                <p><input type="number" disabled bind:value={addUserInput.dailyPayment} class=" h-8 rounded-md w-60 text-right" ></p>
                <p class="flex gap-2"><input type="number" disabled bind:value={addUserInput.miscellanoeusFee} class=" h-8 rounded-md w-60 text-right" ><input type="number" disabled bind:value={addUserInput.miscellanoeusFeePercent} class=" h-8 rounded-md w-28 text-right" >%</p>
                <p><input type="number" disabled bind:value={addUserInput.notarialFee} class=" h-8 rounded-md w-60 text-right" ></p>
                <!-- <p><input type="number" class=" h-8 rounded-md w-60" ></p>
                <p class="flex gap-2"><input type="number" class=" h-8 rounded-md w-60" ><input type="number" class=" h-8 rounded-md w-48" ></p>
                <p><input type="number" class=" h-8 rounded-md w-28" > %</p>
                <p><input type="number" class=" h-8 rounded-md w-28" ></p> -->
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
                <p class="font-medium">Area:</p>
            </div>
            
            <div class=" flex flex-col gap-2">
                <p><input type="text" bind:value={addUserInput.accountOfficer} class=" h-10 rounded-md w-60" ></p>
                <p><input type="text" bind:value={addUserInput.creditInvestigatedBy} class=" h-10 rounded-md w-60" ></p>
                <p><input type="text" bind:value={addUserInput.approvedBy} class=" h-10 rounded-md w-60" ></p>
                <p><input type="text" bind:value={addUserInput.releasedBy} class=" h-10 rounded-md w-60" ></p>
                <p><input type="text" bind:value={addUserInput.collectorAssigned} class=" h-10 rounded-md w-60" ></p>
                <p>
                    <select class="w-60" bind:value={addUserInput.area} name="areas">
                        <option value="estrella">Estrella</option>
                        <option value="langgam">Langgam</option>
                        <option value="laram">Laram</option>
                        <option value="narra">Narra</option>
                    </select>
                </p>
            </div>
        </div>
            <div class="modal-action pt-8">    
                <button type="submit" class="btn border-transparent bg-blue-600">Update</button>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <label for="editborrow" on:click={resetAddUserInput} class="btn border-transparent bg-red-600">Cancel</label>
            </div>
        </form>
    </div>
</div>
<LoanMatrixModalUpdate bind:chosenMatrix={chosenMatrix}/> 