<script>
  import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
  import { db } from '$lib/firebase/client.js';
  import { onMount, afterUpdate } from 'svelte';

  let clients = [];
  let currentPage = 1;
  let itemsPerPage = 20;

  let totalItems = 0;
  let totalPages = 0;
  let displayedItems = [];

  const q = query(collection(db, 'clientinfo'), orderBy("clientNumber", "desc"));

  async function getListOfClients() {
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
          clients = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          totalItems = clients.length;
          totalPages = Math.ceil(totalItems / itemsPerPage);
          updateDisplayedItems();
      });

      return () => unsubscribe();
  }

  function updateDisplayedItems() {
      let startIndex = (currentPage - 1) * itemsPerPage;
      let endIndex = startIndex + itemsPerPage;
      displayedItems = clients.slice(startIndex, endIndex);
  }

  function goToPage(pageNumber) {
      currentPage = pageNumber;
      updateDisplayedItems();
  }

  onMount(() => {
      getListOfClients();
  });

  afterUpdate(() => {
      updateDisplayedItems();
  });
</script>


<svelte:head>
	<title>JEM | Client Profile</title>
</svelte:head>
<div class="flex flex-1 items-center p-4 shadow-md sm:rounded-lg h-10 bg-white gap-4">
        
    <h1 class=" left-0 pr-10">Activity Logs</h1>
    
</div>    

<div class=" shadow-md rounded-lg h-full bg-white mt-4">
    <table class=" relative table table-compact table-fixed w-full">
        <thead class="">
            <tr class="">
                <th class="text-center">DATE</th> 
                <th class="text-center">USER</th> 
                <th class="text-center">ACTIVITY TYPE</th> 
                <th class="text-center">DETAILS</th> 
                
            </tr>
        </thead> 

        
        {#each displayedItems as item }
            <tr class=" hover">
                <td class="text-center">
                    Date
                </td>
                
                <td class="text-center">
                    {item.firstname + " " + item.lastname }
                </td>
                <td class="text-center">
                    Activity
                </td>
                <td class="text-center truncate">
                    Details Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis voluptatum sed voluptate nobis rem ullam rerum asperiores possimus ratione, id, ducimus labore tempore numquam provident exercitationem ex? Itaque, id molestias?
                </td>
            </tr>      
        {/each}
        
    </table>

    
</div>
<!-- Pagination -->
<div class="mt-4 flex justify-center">
    <button class="cursor-pointer px-2 py-1 rounded hover:bg-gray-200" disabled={currentPage === 1} on:click={() => goToPage(1)}>
      First
    </button>
    <button class="cursor-pointer px-2 py-1 rounded hover:bg-gray-200" disabled={currentPage === 1} on:click={() => goToPage(currentPage - 1)}>
      Previous
    </button>

    <!-- {#if currentPage > 3}
      <span class="cursor-pointer px-2 py-1 rounded hover:bg-gray-200">...</span>
    {/if} -->

    <!-- {#each Array.from({ length: totalPages }, (_, i) => i + 1) as page}
      {#if currentPage - 2 <= page && page <= currentPage + 2}
        <button class="cursor-pointer px-2 py-1 rounded hover:bg-gray-200" aria-current={currentPage === page} on:click={() => goToPage(page)}>
          {page}
        </button>
      {/if}
    {/each} -->

    <!-- {#if currentPage < totalPages - 2}
      <span class="cursor-pointer px-2 py-1 rounded hover:bg-gray-200">...</span>
    {/if} -->

    <button class="cursor-pointer px-2 py-1 rounded hover:bg-gray-200" disabled={currentPage === totalPages} on:click={() => goToPage(currentPage + 1)}>
      Next
    </button>
    <button class="cursor-pointer px-2 py-1 rounded hover:bg-gray-200" disabled={currentPage === totalPages} on:click={() => goToPage(totalPages)}>
      Last
    </button>
  </div>

<!-- <EditClientModal bind:clientsInfo={clientsInfo} />    
<AddClientProfile bind:clientInfo={clientInfo}/>
<AddLoanPProcess bind:clienInfo={clienInfo} />    -->
<!-- <ConfirmDeleteModal showModal={showModal} -->
<!-- onConfirm={handleConfirm}
onCancel={handleCancel}/> -->