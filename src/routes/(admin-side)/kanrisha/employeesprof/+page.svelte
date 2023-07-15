<script>
    import AddModal from "./AddModal.svelte";
    import UpdateModal from "./UpdateModal.svelte";
    import { collection, onSnapshot } from 'firebase/firestore';
    import {db} from '$lib/firebase/client.js';
    import ConfirmDeleteModal from "$lib/components/ConfirmDeleteModal.svelte";
    import EmployeeFilteringModal from './EmployeeFilteringModal.svelte';
    import { onMount, afterUpdate } from 'svelte';
  
    let userInfo
    let employees = []
    let showModal = false;
    let deleteSuccess = false;
    let idToDelete;
    let currentPage = 1;
    let itemsPerPage = 9;

    let totalItems = 0;
    let totalPages = 0;
    let displayedItems = [];

    async function getListOfEmployees(){
        const unsubscribe = onSnapshot(collection(db, 'employees'), (querySnapshot) => {
        employees = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        totalItems = employees.length;
        totalPages = Math.ceil(totalItems / itemsPerPage);
        updateDisplayedItems();
        });
        return () => unsubscribe();
    }

    function updateDisplayedItems() {
        let startIndex = (currentPage - 1) * itemsPerPage;
        let endIndex = startIndex + itemsPerPage;
        displayedItems = employees.slice(startIndex, endIndex);
    }

    function goToPage(pageNumber) {
        currentPage = pageNumber;
        updateDisplayedItems();
    }

    onMount(() => {
        getListOfEmployees();
    });

    afterUpdate(() => {
        updateDisplayedItems();
    });
    

    async function deleteEmployee(id){
        try {
			const response = await fetch(`/api/employees/${id}`, { method: 'DELETE',
            body: JSON.stringify({
					id:id,
			})});
		} catch (error) {
			console.log(error);
		}
    }

    function confirmDelete() {
        showModal = true;
    }

    function handleConfirm() {
        deleteEmployee(idToDelete);
        showModal = false;
    }

    function handleCancel() {
        showModal = false;
    }
</script>

<svelte:head>
	<title>JEM | Employee Profile</title>
</svelte:head>

<div class="flex items-center p-4 shadow-md sm:rounded-lg h-10 bg-white gap-4">
    Employees Profile
    <label for="add" class=" btn btn-ghost absolute right-10 bg-gray-200 btn-xs sm:btn-2xs md:btn-xs lg:btn-sm hover:bg-green-300">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
    </label>
    <label for="filter" class="btn-link py-1 px-5 font-semibold absolute right-20">
        Filter
    </label>
</div>    

<div class="overflow-scroll shadow-md sm:rounded-lg h-full bg-white mt-4">
    <table class=" table table-compact w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
                <th class="text-center">
                    
                </th>
                <th class="text-center">
                    Name
                </th>
                <th class="text-center">
                    Adress
                </th>
                <th class="text-center">
                    Contact Info
                </th>
                <th class="text-center">
                    Role
                </th>
                
            </tr>
        </thead>
        <tbody>
            {#each displayedItems as employee}
            <tr class="bg-white border-b hover:bg-gray-50">
                <td class="px-4">
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
                                <li><label for="update" on:click={userInfo(employee)}>Edit</label></li>
                                <li><button on:click={() => {idToDelete = employee.id, confirmDelete(); }}>Delete</button></li>
                            </ul>
                        </div>
                    </div>  
                </td>
                <td class="text-center">
                    {employee.name}
                </td>
                <td class="text-center truncate">
                    {employee.address}
                </td>
                <td class="text-center">
                    {employee.contactInfo}
                </td>
                <td class="text-center">
                    {employee.role}
                </td>
                
            </tr>
            {/each}
        </tbody>
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
<AddModal/>
<UpdateModal bind:userInfo={userInfo}/>
<ConfirmDeleteModal showModal={showModal}
onConfirm={handleConfirm}
onCancel={handleCancel}/>
<EmployeeFilteringModal/>
