    <div class="flex items-center justify-end p-4 shadow-md sm:rounded-lg h-10 bg-white gap-4">
        
        <h1 class="">Client Profile</h1>


        <label for="my-modal" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
            <div class=" btn btn-ghost bg-gray-200 btn-xs sm:btn-2xs md:btn-xs lg:btn-sm hover:bg-green-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                </div>

        </label>

        <label for="my-modal" class="" >
            <div class=" btn btn-ghost bg-gray-200 btn-xs sm:btn-2xs md:btn-xs lg:btn-sm hover:bg-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                  
                </div>

        </label>
        
        <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
            <div class=" btn btn-ghost bg-gray-200 btn-xs sm:btn-2xs md:btn-xs lg:btn-sm hover:bg-red-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>                                  
                </div>

            </button>
        
    </div>    

    <div class="overflow-x-auto relative shadow-md sm:rounded-lg h-full bg-white mt-4">
        <table class="table table-normal w-full ">
            <thead>
                <tr>
                    <td class="p-4 w-4">
                        <div class="flex items-center">
                            <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        </div>
                    </td> 
                <th class=" w-60 ">Client Number</th> 
                <th class=" w-64 ">Name</th> 
                <th class=" w-96 " >Password</th> 
                <th class=" w-96 " >Area</th> 
                <th class=" w-96 " >Collector Assigned</th> 
                <th class=" w-96 " >Loan type</th> 
                <th class=" w-96 " >Mode of Payment</th> 
                <th class=" w-60" >Date Created</th> 
              </tr>
           </thead> 
              <tr class="hover">
                <td class="p-4 w-4">
                    <div class="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    </div>
                </td>
                  <td>SPL-2022-0001</td> 
                  <td>Trishan Andrei</td> 
                  <td>********</td>
                  <td>Langgam</td>
                  <td>Juan Dela Cruz</td>
                  <td>New</td>
                  <td>Monthly</td> 
                  <td>12/12/2022</td>
              </tr>
              <tr class="hover">
                <td class="p-4 w-4">
                    <div class="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    </div>
                </td>
                  <td>SPL-2022-0002</td> 
                  <td>Hart Hagerty</td> 
                  <td>********</td>
                  <td>Estrella</td>
                  <td>Pedro Guillermo</td> 
                  <td>Renewal</td>
                  <td>Quarterly</td>
                  <td>01/03/2023</td>
                </tr>
          
      </table>	


    </div>

    <input type="checkbox" id="my-modal" class="modal-toggle"  />
    <div class="modal">
        <div class="modal-box">
    
            <!-- Modal -->
            <form action="#" class="relative rounded-lg shadow">
                <!-- Modal header -->
                <div class="flex justify-between items-start p-4 rounded-t border-b ">
                    <h3 class="text-xl font-semibold  ">
                        Process Loan
                    </h3>
                    <!-- <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover: rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="editUserModal">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                    </button> -->
                </div>
                <!-- Modal body -->
                <div class="p-6 space-y-6">
                    <div class="grid grid-cols-6 gap-6">
                        <div class="col-span-6 sm:col-span-3">
                            <label for="first-name" class="block mb-2 text-sm font-medium  ">Client Number</label>
                            <input type="text" name="first-name" id="first-name" class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Client Number" required="">
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="first-name" class="block mb-2 text-sm font-medium  ">Name</label>
                            <input type="text" name="first-name" id="first-name" class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required="">
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="first-name" class="block mb-2 text-sm font-medium  ">Password</label>
                            <input type="password" name="first-name" id="first-name" class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required="">
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="first-name" class="block mb-2 text-sm font-medium  ">Area</label>
                            <input type="text" name="first-name" id="first-name" class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Area" required="">
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="last-name" class="block mb-2 text-sm font-medium  ">Collector</label>
                            <input type="text" name="last-name" id="last-name" class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Collector" required="">
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="email" class="block mb-2 text-sm font-medium  ">Loan type</label>
                            <input type="email" name="email" id="email" class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Loan type" required="">
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="phone-number" class="block mb-2 text-sm font-medium  ">Mode of Payment</label>
                            <input type="text" name="phone-number" id="phone-number" class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mode of Payment" required="">
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="department" class="block mb-2 text-sm font-medium  ">Date Created</label>
                            <input type="date" name="department" id="department" class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Date created" required="">
                        </div>
                    </div>
                </div>
                <!-- Modal footer -->
                <!-- <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save all</button>
                </div> -->
            </form>
    
    
            <div class="modal-action">
                <label for="my-modal" class="btn border-transparent bg-green-600">Save</label>
                <label for="my-modal" class="btn border-transparent bg-red-600">Cancel</label>
            </div>    
        </div>
    </div>

    <input type="checkbox" id="add" class="modal-toggle"  />
    <div class="modal">
        <div class="modal-box">
    
            <!-- Modal -->
            <form action="#" class="relative rounded-lg shadow">
                <!-- Modal header -->
                <div class="flex justify-between items-start p-4 rounded-t border-b ">
                    <h3 class="text-xl font-semibold  ">
                        Add
                    </h3>
                    <!-- <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover: rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="editUserModal">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                    </button> -->
                </div>
                <!-- Modal body -->
                <div class="p-6 space-y-6">
                    <div class="grid grid-cols-6 gap-6">
                        <div class="col-span-6 sm:col-span-3">
                            <label for="first-name" class="block mb-2 text-sm font-medium  ">Client Number</label>
                            <input type="text" name="first-name" id="first-name" class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Client Number" required="">
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="first-name" class="block mb-2 text-sm font-medium  ">Name</label>
                            <input type="text" name="first-name" id="first-name" class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required="">
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="first-name" class="block mb-2 text-sm font-medium  ">Password</label>
                            <input type="password" name="first-name" id="first-name" class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required="">
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="first-name" class="block mb-2 text-sm font-medium  ">Area</label>
                            <input type="text" name="first-name" id="first-name" class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Area" required="">
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="last-name" class="block mb-2 text-sm font-medium  ">Collector</label>
                            <input type="text" name="last-name" id="last-name" class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Collector" required="">
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="email" class="block mb-2 text-sm font-medium  ">Loan type</label>
                            <input type="email" name="email" id="email" class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Loan type" required="">
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="phone-number" class="block mb-2 text-sm font-medium  ">Mode of Payment</label>
                            <input type="text" name="phone-number" id="phone-number" class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mode of Payment" required="">
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="department" class="block mb-2 text-sm font-medium  ">Date Created</label>
                            <input type="date" name="department" id="department" class="shadow-sm  border   text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Date created" required="">
                        </div>
                    </div>
                </div>
                <!-- Modal footer -->
                <!-- <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save all</button>
                </div> -->
            </form>
    
    
            <div class="modal-action">
                <label for="add" class="btn border-transparent bg-green-600">Save</label>
                <label for="add" class="btn border-transparent bg-red-600">Cancel</label>
            </div>    
        </div>
    </div>