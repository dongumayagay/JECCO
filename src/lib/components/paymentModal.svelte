<script>
	import { collection, updateDoc, query, where, orderBy, limit, doc, getDocs, addDoc, getDoc } from "firebase/firestore";
  import {db} from '$lib/firebase/client.js';

  let loans = [];
  let transactModal = false;
  let addUserInput = {};
  let cliInfo = [];
  let paymentCounter
  let ctrlNumber = "000000"
  let transactionId = ''
  let canPay = false
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

    let payments = []
    const today = new Date();
    const startOfDay = `${today.getFullYear()}-${("0" + (today.getMonth() + 1)).slice(-2)}-${("0" + today.getDate()).slice(-2)}`
    const qTwo = query(collection(db, "payments"), where("owner", "==", addUserInput.owner), where("transactionDate", "==", startOfDay));
    const docSnapTwo = await getDocs(qTwo); 
    docSnapTwo.forEach((doc) => {
      payments = docSnapTwo.docs.map((doc) => {
          return {
              id:doc.id,
              ...doc.data()
          }
      }); 
    });
    if (payments.length != 0) { 
      canPay = false
    }else{
      canPay = true
    }

  }

  export async function clienInfo(infoClient){
    ctrlNumber = "000000"
    if (infoClient.length != 0) {
      const docSnap = await getDoc(doc(db, "id_counters", "payments_counter")); 
      paymentCounter = docSnap.data()
      paymentCounter.count ++
      ctrlNumber = ctrlNumber + paymentCounter.count.toString()
      transactionId = ctrlNumber.slice(-6)
      cliInfo = infoClient
      addUserInput = {
        owner: cliInfo.id, 
        name: cliInfo.firstname + ' ' + cliInfo.lastname,
        clientNumber: cliInfo.clientNumber,
        transactionId: transactionId
      }
      await userLoans()
    } else{
      loans = [1]
    }
  }

  async function resetAddUserInput(stay){
    ctrlNumber = "000000"
    if(stay == true){
      const docSnap = await getDoc(doc(db, "id_counters", "payments_counter")); 
      paymentCounter = docSnap.data()
      paymentCounter.count ++
      ctrlNumber = ctrlNumber + paymentCounter.count.toString()
      transactionId = ctrlNumber.slice(-6)
      addUserInput.transactionId = transactionId
      addUserInput.prNumber = ''
      addUserInput.loanPayment = ''
      addUserInput.arrearsPayment = ''
      addUserInput.pastDuePayment = ''
      await userLoans()
    }
    if (stay == undefined) {
      addUserInput = {
        transactionDate: '',
        prNumber: '',
        loanPayment: '',
        arrearsPayment: '',
        pastDuePayment: '',
      }
      transactModal = false;
    }
  } 

  async function addPayment(){
    if (addUserInput.loanPayment == undefined) {
      addUserInput.loanPayment = 0
    }
    if (addUserInput.arrearsPayment == undefined) {
      addUserInput.arrearsPayment = 0
    }
    if (addUserInput.pastDuePayment == undefined) {
      addUserInput.pastDuePayment = 0
    }
    const arrearsMultiplier = addUserInput.arrearsPayment /  loans[0].dailyPayment
    const arrearMultiplierInt = parseInt(arrearsMultiplier)
    let totalPaid
    if (addUserInput.pastDuePayment == 0) {
      totalPaid = addUserInput.loanPayment + (loans[0].dailyPayment * arrearMultiplierInt)
    } else {
      totalPaid = addUserInput.loanPayment + (loans[0].dailyPayment * arrearMultiplierInt) + addUserInput.pastDuePayment
    }
		try {
			const docRef = await addDoc(collection(db, "payments"), {
        owner: addUserInput.owner,
        transactionId: addUserInput.transactionId,
        transactionDate: addUserInput.transactionDate,
        prNumber: addUserInput.prNumber,
        loanPayment: addUserInput.loanPayment,
        arrearsPayment: addUserInput.arrearsPayment,
        pastDuePayment: addUserInput.pastDuePayment
      });
      await updateDoc(doc(db, "id_counters", "payments_counter"), {
        count: paymentCounter.count
      })
      await updateDoc(doc(db, 'loanprocess', loans[0].id),{
        balance: loans[0].balance - addUserInput.loanPayment,
        totalPayment: loans[0].totalPayment + totalPaid,
        arrearsPenalty: loans[0].arrearsPenalty - addUserInput.arrearsPayment,
        pastDue: loans[0].pastDue - addUserInput.pastDuePayment
      });
		} catch (error) {
			console.log(error)
		}
    alert('Payment Transanction Saved');
    const stay = true;
    resetAddUserInput(stay);
  }

  async function searchClient() {
    let whereclient
    if (addUserInput.clientNumber != "") {
      if (addUserInput.clientNumber.length == 6 ) {
        whereclient = "SPL2023"+ addUserInput.clientNumber;
      }else {
        whereclient = addUserInput.clientNumber;
      }
      const q = query(collection(db, "clientinfo"), where("clientNumber", "==", whereclient));
      const querySnapshot = await getDocs(q);
      const client = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      clienInfo(client[0])
    }
  }

