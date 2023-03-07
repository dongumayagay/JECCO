<script>
  import {userStore} from '$lib/store.js'
  import { doc, getDoc } from 'firebase/firestore';
  import {db} from '$lib/firebase/client.js';

  let clientData = [];

  async function getClient() {
    const userId = $userStore.uid;
    const clientRef = doc(db, "clientinfo", userId);
    const clientSnapshot = await getDoc(clientRef);

    if (clientSnapshot.exists()) {
       clientData = clientSnapshot.data();
      return clientData;
    } else {
      alert("No Document Found");
    }
  }

  getClient();
  
</script>

<svelte:head>
	<title>JEM | Client Dashboard</title>
</svelte:head>


  
  <section class="flex flex-col h-screen bg-white rounded-lg" >
    <!-- <h1 class="p-5 font-bold text-xl">Client Dashboard</h1>
    <hr/> -->
    <div class=" flex flex-col w-full p-2 gapx-6">
      <div class="flex w-full h-14 items-center">
        {#if $userStore }
        <h2 class="font-semibold text-xl pl-6 max-sm:text-lg">{$userStore.displayName}</h2>
        {/if}
        <span class="font-semibold text-xl pl-2 max-sm:text-lg">({clientData.clientNumber})</span>        
      </div>
      <hr/>
      <div class=" flex flex-col w-full h-32 p-6 mt-3 rounded-md gap-4 max-sm:gap-2 font-semibold justify-center shadow-md">
          <span>Email: {clientData.email}</span>
          <span>Address: {clientData.houseNo + ', ' + clientData.barangay + ', ' + clientData.municipality + ', ' + clientData.province}</span>
          <span>Loan Status: {clientData.status}</span>
      </div>
    </div>

    <div class="flex items-center justify-center mt-3">
      <img src="/finance.gif" alt="">

    </div>
  </section>