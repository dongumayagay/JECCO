<script>
    import { collection, onSnapshot, doc, deleteDoc, query, where, orderBy } from 'firebase/firestore';
    import {db} from '$lib/firebase/client.js';
    import AddClientArrangement from '$lib/components/AddClientArrangement.svelte';
	import UpdateAreaModal from './UpdateAreaModal.svelte';    
    import SearchEmployeeModal from '$lib/components/SearchEmployeeModal.svelte';
    import ConfirmDeleteModal from '$lib/components/ConfirmDeleteModal.svelte';
    import ViewClient from './ViewClient.svelte';

    let selectedRowIndex = null;
    let searchSelected = false;
    let areas = []
    let clientInfo
    let clienInfo
    let employee = []
    let getAllEmployees;
    let showModal = false;
    let deleteSuccess = false;
    let idToDelete;
    let getAllClients;
    let clientsArea


    async function employeeArea() {
        areas = []

        const q = query(collection(db, 'areas'), where("owner", "==", employee.id), orderBy("seqNumber", "asc") );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            areas = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        });
        return () => unsubscribe();
        
    }

    async function deleteArea(id){
        await deleteDoc(doc(db, "areas", id));
    }

    const handleRowClick = (index,barangay) => {
        selectedRowIndex = selectedRowIndex === index ? null : index;
        clientsArea = barangay;
    };

    $: if(employee.length !== 0){
        searchSelected = true;
        employeeArea();
    } else{
        searchSelected = false;
    }

    function confirmDelete() {
        showModal = true;
    }

    function handleConfirm() {
        deleteArea(idToDelete);
        showModal = false;
    }

    function handleCancel() {
        showModal = false;
    }
</script>


<div class="flex items-center p-4 shadow-md sm:rounded-lg bg-white gap-4">
    <h1 class=" font-bold">Client Arrangement</h1>
    <div class=" flex absolute right-10 gap-4">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <label for="viewClient" class={selectedRowIndex !== null ? ' btn-info rounded-lg py-1 px-2 font-semibold ' : 'btn btn-sm'} disabled={selectedRowIndex === null} on:click={getAllClients(clientsArea)}>VIEW CLIENTS</label>
        <label for="edit" class={selectedRowIndex !== null ? ' btn-info rounded-lg py-1 px-2 font-semibold ' : 'btn btn-sm'} disabled={selectedRowIndex === null}>EDIT</label>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <label for="add2" on:click={() => clienInfo(employee,areas.length)} class={searchSelected ? ' btn-info rounded-lg py-1 px-2 font-semibold ' : 'btn btn-sm'} disabled={!searchSelected}>Add Area</label>
    </div>
</div>

<div class="overflow-x-auto shadow-md sm:rounded-lg w-full h-36 bg-white mt-4">
    <div class="flex">
        <div class=" p-4">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <label for="search" on:click={getAllEmployees} class=" btn btn-sm">Search</label>                                                                               
        </div>
    </div>
    <div class="flex pl-6 font-semibold">
        <div class=" flex flex-col gap-2">
            <p>Collector:</p>
        </div>
        <div class=" flex flex-col gap-2 text-blue-600 font-semibold pl-6">
            {#await employee}
                <p>...waiting</p>
            {:then info}
                {#if employee.id == undefined}
                    <p></p>
                {:else}
                    <p>{employee.name}</p>
                {/if}
            {:catch error}
                <p style="color: red">{error.message}</p>
            {/await}                
        </div>
    </div>
    
</div>

<div class="overflow-x-auto shadow-md sm:rounded-lg h-full bg-white mt-4">
	<div>
		<table class="table table-normal w-full">
			<thead>
				<tr class="hover">
                    <th></th>
                    <td class="px-6">Area Id</td>
                    <td class="px-6">SEQ#</td>
                    <th scope="col" class="px-6">Area Name</th>
				</tr>
			</thead>
            {#each areas as area}
                <tr on:click={() => handleRowClick(area.id,area.areaName)} on:click={clientInfo(area)} class={selectedRowIndex === area.id ? ' hover cursor-pointer bg-blue-400 text-white ' : 'hover cursor-pointer'}>
                <td class="pr-0 ">
                    <div  class="flex items-center space-x-1 text-sm">
                        <div class="dropdown">
                            <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                            <label for='' tabindex="0" class="flex items-center justify-between text-sm font-medium leading-5 rounded-lg text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Delete">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" fill="currentColor" class="w-5 h-5">
                                    <path d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clip-rule="evenodd" />
                                </svg>
                            </label>
                            <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-38 text-black">
                                <li><button on:click={() => {idToDelete = area.id, confirmDelete(); }}>Delete</button></li>  
                            </ul>
                        </div>
                    </div>
                </td>    
                <td class="px-6">
                <p>{area.areaId}</p>
                </td>
                <td class="px-6">
                    {area.seqNumber}
                </td>
                <td class="px-6">
                    {area.areaName}    
                </td>
            </tr>
            {/each}
		</table>	
	</div>		
</div>

<SearchEmployeeModal bind:selected={employee} bind:getAllEmployees={getAllEmployees}/>
<AddClientArrangement bind:clienInfo={clienInfo} />
<UpdateAreaModal bind:clientInfo={clientInfo} />
<ViewClient bind:getAllClients={getAllClients}/>
<ConfirmDeleteModal showModal={showModal}
onConfirm={handleConfirm}
onCancel={handleCancel}/>