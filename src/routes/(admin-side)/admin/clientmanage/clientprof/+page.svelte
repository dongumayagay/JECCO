<script>
	import SideNavAdmin from "../../../../lib/components/SideNavAdmin.svelte";

</script>

<main class=" flex ">

    <section class="flex flex-col w-64 h-full px-4 py-8 overflow-y-auto md:mr-6">
        <SideNavAdmin/>
    </section>
    


<section class="flex flex-col w-full h-screen p-6 ml-8 overflow-y-auto bg-gray-200 ">
    <div class="flex items-center justify-end p-4 shadow-md sm:rounded-lg h-10 bg-white gap-4">
        
        <button class=" btn btn-ghost bg-gray-200 btn-xs sm:btn-2xs md:btn-xs lg:btn-sm hover:bg-green-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
        </button>
        
        <button class=" btn btn-ghost bg-gray-200 btn-xs sm:btn-2xs md:btn-xs lg:btn-sm hover:bg-red-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
                    
              
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
                  <td>pass@123</td> 
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
                  <td>pass@123</td> 
                  <td>01/03/2023</td>
                </tr>
          
      </table>	


    </div>
</section>
</main>