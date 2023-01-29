<script>
  import { onMount } from 'svelte';
  
    let loanMatrixModal = false;

    let loanAmount = [100,5000,6000,7000,8000,9000,10000];
    let days = [40,60,80,100,120];
    let selectedDay = days[0];
    let interestRate = 20.0;
    let dailyPayment =[];

    async function handleSelection(event) {
    selectedDay = event.target.value;
    dailyPayment = await Promise.all(loanAmount.map(amount => calculateDailyPayment(amount, selectedDay, interestRate)));
    }

    async function calculateDailyPayment(loanAmount, selectedDay, interestRate) {
        let dailyInterest = (interestRate/100)/selectedDay;
        let dailyPayment = (loanAmount*dailyInterest) + (loanAmount/selectedDay);
        return dailyPayment;
        
    }
    
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
                                <tr class="hover">
                                    <td>{selectedDay}</td>
                                    <td>{amount}</td>
                                    <td>{dailyPayment[i]}</td>
                                
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