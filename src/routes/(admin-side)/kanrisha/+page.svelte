<script>
    import Chart from "$lib/components/Chart.svelte";
    
</script>

<svelte:head>
	<title>JECCO | Admin Dashboard</title>
</svelte:head>


    <div class="flex flex-1 flex-col bg-white gap-6 h-screen p-4 shadow-lg rounded-md overflow-auto ">
        
        <div class="p-2">
            <h1 class="font-bold text-xl" >Client Dashboard</h1>
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
            <div class=" w-96 bg-gray-200 h-30 rounded-lg hover:bg-white transition duration-200 ease-in-out drop-shadow-lg">

            </div>
            <div class=" w-96 bg-gray-200 h-30 rounded-lg hover:bg-white transition duration-200 ease-in-out drop-shadow-lg">

            </div>
            <div class=" w-96 bg-gray-200 h-30 rounded-lg hover:bg-white transition duration-200 ease-in-out drop-shadow-lg">

            </div>
        </section>
        <hr/>
 
    </div>