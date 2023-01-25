<script>

let searchModal = false;

</script>



<input type="checkbox" bind:checked={searchModal} id="search" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box">
            
            <!-- on:submit={updateEmployee} -->

            <form class="relative bg-white rounded-lg shadow dark:bg-gray-700" >
                <!-- Modal header -->
                <div class="flex justify-center items-center p-4 rounded-t border-b dark:border-gray-600 gap-6">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Search  
                    </h3>
                    <input type="search" class="w-full border-0 border-b-2">
                </div>
                <!-- Modal body -->
                <div class="overflow-y-auto h-full bg-white">
                    <!-- table div -->
                    <div>
                        <table class=" table w-full">
                            <thead>
                                <th>Client Number</th>
                                <th>Full Name</th>
                            </thead>
                        <tr class="hover">
                            <td>SPL20230125001</td>
                            <td>FRANCIS SANCHEZ</td>
                        </tr>
                        <tr class="hover">
                            <td>SPL20230125001</td>
                            <td>FRANCIS SANCHEZ</td>
                        </tr>
                        <tr class="hover">
                            <td>SPL20230125001</td>
                            <td>FRANCIS SANCHEZ</td>
                        </tr>
                        <tr class="hover">
                            <td>SPL20230125001</td>
                            <td>FRANCIS SANCHEZ</td>
                        </tr>
                        <tr class="hover">
                            <td>SPL20230125001</td>
                            <td>FRANCIS SANCHEZ</td>
                        </tr>
                        <tr class="hover">
                            <td>SPL20230125001</td>
                            <td>FRANCIS SANCHEZ</td>
                        </tr>
                        <tr class="hover">
                            <td>SPL20230125001</td>
                            <td>FRANCIS SANCHEZ</td>
                        </tr>



                        </table>   
                    </div>

                </div>
                <div class="modal-action">    
                    <button type="submit" class="btn border-transparent bg-blue-600">Search</button>
                    <label for="search" class="btn border-transparent bg-red-600">Cancel</label>
                </div>
            </form>

        </div>
    </div>