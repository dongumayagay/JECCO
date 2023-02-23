<script>
	import { collection, onSnapshot, query, where, orderBy, limit, doc, getDocs } from "firebase/firestore";
  import {db} from '$lib/firebase/client.js';

  let loans = []
  let transactModal = false;
  let addUserInput = {} 
  let cliInfo = [];

  async function userLoans() {
    //loans = []
    const q = query(collection(db, 'loanprocess'), where("owner", "==", addUserInput.owner), orderBy("numberOfLoan", "desc"), limit(1) );
    const docSnap = await getDocs(q);
    loans = docSnap.docs.map((doc) => {
      return {
        id:doc.id,
        ...doc.data()
      }
    });       
  }

  export async function clienInfo(infoClient){
    cliInfo = infoClient
      addUserInput = {
        owner: cliInfo.id, 
        name: cliInfo.firstname + ' ' + cliInfo.lastname,
        clientNumber: cliInfo.clientNumber,
    }
    await userLoans()
  }
</script>


<input type="checkbox" class="modal-toggle" id="payment" bind:checked={transactModal}/>
{#if transactModal && loans.length!==0}
<div class="modal">
  <div class="modal-box w-11/12 max-w-3xl">
    <h3 class="font-bold text-lg">Daily Payment</h3>
    <hr class="my-2" />
    <div class="grid grid-cols-2 mt-2 mb-2">
      <div class="font-semibold">
          <p class="my-4">Client Number:</p>
          <p class="my-4">Transaction ID:</p>
          <p class="my-4">Transaction Date:</p>
          <p class="my-4">Name:</p>
          <p class="my-4">Loan Number:</p>
      </div>
      <div>
          <input type="text" disabled bind:value={addUserInput.clientNumber} class="rounded-lg h-7 my-2">
          <input type="text" class="rounded-lg h-7 my-2">
          <input type="date" class="rounded-lg h-7 my-2">
          <input type="text" disabled bind:value={addUserInput.name} class="rounded-lg h-7 my-2">
          <input type="text" disabled bind:value={loans[0].loanNumber} class="rounded-lg h-7 my-2">
      </div>
  </div>    


  <hr class="my-2" />
  <div class="flex gap-2 w-full text-sm font-semibold">
    <p>Loan amount <input disabled bind:value={loans[0].loanAmount} class=" border border-black rounded-sm h-5 w-24"></p>
    <p>R. Date<input disabled bind:value={loans[0].releaseDate} class=" border border-black rounded-sm h-5 w-24"></p>
    <p>Due Date<input disabled bind:value={loans[0].formattedDueDate} class=" border border-black rounded-sm h-5 w-24"></p>
    <p>Loan status<input disabled bind:value={loans[0].status} class=" border border-black rounded-sm h-5 w-24"></p>
    <p>D.I<input disabled bind:value={loans[0].dailyPayment} class=" border border-black rounded-sm h-5 w-24"></p>
    <p>T. Payment<input class=" border border-black rounded-sm h-5 w-24"></p>
    <p>Balance<input class=" border border-black rounded-sm h-5 w-24"></p>
  </div>

    <hr class="my-4" />

<div class="grid grid-cols-2 mt-2 mb-2 py-2">
    <div class=" flex flex-col gap-4 font-semibold">
        <p>Pr Number: </p>
        <p class=" text-blue-400 ">PR Assigned To:</p>
        <p class=" text-blue-400 ">Collector Assigned:</p>
        <p class=" text-blue-400 ">Name:</p>
        <p>Loan Payment:</p>
        <p>Arrears Penalty Payment:</p>
        <p>Past Due Interrest Payment:</p>

    </div>
    <div class="flex flex-col gap-4 w-2/3">
        <input type="text" class=" rounded-md h-6 " label="SPL-2023001">
        <input type="text" disabled class=" bg-yellow-200 rounded-md h-6 " label="ID">
        <input type="text" disabled class=" bg-yellow-200 rounded-md h-6 ">
        <input type="text" disabled class=" bg-yellow-200 rounded-md h-6 " label="Francis Sanchez">
        <input type="text" class=" rounded-md h-6 " label="#01">
        <input type="text" class=" rounded-md h-6 " label="#01">
        <input type="text" class=" rounded-md h-6 " label="#01">
    </div>
</div>
  

    <div class="modal-action">
      <button class="btn btn-ghost bg-green-400 text-white rounded-lg hover:bg-green-300 px-8">Update</button>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <label for="payment" class="btn border-transparent bg-red-600">Cancel</label>
    </div>
  </div>
</div>
{/if}