<!-- <script>
    import {db} from '$lib/firebase/client.js';
    import { collection, where, query, getDocs, orderBy  } from 'firebase/firestore';

    let searchModal = false; 
    let searchInput = "";
    let searchResults = [];
    let searchResultOne = [];
    let searchResultTwo = [];
    let searchResultThree = [];
    
    export let selected = [];

    export async function getAllClients(clientWithLoans){
        let qOne;
        if (clientWithLoans == true) {
            qOne = query(collection(db, "clientinfo"), orderBy("status", "desc"),orderBy("clientNumber", "desc"), where("status", "!=", "No Loan") );
        } else {
            qOne = query(collection(db, "clientinfo"), orderBy("clientNumber", "desc"));
        }
        const querySnapshot = await getDocs(qOne);
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

<input type="checkbox" bind:checked={searchModal} id="viewClient" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box  w-1/2">

            <form class=" bg-white rounded-lg w-full" on:submit={searchClient}>
                
                <div class="flex items-center p-4 rounded-t border-b">
                    <h3 class="text-2xl font-semibold text-gray-900">
                        Clients  
                    </h3>
                </div>

                
                    <table class="table table-compact w-full">
                        <thead>
                            <td>Client Number</td>
                            <th>Full Name</th>
                        </thead>
                        {#each searchResults as searchResult }    
                        <tr class="hover cursor-pointer" on:click={() => selectUser(searchResult)}>
                            <td>{searchResult.clientNumber}</td>
                            <td>{searchResult.firstname + " " + searchResult.lastname}</td>
                        </tr>
                        {/each}
                    </table>   

                <div class="modal-action">    
                    <button type="submit" class="btn border-transparent bg-blue-600">Generate PDF</button>
                    
                    <label for="viewClient" on:click={resetAddUserInput} class="btn border-transparent bg-red-600">Close</label>
                </div>
            </form>
        </div>
    </div> -->

<script>
    let searchModal = false; 
</script>


    <input type="checkbox" bind:checked={searchModal} id="viewClient" class="modal-toggle" />
    <div class="modal">

        <div class=" w-10/12 rounded-lg p-5 bg-white">

                
                <div class="flex items-center p-4 rounded-t border-b">
                    <h3 class="text-2xl font-semibold text-gray-900">
                        Clients  
                    </h3>
                </div>

                
                    <table class="table table-compact w-full border border-black">
                        <thead class="">
                            <td>Name</td>
                            <th>Ref</th>
                            <th>Due Date</th>
                            <th>Balance</th>
                            <th>D.I.</th>
                            <th>PR#</th>
                            <th>LP</th>
                            <th>ARR PNL</th>
                            <th>ARR PY</th>
                            <th>PAST DUE PNL</th>
                            <th>PAS DUE PY</th>
                        </thead>
                        
                        <tr>
                            <td class="border border-black ">Dela Cruz,Juan</td>
                            <td class="border border-black w-28">000013</td>
                            <td class="border border-black w-28">12023-06-02</td>
                            <td class="border border-black w-36">9360</td>
                            <td class="border border-black w-32"> </td>
                            <td class="border border-black w-32"> </td>
                            <td class="border border-black w-32"> </td>
                            <td class="border border-black w-32"> </td>
                            <td class="border border-black w-32"> </td>
                            <td class="border border-black w-32"> </td>
                            <td class="border border-black w-32"> </td>
                        </tr>
                        <tr>
                            <td class="border border-black ">Dela Cruz,Juan</td>
                            <td class="border border-black w-28">000013</td>
                            <td class="border border-black w-28">12023-06-02</td>
                            <td class="border border-black w-36">9360</td>
                            <td class="border border-black w-32"> </td>
                            <td class="border border-black w-32"> </td>
                            <td class="border border-black w-32"> </td>
                            <td class="border border-black w-32"> </td>
                            <td class="border border-black w-32"> </td>
                            <td class="border border-black w-32"> </td>
                            <td class="border border-black w-32"> </td>
                        </tr>
                        
                    </table>   

                <div class="modal-action">    
                    <button type="submit" class="btn border-transparent bg-blue-600">Generate PDF</button>
                    
                    <label for="viewClient" class="btn border-transparent bg-red-600">Close</label>
                </div>
        </div>
    </div>