    <script>

    let transactModal = false;

    function addPayment(){
        transactModal = true;
    }

    function cancelPayment(){
        transactModal = false;
    }

    </script>
        

    <div class="flex items-center p-4 shadow-md sm:rounded-lg h-10 bg-white gap-4">
                 <p class=" font-semibold ">Payments</p> 
                 <button class="btn btn-ghost absolute right-10 px-2 btn-xs sm:btn-2xs md:btn-xs lg:btn-sm hover:bg-green-300 underline" on:click={addPayment}>Update Payment</button>
            </div>
            
        <div class="overflow-x-auto relative shadow-md sm:rounded-lg h-full bg-white mt-4">
                <div>
                        <table class="table table-normal w-full">
                                <thead>
                                        <tr class="hover">
                                                <th>Client Number</th> 
                                                <th>Name</th> 
                                                <th class="px-6">Loan Number</th>
                                                <th class="px-6">Transaction Date</th>
                                                
                                        </tr>
                                </thead> 
                        <tr class="hover">
                            <!-- <td class="p-3">
                                <div  class="flex items-center space-x-4 text-sm">
                                <div class="dropdown">
                                    
                                    <label for='' tabindex="0" class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 rounded-lg text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Delete">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" fill="currentColor" class="w-5 h-5">
                                        <path d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clip-rule="evenodd" />
                                    </svg>
                                    </label>
                                    
                                    <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><button on:click={addPayment}>Update Payment</button></li>
                                    </ul>
                                </div>
                                </div>
                            </td> -->
                            <td>
                                SPL-2023001
                                <!-- {loan.username} -->
                            </td>
                            <td>
                                Francis Sanchez
                                <!-- {loan.loanType} -->
                            </td>
                            <td class="px-6">
                                #01
                                <!-- {loan.paymentMode} -->
                            </td>
                            <td class="px-6">
                                01/01/2023
                                <!-- {loan.loanAmount} -->
                            </td>
                            
                        </tr>
                        </table>	
                </div>		
        </div>


 <!-- modal -->

 <input type="checkbox" class="modal-toggle" bind:checked={transactModal}/>
{#if transactModal}
<div class="modal">
  <div class="modal-box w-11/12 max-w-3xl">
    <h3 class="font-bold text-lg">Daily Payment</h3>
    <hr class="my-2" />
    <div class="grid grid-cols-2 mt-2 mb-2">
      <div class="font-semibold">
          <p class="my-4">Client Number:</p>
          <p class="my-4">Transaction ID:</p>
          <p class="my-4">Transaction Date:</p>
          <p class="my-4">Name:</p>
          <p class="my-4">Loan Number:</p>
      </div>
      <div>
          <input type="text" class=" rounded-lg h-7 my-2" label="SPL-2023001">
          <input type="text" class=" rounded-lg h-7 my-2" label="ID">
          <input type="date" class=" rounded-lg h-7 my-2">
          <input type="text" class=" rounded-lg h-7 my-2" label="Francis Sanchez">
          <input type="text" class=" rounded-lg h-7 my-2" label="#01">
      </div>
      <button class="btn btn-xs w-fit absolute right-10 my-2">Search</button>
  </div>    


  <hr class="my-2" />
  <div class="flex gap-2 w-full text-sm font-semibold">
    <p>Loan amount <input class=" border border-black rounded-sm h-5 w-24"></p>
    <p>R. Date<input class=" border border-black rounded-sm h-5 w-24"></p>
    <p>Due Date<input class=" border border-black rounded-sm h-5 w-24"></p>
    <p>Loan status<input class=" border border-black rounded-sm h-5 w-24"></p>
    <p>D.I<input class=" border border-black rounded-sm h-5 w-24"></p>
    <p>T. Payment<input class=" border border-black rounded-sm h-5 w-24"></p>
    <p>Balance<input class=" border border-black rounded-sm h-5 w-24"></p>
  </div>

    <hr class="my-4" />

<div class="grid grid-cols-2 mt-2 mb-2 py-2">
    <div class=" flex flex-col gap-4 font-semibold">
        <p>Pr Number: </p>
        <p class=" text-blue-400 ">PR Assigned To:</p>
        <p class=" text-blue-400 ">Collector Assigned:</p>
        <p class=" text-blue-400 ">Name:</p>
        <p>Loan Payment:</p>
        <p>Arrears Penalty Payment:</p>
        <p>Past Due Interrest Payment:</p>

    </div>
    <div class="flex flex-col gap-4 w-2/3">
        <input type="text" class=" rounded-md h-6 " label="SPL-2023001">
        <input type="text" disabled class=" bg-yellow-200 rounded-md h-6 " label="ID">
        <input type="text" disabled class=" bg-yellow-200 rounded-md h-6 ">
        <input type="text" disabled class=" bg-yellow-200 rounded-md h-6 " label="Francis Sanchez">
        <input type="text" class=" rounded-md h-6 " label="#01">
        <input type="text" class=" rounded-md h-6 " label="#01">
        <input type="text" class=" rounded-md h-6 " label="#01">
    </div>
</div>
  

    <div class="modal-action">
      <button class="btn btn-ghost bg-green-400 text-white rounded-lg hover:bg-green-300 px-8">Update</button>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <label for="update" on:click={cancelPayment}  class="btn border-transparent bg-red-600">Cancel</label>
    </div>
  </div>
</div>
{/if}