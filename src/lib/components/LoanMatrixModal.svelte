<script>

    let loanMatrixModal = false;
    
    </script>
    
    
    
    <input type="checkbox" bind:checked={loanMatrixModal} id="matrix" class="modal-toggle" />
        <div class="modal">
            <div class="modal-box">
                
                <!-- on:submit={updateEmployee} -->
    
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
                            <tr class="hover">
                                <td>80</td>
                                <td>100</td>
                                <td>1.50</td>
                            </tr>
                            <tr class="hover">
                                <td>80</td>
                                <td>100</td>
                                <td>1.50</td>
                            </tr>
                            <tr class="hover">
                                <td>80</td>
                                <td>100</td>
                                <td>1.50</td>
                            </tr>
                            <tr class="hover">
                                <td>80</td>
                                <td>100</td>
                                <td>1.50</td>
                            </tr>
                            <tr class="hover">
                                <td>80</td>
                                <td>100</td>
                                <td>1.50</td>
                            </tr>
   
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