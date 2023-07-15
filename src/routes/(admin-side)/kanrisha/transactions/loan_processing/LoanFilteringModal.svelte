<script>
    import {db} from '$lib/firebase/client.js';
    import { collection, where, query, getDocs, orderBy  } from 'firebase/firestore';

    let filteringModal = false; 
    let searchInput = "";
    let searchResults = [];
    let searchResultOne = [];
    let searchResultTwo = [];
    let searchResultThree = [];
    let releaseDate;
    let dueDate;

    // export async function getAllClients(clientWithLoans){
    //     let qOne;
    //     if (clientWithLoans == true) {
    //         qOne = query(collection(db, "clientinfo"), orderBy("status", "desc"),orderBy("clientNumber", "desc"), where("status", "!=", "No Loan") );
    //     } else {
    //         qOne = query(collection(db, "clientinfo"), orderBy("clientNumber", "desc"));
    //     }
    //     const querySnapshot = await getDocs(qOne);
    //     querySnapshot.forEach((doc) => {
    //         searchResults = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    //     });
    // }

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
        const qThree = query(collection(db, "clientinfo"), where("address", "==", searchInput));
        const querySnapshotThree = await getDocs(qThree);
        querySnapshotThree.forEach((doc) => {
            searchResultThree = querySnapshotThree.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        });
        searchResults = searchResultOne.concat(searchResultTwo,searchResultThree);
        searchInput = "";
    }

</script>

<input type="checkbox" bind:checked={filteringModal} id="filter" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box  w-1/2">

            <form class=" bg-white rounded-lg w-full">
                <!-- Modal header -->
                <div class="flex justify-center items-center p-4 rounded-t">
                    <h3 class="font-semibold text-gray-900">
                        Filter by Loan Reference:
                    </h3>
                    <input type="search" bind:value={searchInput} class="w-full border-0 border-b-2">
                </div>

                <div class="flex justify-left items-center p-2 rounded-t">
                    <h3 class="text-lg font-semibold text-gray-900 px-3">
                        Release Date:
                    </h3>
                    <input type="date" bind:value={releaseDate} class="text-sm rounded-lg w-36">
                </div>
             
                <div class="flex justify-left items-center p-2 rounded-t">
                    <h3 class="text-lg font-semibold text-gray-900 px-3">
                        Due Date:
                    </h3>
                    <input type="date" bind:value={dueDate} class="text-sm rounded-lg w-36">
                </div>

                <div class="flex justify-left items-center p-2 rounded-t">
                    <h3 class="text-lg font-semibold text-gray-900 px-3">
                        Loan Status:
                    </h3>
                    <input type="radio" id="ongoing" name="loanStatus" value="ongoing">
                    <label for="ongoing" class="px-2">Ongoing</label>
                    <input type="radio" id="completed" name="loanStatus" value="completed">
                    <label for="completed" class="px-2">Completed</label>
                </div>

                <div class="modal-action">    
                    <button type="submit" class="btn border-transparent bg-blue-600">Apply</button>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <label for="filter" on:click={resetAddUserInput} class="btn border-transparent bg-red-600">Cancel</label>
                </div>
            </form>
        </div>
    </div>