<script>
    import PaymentModal from "$lib/components/paymentModal.svelte";

    let rowSelected = false;

</script>
    
    <svelte:head>
	<title>JECCO | Payments</title>
    </svelte:head>

    <div class="flex items-center p-4 shadow-md sm:rounded-lg h-10 bg-white gap-4">
                 <p class=" font-semibold ">Payments</p> 
                 <div class=" absolute right-10">
                 <label for="payment" class={rowSelected ? ' btn-info rounded-lg py-1 px-2 font-semibold ' : 'btn btn-sm'} disabled={!rowSelected}>EDIT PAYMENT</label>
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
            
        <div class="overflow-x-auto shadow-md sm:rounded-lg h-full bg-white mt-4">
                <div>
                        <table class="table table-auto w-full">
                                <thead>
                                        <tr>
                                                <th>#</th>
                                                <th>Payment Ref</th> 
                                                <th class="px-6">Loan Number</th>
                                                <th>Amount</th> 
                                                <th class="px-6">Transaction Date</th>
                                                
                                        </tr>
                                </thead>

                                <!-- {#each payments as payment } -->
                                
                                <tr on:click={() => rowSelected = !rowSelected} class={rowSelected ? ' hover cursor-pointer bg-blue-400 text-white ' : 'hover cursor-pointer'}>
                                    <td>
                                        1
                                    </td>
                                    <td>
                                        02a290xvg80x8u9s
                                    </td>
                                    <td class="px-6">
                                        00123
                                    </td>
                                    <td class="px-6">
                                        100php
                                    </td>
                                    <td>
                                        2/10/2023
                                    </td>
                                </tr>
                                <!-- {/each} -->
                        </table>	
                </div>		
        </div>
    <PaymentModal/>

 