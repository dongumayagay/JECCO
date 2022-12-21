<script>
	import SideNavAdmin from "$lib/components/SideNavAdmin.svelte";
    import Chart from "$lib/components/Chart.svelte";
    
    
</script>

<main class="flex" >

    <section class="flex flex-col w-64 h-full px-4 py-8 overflow-y-auto md:mr-6">
    <SideNavAdmin/>
    </section>


<section class="flex flex-col w-full h-screen p-6 ml-8 overflow-y-auto bg-gray-200 ">

<!-- <div class="flex flex-wrap bg-white p-4 ">
    <div class="w-full md:w-1/2 xl:w-1/3 p-3 md:pr-2">
        <div class="bg-green-600 border rounded shadow p-2">
            <div class="flex items-center">
                <div class="flex-shrink pl-1 pr-4"><i class="fa fa-wallet fa-2x fa-fw fa-inverse"></i></div>
                <div class="flex-1 text-right">
                    <h5 class="text-white">Total Revenue</h5>
                    <h3 class="text-white text-3xl">3,249php<span class="text-green-400"><i class="fas fa-caret-down"></i></span></h3>
                </div>
            </div>
        </div>
    </div>
    <div class="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pl-2">
        <div class="bg-blue-600 border rounded shadow p-2">
            <div class="flex items-center">
                <div class="flex-shrink pl-1 pr-4"><i class="fas fa-users fa-2x fa-fw fa-inverse"></i></div>
                <div class="flex-1 text-right">
                    <h5 class="text-white">Total Client</h5>
                    <h3 class="text-white text-3xl">13 <span class="text-blue-400"><i class="fas fa-caret-up"></i></span></h3>
                </div>
            </div>
        </div>
    </div>
    <div class="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pr-2 xl:pr-3 xl:pl-1">
        <div class="bg-orange-600 border rounded shadow p-2">
            <div class="flex  items-center">
                <div class="flex-shrink pl-1 pr-4"><i class="fas fa-user-plus fa-2x fa-fw fa-inverse"></i></div>
                <div class="flex-1 text-right pr-1">
                    <h5 class="text-white">New Client</h5>
                    <h3 class="text-white text-3xl">2 <span class="text-orange-400"><i class="fas fa-caret-up"></i></span></h3>
                </div>
            </div>
        </div>
    </div>
    <div class="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pl-2 xl:pl-3 xl:pr-2">
        <div class="bg-purple-600 border rounded shadow p-2">
            <div class="flex flex-row items-center">
                <div class="flex-shrink pl-1 pr-4"><i class="fas fa-server fa-2x fa-fw fa-inverse"></i></div>
                <div class="flex-1 text-right">
                    <h5 class="text-white">Inquiries</h5>
                    <h3 class="text-white text-3xl">4</h3>
                </div>
            </div>
        </div>
    </div>
    <div class="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pr-2 xl:pl-2 xl:pr-3">
        <div class="bg-red-600 border rounded shadow p-2">
            <div class="flex flex-row items-center">
                <div class="flex-shrink pl-1 pr-4"><i class="fas fa-tasks fa-2x fa-fw fa-inverse"></i></div>
                <div class="flex-1 text-right">
                    <h5 class="text-white">To Do List</h5>
                    <h3 class="text-white text-3xl">2 tasks</h3>
                </div>
            </div>
        </div>
    </div>
    <div class="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pl-2 xl:pl-1">
        <div class="bg-pink-600 border rounded shadow p-2">
            <div class="flex flex-row items-center">
                <div class="flex-shrink pl-1 pr-4"><i class="fas fa-inbox fa-2x fa-fw fa-inverse"></i></div>
                <div class="flex-1 text-right">
                    <h5 class="text-white">Past dues</h5>
                    <h3 class="text-white text-3xl">3 <span class="text-pink-400"><i class="fas fa-caret-up"></i></span></h3>
                </div>
            </div>
        </div>
    </div>
</div>
-->
    <div class="flex flex-wrap bg-white p-4 ">
        <canvas id="myChart"> <Chart/> </canvas>
    </div>
</section>
</main>