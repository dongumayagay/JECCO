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

    export async function getAllClients(){
        const querySnapshot = await getDocs(collection(db, "clientinfo"));
        querySnapshot.forEach((doc) => {
            searchResults = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        });
    }

    function selectUser(chosen){
        selected = chosen;
        searchResults = [];
        searchModal = false; 
    }
    function resetAddUserInput () {
        searchInput = "";
        searchResults = [];
    }

    async function searchClient() {
        searchResults = [];
        const qOne = query(collection(db, 'clientinfo'), where("firstname", "==", searchInput));
        const querySnapshotOne = await getDocs(qOne);
        querySnapshotOne.forEach((doc) => {
            searchResultOne = querySnapshotOne.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        });
        const qTwo = query(collection(db, "clientinfo"), where("lastname", "==", searchInput));
        const querySnapshotTwo = await getDocs(qTwo);
        querySnapshotTwo.forEach((doc) => {
            searchResultTwo = querySnapshotTwo.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        });
        const qThree = query(collection(db, "clientinfo"), where("clientNumber", "==", searchInput));
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

            <form class="relative bg-white rounded-lg shadow dark:bg-gray-700" on:submit={searchClient}>
                <!-- Modal header -->
                <div class="flex justify-center items-center p-4 rounded-t border-b dark:border-gray-600 gap-6">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Search  
                    </h3>
                    <input type="search" bind:value={searchInput} class="w-full border-0 border-b-2">
                </div>

                <!-- table -->
                <div>
                    <table class=" table w-full overflow-y-auto">
                        <thead>
                            <th>Client Number</th>
                            <th>Full Name</th>
                        </thead>
                        {#each searchResults as searchResult }    
                        <tr class="hover cursor-pointer" on:click={() => selectUser(searchResult)}>
                            <td>{searchResult.clientNumber}</td>
                            <td>{searchResult.firstname + " " + searchResult.lastname}</td>
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
            <!-- Modal body -->
            <div class="overflow-y-auto h-full bg-white">
                <!-- table div -->
                
            </div>
        </div>
    </div>