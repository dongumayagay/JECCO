<script>
  import {userStore} from '$lib/store.js'
  
</script>

<svelte:head>
	<title>JEM | Client Dashboard</title>
</svelte:head>


  
  <section class="flex flex-col flex-1 bg-white rounded-lg" >
    <h1 class="p-5 font-bold text-xl">Client Dashboard</h1>
    <hr/>
    <div class=" flex flex-col w-full h-1/2 p-6 gap-6">
      <div class="">
        {#if $userStore }
        <h2 class="font-semibold text-4xl">Welcome {$userStore.displayName}!</h2>
        {/if}
      </div>
    </div>

  </section>