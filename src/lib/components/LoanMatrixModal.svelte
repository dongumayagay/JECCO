<script>
  import { onMount } from 'svelte';
  
    let loanMatrixModal = false;

    let loanAmount = [100,5000,6000,7000,8000,9000,10000];
    let days = 80;
    let interestRate = 20.0;
    let dailyPayment =[];


    async function calculateDailyPayment(loanAmount, days, interestRate) {
        let dailyInterest = (interestRate/100)/80;
        let dailyPayment = (loanAmount/days) + (loanAmount*dailyInterest);
        return dailyPayment;
    }
    
    onMount(async () => {
        let promises = loanAmount.map(amount => calculateDailyPayment(amount, days, interestRate));
        dailyPayment = await Promise.all(promises);
    });
    </script>
    
    
    
    <input type="checkbox" bind:checked={loanMatrixModal} id="matrix" class="modal-toggle" />
        <div class="modal">
            <div class="modal-box">
    
                <form class="relative bg-white rounded-lg shadow dark:bg-gray-700" >
                    <!-- Modal header -->
                    <div class="flex items-center p-4 rounded-t border-b dark:border-gray-600 gap-6">   
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            Number of Days  
                        </h3>
                        <select name="days" id="day">
                            <option value="70">70</option>
                            <option value="80">80</option>
                            <option value="90">90</option>
                            <option value="100">100</option>
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
                                {#each loanAmount as amount, index}
                                <tr class="hover">
                                    <td>{days}</td>
                                    <td>{amount + '.00'}</td>
                                    <td>{dailyPayment[index] + '.00'}</td>
                                
                                </tr>
                            {/each}
                            </table>   
                        </div>
    
                    </div>
                    <div class="modal-action">    
                        <button type="submit" class="btn border-transparent bg-blue-600">Select</button>
                        <label for="matrix" class="btn border-transparent bg-red-600">Cancel</label>
                    </div>
                </form>
    
            </div>
        </div>