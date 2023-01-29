    <script>
        import PaymentModal from "$lib/components/paymentModal.svelte";

        let rowSelected = false;

    
    </script>
        

    <div class="flex items-center p-4 shadow-md sm:rounded-lg h-10 bg-white gap-4">
                 <p class=" font-semibold ">Payments</p> 
                 <div class=" absolute right-10">
                 <label for="payment" class={rowSelected ? ' btn-info rounded-lg py-1 px-2 font-semibold ' : 'btn btn-sm'} disabled={!rowSelected}>UPDATE PAYMENT</label>
                </div>
            </div>

            <div class="overflow-x-auto shadow-md sm:rounded-lg w-full h-60 bg-white mt-4">
                <div class="flex">
                    <div class=" p-4">
                        <label for="search" class=" btn btn-sm">Search</label>
                    </div>
                    <div class=" flex p-4 font-semibold">
                        <p>Client Number: </p><p class=" text-blue-600 pl-4"> SPL20230125001</p>
                    </div>
                </div>
                    <div class="flex pl-6 font-semibold">
                        <div class=" flex flex-col gap-2">
                            <p>BORROWER:</p>
                            <p>ADDRESS:</p>
                            <p>CO-MAKER:</p>
                        </div>
                        <div class=" flex flex-col gap-2 text-blue-600 font-semibold pl-6">
                            <p>FRANCIS ARGOSINO SANCHEZ</p>
                            <p>Blk1 Lot1 Ph1 Estrella San Pedro Laguna</p>
                            <p>ANGEL PAUL PASCUAL AGNABO</p>
                        </div>
                    </div>
            </div>
            
        <div class="overflow-x-auto relative shadow-md sm:rounded-lg h-full bg-white mt-4">
                <div>
                        <table class="table table-normal w-full">
                                <thead>
                                        <tr>
                                                <th>Client Number</th> 
                                                <th>Name</th> 
                                                <th class="px-6">Loan Number</th>
                                                <th class="px-6">Transaction Date</th>
                                                
                                        </tr>
                                </thead>

                                <tr on:click={() => rowSelected = !rowSelected} class={rowSelected ? ' hover cursor-pointer bg-blue-400 text-white ' : 'hover cursor-pointer'}>
                                    <td>
                                        SPL-2023001
                            
                                    </td>
                                    <td>
                                        Francis Sanchez
                                    </td>
                                    <td class="px-6">
                                        #01
                                    </td>
                                    <td class="px-6">
                                        01/01/2023
                                    </td>
                                </tr>

                        </table>	
                </div>		
        </div>
    <PaymentModal/>

 