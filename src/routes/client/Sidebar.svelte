<script>
    export let open
    
    const closesidebar=()=>{open=false}
</script>


<!-- svelte-ignore a11y-click-events-have-key-events -->
<main class=" fixed inset-0 bg-black/50 " on:click|self={closesidebar}>
    <nav class=" flex flex-col bg-white w-full max-w-xs h-full p-4 ">
        <button class=" ml-auto " on:click={closesidebar}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          

        </button>
        <a href="#payment">Payment</a>
        <a href="#duedates">Duedates</a>

    </nav>




</main>