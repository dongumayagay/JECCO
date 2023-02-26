<script>
    import Chart from "$lib/components/Chart.svelte";
    
</script>

<svelte:head>
	<title>JECCO | Admin Dashboard</title>
</svelte:head>


    <div class="flex flex-1 flex-col bg-white gap-6 h-screen p-4 shadow-lg rounded-md overflow-auto ">
        
        <div class="p-2">
            <h1 class="font-bold text-xl" >Admin Dashboard</h1>
        </div>
        <hr/>
        <h2 class="font-bold text-xl pl-2">General Report</h2>
        <section class="flex gap-7 p-3 overflow-auto mb-4 ">
            
            <div class=" flex flex-col w-96 bg-gray-200 h-30 rounded-lg hover:bg-white transition duration-200 ease-in-out drop-shadow-lg pt-2 pl-6 hover:text-green-700">
                <div class=" flex flex-1">
                    <p class=" font-semibold text-xl max-lg:text-lg ">Total client</p>
                </div>
                <div class=" flex flex-1 justify-center items-center">
                    <div class=" flex-1 text-7xl max-lg:text-4xl font-semibold"> <p>0</p> </div>
                    <div class=" flex flex-1 justify-end pr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-24 h-24 max-lg:w-12 max-lg:h-12">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                    </div>
                </div>  
            </div>
            <div class=" flex flex-col w-96 bg-gray-200 h-30 rounded-lg hover:bg-white transition duration-200 ease-in-out drop-shadow-lg pt-2 pl-6 hover:text-green-700">
                <div class=" flex flex-1">
                    <p class=" font-semibold text-xl max-lg:text-lg ">Total Revenue</p>
                </div>
                <div class=" flex flex-1 justify-center items-center">
                    <div class=" flex-1 text-7xl max-lg:text-4xl font-semibold"> <p>0</p> </div>
                    <div class=" flex flex-1 justify-end pr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-24 h-24 max-lg:w-12 max-lg:h-12">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                          </svg>
                          
                    </div>
                </div>  
            </div>
            <div class=" flex flex-col w-96 bg-gray-200 h-30 rounded-lg hover:bg-white transition duration-200 ease-in-out drop-shadow-lg pt-2 pl-6 hover:text-green-700">
                <div class=" flex flex-1">
                    <p class=" font-semibold text-xl max-lg:text-lg ">Applications</p>
                </div>
                <div class=" flex flex-1 justify-center items-center">
                    <div class=" flex-1 text-7xl max-lg:text-4xl font-semibold"> <p>0</p> </div>
                    <div class=" flex flex-1 justify-end pr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-24 h-24 max-lg:w-12 max-lg:h-12">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                          </svg>
                          
                    </div>
                </div>  
            </div>
            <div class=" flex flex-col w-96 bg-gray-200 h-30 rounded-lg hover:bg-white transition duration-200 ease-in-out drop-shadow-lg pt-2 pl-6 hover:text-green-700">
                <div class=" flex flex-1">
                    <p class=" font-semibold text-xl max-lg:text-lg ">Past Dues</p>
                </div>
                <div class=" flex flex-1 justify-center items-center">
                    <div class=" flex-1 text-7xl max-lg:text-4xl font-semibold"> <p>0</p> </div>
                    <div class=" flex flex-1 justify-end pr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-24 h-24 max-lg:w-12 max-lg:h-12">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>                          
                    </div>
                </div> 
            </div>
        </section>
        <hr/>
 
    </div>