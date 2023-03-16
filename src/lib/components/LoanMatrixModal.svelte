<script>
    let loanMatrixModal = false;
    export let chosenMatrix = {}
    let loanAmount = [5000,6000,7000,8000,9000,10000,12000,14000,16000,18000,20000,22000,24000,26000,28000,30000,32000,34000,36000,38000,40000,42000,44000,46000,48000,50000,52000,54000,56000,58000,60000];
    let days = [40,60,80,100,120];
    let selectedDay = days[0];
    let totalInterestRate = 20.0;
    let dailyPayment = loanAmount.map((value) => calculateDailyPayment(value,selectedDay,totalInterestRate) )

    async function handleSelection(event) {
    selectedDay = event.target.value;
    dailyPayment = await Promise.all(loanAmount.map(amount => calculateDailyPayment(amount, selectedDay, totalInterestRate)));
    }

    function calculateDailyPayment(loanAmount, selectedDay, totalInterestRate) {
        let dailyInterest = (totalInterestRate/100)/selectedDay;
        let dailyPayment = (loanAmount*dailyInterest) + (loanAmount/selectedDay);
        return dailyPayment;
        
    }
    
    function selectedLoanMatrix(daysPay, amount, selectedDailyPayment){
        let chosenInterest = amount * 0.15
        let serviceChargeAmount = amount * 0.05
        let miscellanoeusFeeAmount = amount *0.015
        chosenMatrix = {
            loanAmount: amount,
            interestRate: chosenInterest,
            interestPercent: 15,
            serviceCharge: serviceChargeAmount,
            serviceChargePercent: 5,
            totalAmountDue: amount + chosenInterest + serviceChargeAmount,
            dailyPayment: selectedDailyPayment,
            days: daysPay,
            miscellanoeusFee:miscellanoeusFeeAmount,
            miscellanoeusFeePercent: 1.50,
            notarialFee: 100
        }
        loanMatrixModal = false;
    }

    export async function resetChosenMatrix (){
        chosenMatrix = {
            loanAmount: undefined,
        }
    }

</script>

    <input type="checkbox" bind:checked={loanMatrixModal} id="matrix" class="modal-toggle" />
        <div class="modal">
            <div class="modal-box" style="overflow-y: unset;">
                <form class="bg-white rounded-lg ">
                    <!-- Modal header -->
                    <div class="flex items-center p-4 rounded-t border-b gap-4">   
                        <h3 class="text-xl font-semibold text-gray-900">
                            Number of Days  
                        </h3>
                        <select on:change={handleSelection}>
                            {#each days as day}
                            <option value={day}>{day}</option>
                            {/each}
                        </select>
                    </div>
                    <!-- Modal body -->
                    <div class=" h-[500px] overflow-y-scroll">
                        <!-- table div -->
                            <table class=" table table-compact w-full">
                                <thead class="text-center">
                                    <th>Days</th>
                                    <th>Loan Amount</th>
                                    <th>Daily Payment</th>
                                </thead>
                                {#each loanAmount as amount, i}
                                <tr class="hover text-center" on:click={selectedLoanMatrix(selectedDay,amount,dailyPayment[i])}>
                                    <td>{selectedDay}</td>
                                    <td>{amount}</td>
                                    <td>{dailyPayment[i]}</td>
                                </tr>
                            {/each}
                            </table>   
                    </div>
                    <div class="modal-action">    
                        <label for="matrix" class="btn border-transparent bg-red-600">Cancel</label>
                    </div>
                </form>
            </div>
        </div>