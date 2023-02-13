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
            loanAmount:cliInfo.loanAmount,
            duration:cliInfo.duration,
            releaseDate:cliInfo.releaseDate
	    }
    }

    function resetAddUserInput(){
		addUserInput = {
            loanAmount:cliInfo.loanAmount,
            duration:cliInfo.duration,
            releaseDate:cliInfo.releaseDate
	    } 
	}

    async function updateEmployee(){
        try {
            await updateDoc(doc(db, 'loanprocess', cliInfo.id),{
                paymentMode:addUserInput.paymentMode,
                loanAmount:addUserInput.loanAmount,
                duration:addUserInput.duration,
                releaseDate:addUserInput.releaseDate
        });    
        } catch (e) {
            console.error("Error adding document: ", e); 
        }
        resetAddUserInput()
		updateModal = false
    }

</script>

<input type="checkbox" bind:checked={updateModal} id="editborrow" class="modal-toggle" />
<div class="modal">
    <div class="modal-box max-w-5xl overflow-y-auto">

        <!-- Modal -->
        <form class="relative bg-white rounded-lg shadow" on:submit={updateEmployee}>
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
                    <input type="text" disabled class=" border text-sm rounded-lg w-72 "> 
                </div>
                <div>
                    <label for="borrowerName" class="font-medium">Client Number</label>
                    <input type="text" disabled class=" border text-sm rounded-lg w-72 "> 
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
                            <label for="matrix" class=" btn btn-sm" disabled>Loan Matrix</label>
                            <input type="text" disabled bind:value={addUserInput.duration} class="border text-sm rounded-lg w-24 opacity-50">
                        </div>
                        <div  class=" absolute right-16">
                            <label for="loanNum" class="font-medium">Number of Loan:</label>
                             <input type="text" disabled class=" relative left-6 text-sm rounded-lg w-24 opacity-50">
                        </div>
                    </div>
                    <div class="flex">
                        <div class=" pl-4">
                             <label for="rDate" class="font-medium">Release Date:</label>
                             <input type="date" disabled class=" relative left-6 text-sm rounded-lg w-36 opacity-50">
                         </div>
                         <div class=" absolute right-16">
                            <label for="dDate" class="font-medium">Due Date:</label>
                            <input type="date" disabled class=" relative left-6 text-sm rounded-lg w-36 opacity-50">
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
                <p class="font-medium"><input type="checkbox" class=" checkbox-xs "> JBF-JEM'S Benefit Fund</p>
                <p class="font-medium">Net Proceeds:</p>
                <p class="font-medium">Arrears Percent Penalty:</p>
                <p class="font-medium">Past Due Percent Interest:</p>
            </div>
            
            <div class=" flex flex-col gap-2">
                <p><input type="number" class=" h-8 rounded-md w-60" ></p>
                <p class="flex gap-2"><input type="number" class=" h-8 rounded-md w-60" ><input type="number" class=" h-8 rounded-md w-28" >%</p>
                <p class="flex gap-2"><input type="number" class=" h-8 rounded-md w-60" ><input type="number" class=" h-8 rounded-md w-28" >%</p>
                <p><input type="number" class=" h-8 rounded-md w-60" ></p>
                <p><input type="number" class=" h-8 rounded-md w-60" ></p>
                <p class="flex gap-2"><input type="number" class=" h-8 rounded-md w-60" ><input type="number" class=" h-8 rounded-md w-28" >%</p>
                <p><input type="number" class=" h-8 rounded-md w-60" ></p>
                <p><input type="number" class=" h-8 rounded-md w-60" ></p>
                <p class="flex gap-2"><input type="number" class=" h-8 rounded-md w-60" ><input type="number" class=" h-8 rounded-md w-48" ></p>
                <p><input type="number" class=" h-8 rounded-md w-28" > %</p>
                <p><input type="number" class=" h-8 rounded-md w-28" ></p>
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
                <p><input type="text" class=" h-10 rounded-md w-60" ></p>
                <p><input type="text" class=" h-10 rounded-md w-60" ></p>
                <p><input type="text" class=" h-10 rounded-md w-60" ></p>
                <p><input type="text" class=" h-10 rounded-md w-60" ></p>
                <p><input type="text" class=" h-10 rounded-md w-60" ></p>
                <p>
                    <select class="w-60" name="areas">
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
                <label for="editborrow" on:click={resetAddUserInput()} class="btn border-transparent bg-red-600">Cancel</label>
            </div>
        </form>
    </div>
</div>