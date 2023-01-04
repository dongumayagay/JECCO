<script>
    import AddClientProfile from "$lib/components/AddClientProfile.svelte";
</script>    
<div class="flex items-center p-4 shadow-md sm:rounded-lg h-10 bg-white gap-4">
        
    <h1 class=" left-0 pr-10">Client Profile</h1>
    <label for="add" class=" btn btn-ghost absolute right-10 px-2 bg-white btn-xs sm:btn-2xs md:btn-xs lg:btn-sm hover:bg-green-300">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
    </label>
    
</div>    

<div class="overflow-x-auto relative shadow-md sm:rounded-lg h-full bg-white mt-4">
    
    <table class="table table-normal w-full ">
        <thead>
            <tr>
                <th scope="col" class="px-6"></th>
                <th scope="col" class="px-6">Client Number</th> 
                <th scope="col" class="px-6">Name</th> 
                <th scope="col" class="px-6">Area</th> 
                <th scope="col" class="px-6" >Collector Assigned</th> 
                <th scope="col" class="px-6" >Loan type</th> 
                <th scope="col" class="px-6" >Mode of Payment</th> 
                <th scope="col" class="px-6" >Date Created</th> 
            </tr>
        </thead> 
            <tr class="hover">
                <td class="p-4 w-4">
                    <div  class="flex items-center space-x-2 text-sm">
                        <div class="dropdown">
                            <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                            <label for='' tabindex="0" class="flex items-center justify-between text-sm font-medium leading-5 rounded-lg text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Delete">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" fill="currentColor" class="w-5 h-5">
                                    <path d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clip-rule="evenodd" />
                                </svg>
                            </label>
                            <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-38">
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <li><label for="update">Edit</label></li>
                                <li><button>Delete</button></li>
                            </ul>
                        </div>
                    </div>
                </td>
                <td>SPL-2022-0001</td> 
                <td>Trishan Andrei</td> 
                <td>Langgam</td>
                <td>Juan Dela Cruz</td>
                <td>New</td>
                <td>Monthly</td> 
                <td>12/12/2022</td>
            </tr>      
    
    </table>	
</div>
<AddClientProfile/>
    