<script>
    import AddModal from "./AddModal.svelte";
    import UpdateModal from "./UpdateModal.svelte";
    import { collection, onSnapshot } from 'firebase/firestore';
    import {db} from '$lib/firebase/client.js';
    import ConfirmDeleteModal from "$lib/components/ConfirmDeleteModal.svelte";

    let userInfo
    let employees = []
    let showModal = false;
    let deleteSuccess = false;
    let idToDelete;

    async function getListOfEmployees(){
        const unsubscribe = onSnapshot(collection(db, 'employees'), (querySnapshot) => {
        employees = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        });
        return () => unsubscribe();
    }

    getListOfEmployees()

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
</div>    

<div class="overflow-x-auto relative shadow-md sm:rounded-lg h-full bg-white mt-4">
    <div class="flex justify-between items-center p-4 bg-white ">
        <div class="relative ">
        </div>
    </div>
    <table class=" table w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
                <th scope="col" class="px-6">              
                </th>
                <th scope="col" class="px-6">
                    Name
                </th>
                <th scope="col" class="px-6">
                    Adress
                </th>
                <th scope="col" class="px-6">
                    Contact Info
                </th>
                <th scope="col" class="px-6">
                    Role
                </th>
                
            </tr>
        </thead>
        <tbody>
            {#each employees as employee}
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
                <td class="px-6">
                    {employee.name}
                </td>
                <td class="px-6">
                    {employee.address}
                </td>
                <td class="px-6">
                    {employee.contactInfo}
                </td>
                <td class="px-6">
                    {employee.role}
                </td>
                
            </tr>
            {/each}
        </tbody>
    </table>
</div>
<AddModal/>
<UpdateModal bind:userInfo={userInfo}/>
<ConfirmDeleteModal showModal={showModal}
onConfirm={handleConfirm}
onCancel={handleCancel}/>
