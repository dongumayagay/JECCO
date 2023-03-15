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
    import {db} from '$lib/firebase/client.js';
    import { collection, where, query, getDocs, orderBy  } from 'firebase/firestore';
    let searchResults = [];
    let searchModal = false; 
    let mergedArray = [];
    let loans = [];
    export async function getAllClients(area){
        const qOne = query(collection(db, "clientinfo"), orderBy("status", "desc"),orderBy("clientNumber", "desc"),where("barangay", "==", area), where("status", "!=", "No Loan") );
        const querySnapshot = await getDocs(qOne);
        querySnapshot.forEach((doc) => {
            searchResults = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        });

        const qTwo = query(collection(db, "loanprocess"),where("status", "==", "Ongoing"));
        const docSnapOne = await getDocs(qTwo); 
        docSnapOne.forEach((doc) => {
            loans = docSnapOne.docs.map((doc) => {
                return {
                    id:doc.id,
                    ...doc.data()
                }
            }); 
           
        });
        mergedArray = searchResults.map(item1 => {
            const item2 = loans.find(item2 => item2.owner === item1.id);
            return { ...item1, ...item2};
        });
    }
    
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
            {#if mergedArray.length != 0}
                {#each mergedArray as client}
                    <tr>
                        <td class="border border-black ">{client.firstname + " " + client.lastname}</td>
                        <td class="border border-black w-28">{client.loanNumber}</td>
                        <td class="border border-black w-28">{client.formattedDueDate}</td>
                        <td class="border border-black w-36">{client.balance}</td>
                        <td class="border border-black w-32">{client.dailyPayment}</td>
                        <td class="border border-black w-32"> </td>
                        <td class="border border-black w-32"> </td>
                        <td class="border border-black w-32">{client.arrearsPenalty}</td>
                        <td class="border border-black w-32"> </td>
                        <td class="border border-black w-32">{client.pastDue}</td>
                        <td class="border border-black w-32"> </td>
                    </tr>
                {/each}
            {/if}
        </table>   

        <div class="modal-action">    
            <button type="submit" class="btn border-transparent bg-blue-600">Generate PDF</button>
            
            <label for="viewClient" class="btn border-transparent bg-red-600">Close</label>
        </div>
    </div>
</div>