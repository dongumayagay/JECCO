<script>
    let loanMatrixModal = false;
    export let chosenMatrix = {}
    let loanAmount = [100,5000,6000,7000,8000,9000,10000];
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

    <input type="checkbox" bind:checked={loanMatrixModal} id="matrixUpdate" class="modal-toggle" />
        <div class="modal">
            <div class="modal-box">
                <form class="relative bg-white rounded-lg shadow" >
                    <!-- Modal header -->
                    <div class="flex items-center p-4 rounded-t border-b">   
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
                    <div class="overflow-y-auto h-full bg-white">
                        <!-- table div -->
                        <div>
                            <table class=" table w-full">
                                <thead>
                                    <th>Days</th>
                                    <th>Loan Amount</th>
                                    <th>Daily Payment</th>
                                </thead>
                                {#each loanAmount as amount, i}
                                <tr class="hover" on:click={selectedLoanMatrix(selectedDay,amount,dailyPayment[i])}>
                                    <td>{selectedDay}</td>
                                    <td>{amount}</td>
                                    <td>{dailyPayment[i]}</td>
                                </tr>
                            {/each}
                            </table>   
                        </div>
                    </div>
                    <div class="modal-action">    
                        <label for="matrixUpdate" class="btn border-transparent bg-red-600">Cancel</label>
                    </div>
                </form>
            </div>
        </div>