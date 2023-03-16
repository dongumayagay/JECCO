<script>
    import {db} from '$lib/firebase/client.js';
    import { collection, where, query, getDocs, orderBy  } from 'firebase/firestore';
    import { jsPDF } from "jspdf";
    import autoTable from 'jspdf-autotable'

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

    const today = new Date();
    const options = { timeZone: 'Asia/Manila', month: 'long', day: 'numeric', year: 'numeric', };
    const philippineTime = today.toLocaleString('en-US', options);

    
    async function generateLedger(){
        const collectionLedger = new jsPDF();
        collectionLedger.text('JEMPOWERS CREDIT COPORATION', 57, 15);
        collectionLedger.text('COLLECTION FORM', 76, 29);
        collectionLedger.text(philippineTime, 83, 37);
        collectionLedger.setFontSize(11);
        collectionLedger.text('San Pedro City, Laguna', 83, 20);
        collectionLedger.autoTable({
            theme: 'grid',
            margin: {top: 45, left:3}, 
            tableWidth: 205,
            headStyles: {fontSize: 8},
            style:{fontSize: 5, item:'center'},
            html: '#collection_ledger',
        });
            window.open(collectionLedger.output('bloburl'));
            

    }
</script>


<input type="checkbox" bind:checked={searchModal} id="viewClient" class="modal-toggle" />
<div class="modal">

    <div class=" w-10/12 rounded-lg p-5 bg-white">

            
        <div class="flex items-center p-4 rounded-t border-b">
            <h3 class="text-2xl font-semibold text-gray-900">
                Area: <span></span>
            </h3>
        </div>

        <table class="table table-compact w-full border border-black" id="collection_ledger">
            <thead class="">
                <tr>
                    <td class=" flex justify-center border-black">Name</td>
                    <th class="border border-black text-center">Ref</th>
                    <th class="border border-black text-center">Due Date</th>
                    <th class="border border-black text-center">Balance</th>
                    <th class="border border-black text-center">D.I.</th>
                    <th class="border border-black text-center">PR No.</th>
                    <th class="border border-black text-center">Loan. P</th>
                    <th class="border border-black text-center">AR. PNL</th>
                    <th class="border border-black text-center">AR. PY</th>
                    <th class="border border-black text-center">P.D. PNL</th>
                    <th class="border border-black text-center">P.D. PY</th>
                </tr>
            </thead>
            {#if mergedArray.length != 0}
                {#each mergedArray as client}
                    <tr>
                        <td class="border border-black ">{client.firstname + " " + client.lastname}</td>
                        <td class="border border-black w-20">{client.loanNumber}</td>
                        <td class="border border-black w-20">{client.formattedDueDate}</td>
                        <td class="border border-black w-24">{client.balance}</td>
                        <td class="border border-black w-24">{client.dailyPayment}</td>
                        <td class="border border-black w-24"> </td>
                        <td class="border border-black w-24"> </td>
                        <td class="border border-black w-32">{client.arrearsPenalty}</td>
                        <td class="border border-black w-32"> </td>
                        <td class="border border-black w-32">{client.pastDue}</td>
                        <td class="border border-black w-32"> </td>
                    </tr>
                {/each}
            {/if}
        </table>   

        <div class="modal-action">    
            <button class="btn border-transparent bg-blue-600" on:click={generateLedger}>Generate PDF</button>
            
            <label for="viewClient" class="btn border-transparent bg-red-600">Close</label>
        </div>
    </div>
</div>