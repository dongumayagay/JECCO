<script>
    import {db} from '$lib/firebase/client.js';
    import { collection, where, query, getDocs  } from 'firebase/firestore';

    let searchModal = false; 
    let searchInput = "";
    let searchResults = [];
    let searchResultOne = [];
    let searchResultTwo = [];
    let searchResultThree = [];
    
    export let selected = [];

    export async function getAllEmployees(){
        const querySnapshot = await getDocs(collection(db, "employees"), where("role", "==", "Collector"));
        querySnapshot.forEach((doc) => {
            searchResults = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        });
    }

    function selectEmployee(chosen){
        selected = chosen;
        searchResults = [];
        searchModal = false; 
    }
    function resetAddUserInput () {
        searchInput = "";
        searchResults = [];
    }

    async function searchEmployee() {
        searchResults = [];
        const qOne = query(collection(db, 'employees'), where("firstname", "==", searchInput));
        const querySnapshotOne = await getDocs(qOne);
        querySnapshotOne.forEach((doc) => {
            searchResultOne = querySnapshotOne.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        });
        const qTwo = query(collection(db, "employees"), where("lastname", "==", searchInput));
        const querySnapshotTwo = await getDocs(qTwo);
        querySnapshotTwo.forEach((doc) => {
            searchResultTwo = querySnapshotTwo.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        });
        const qThree = query(collection(db, "employees"), where("clientNumber", "==", searchInput));
        const querySnapshotThree = await getDocs(qThree);
        querySnapshotThree.forEach((doc) => {
            searchResultThree = querySnapshotThree.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        });
        searchResults = searchResultOne.concat(searchResultTwo,searchResultThree);
        searchInput = "";
    }

</script>

<input type="checkbox" bind:checked={searchModal} id="search" class="modal-toggle" />
    <div class="modal">
        <div class=" modal-box ">
            
            <!-- on:submit={updateEmployee} -->

            <form class="relative bg-white rounded-lg shadow" on:submit={searchEmployee}>
                <!-- Modal header -->
                <div class="flex justify-center items-center p-4 rounded-t border-b">
                    <h3 class="text-xl font-semibold text-gray-900">
                        Search  
                    </h3>
                    <input type="search" bind:value={searchInput} class="w-full border-0 border-b-2">
                </div>

                <!-- table -->
                <div>
                    <table class=" table w-full overflow-y-auto">
                        <thead>
                            <th>Name</th>
                        </thead>
                        {#each searchResults as searchResult }    
                        <tr class="hover cursor-pointer" on:click={() => selectEmployee(searchResult)}>
                            <td>{searchResult.name}</td>
                        </tr>
                        {/each}
                    </table>   
                </div>

                <div class="modal-action">    
                    <button type="submit" class="btn border-transparent bg-blue-600">Search</button>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <label for="search" on:click={resetAddUserInput} class="btn border-transparent bg-red-600">Cancel</label>
                </div>
            </form>
        </div>
    </div>