</script>


<input type="checkbox" class="modal-toggle" id="payment" bind:checked={transactModal}/>
{#if transactModal && loans.length!==0}
<div class="modal">
  <form class="relative rounded-lg shadow" on:submit={addPayment}>
  <div class="modal-box w-full max-w-3xl">
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
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <label for="searching" on:click={searchClient} class=" btn btn-sm">Search</label>
          <input type="text" bind:value={addUserInput.clientNumber} class="rounded-lg h-7 my-2">
          <input type="text" disabled bind:value={addUserInput.transactionId} class="rounded-lg h-7 my-2">
          <input type="date" bind:value={addUserInput.transactionDate} class="rounded-lg h-7 my-2">
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
      <p>T. Payment<input disabled bind:value={loans[0].totalPayment} class=" border border-black rounded-sm h-5 w-24"></p>
      <p>Balance<input disabled bind:value={loans[0].balance} class=" border border-black rounded-sm h-5 w-24"></p>
      
    </div>
    <div class="flex gap-2 w-24 text-sm font-semibold">
      
      <p>Arrears Penalty<input disabled bind:value={loans[0].arrearsPenalty} class=" border border-black rounded-sm h-5 w-24"></p>
      <p>Past Due<input disabled bind:value={loans[0].pastDue} class=" border border-black rounded-sm h-5 w-24"></p>
    </div>

    <hr class="my-4" />

    <div class="grid grid-cols-2 mt-2 mb-2 py-2">
        <div class=" flex flex-col gap-4 font-semibold">
            <p>Pr Number: </p>
            <p class=" text-blue-400 ">PR Assigned To:</p>
            <p class=" text-blue-400 ">Collector Assigned:</p>
            <p>Loan Payment:</p>
            <p>Arrears Penalty Payment:</p>
            <p>Past Due Interrest Payment:</p>

        </div>
        <div class="flex flex-col gap-4 w-2/3">
            <input type="text" bind:value={addUserInput.prNumber} class=" rounded-md h-6 " label="SPL-2023001">
            <input type="text" disabled bind:value={loans[0].collectorAssigned} class=" bg-yellow-200 rounded-md h-6 " label="ID">
            <input type="text" disabled bind:value={loans[0].collectorAssigned} class=" bg-yellow-200 rounded-md h-6 ">
            <input type="number" bind:value={addUserInput.loanPayment} class=" rounded-md h-6 " label="#01">
            <input type="number" bind:value={addUserInput.arrearsPayment} class=" rounded-md h-6 " label="#01">
            <input type="number" bind:value={addUserInput.pastDuePayment} class=" rounded-md h-6 " label="#01">
        </div>
    </div>
  

    <div class="modal-action">
      <button type="submit" disabled={!canPay} class="btn btn-ghost bg-green-400 text-white rounded-lg hover:bg-green-300 px-8">Add</button>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <label for="payment" on:click={resetAddUserInput} class="btn border-transparent bg-red-600">Cancel</label>
    </div>
  </div>
  </form>
</div>
{/if}