<script>
    import AddModal from "./AddModal.svelte";
    import UpdateModal from "./UpdateModal.svelte";
    import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
    import { onMount } from 'svelte';
    import {db} from '$lib/firebase/client.js';
	let userInfo
    let employees = []

    onMount(() => {
        const unsubscribe = onSnapshot(collection(db, 'employees'), (querySnapshot) => {
        employees = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        });
        return () => unsubscribe();
        
    })
    async function deleteEmployee(id){
        await deleteDoc(doc(db, "employees", id));
    }

</script>

<div class="flex items-center justify-end p-4 shadow-md sm:rounded-lg h-10 bg-white gap-4">
    <label for="add" class=" btn btn-ghost bg-gray-200 btn-xs sm:btn-2xs md:btn-xs lg:btn-sm hover:bg-green-300">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
    </label>
    <button class=" btn btn-ghost bg-gray-200 btn-xs sm:btn-2xs md:btn-xs lg:btn-sm hover:bg-red-300">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>      
    </button>       
</div>    

<div class="overflow-x-auto relative shadow-md sm:rounded-lg h-full bg-white mt-4">
    <div class="flex justify-between items-center p-4 bg-white dark:bg-gray-800">
        <div class="relative ">
        </div>
    </div>
    <table class=" table w-full text-sm text-left text-gray-500 dark:text-black">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700">
            <tr>
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
                </th>
            </tr>
        </thead>
        <tbody>
            {#each employees as employee }
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
                    <div  class="flex items-center space-x-2 text-sm">
                        <div class="dropdown dropdown-end">
                            <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                            <label for='' tabindex="0" class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 rounded-lg text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Delete">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" fill="currentColor" class="w-5 h-5">
                                    <path d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clip-rule="evenodd" />
                                </svg>
                            </label>
                            <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-38">
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <li><label for="update" on:click={userInfo(employee)}>Edit</label></li>
                                <li><button on:click={deleteEmployee(employee.id)}>Delete</button></li>
                            </ul>
                        </div>
                    </div>  
                </td>
            </tr>
            {/each}
        </tbody>
    </table>
</div>
<AddModal/>
<UpdateModal bind:userInfo={userInfo}/>

