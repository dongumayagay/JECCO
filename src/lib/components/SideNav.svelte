<script>
  import {goto} from '$app/navigation'
  import {auth} from '$lib/firebase/client.js'
  import {signOut} from 'firebase/auth'
  import {userStore} from '$lib/store.js'
  import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
  import {db} from '$lib/firebase/client.js';

  let renewal = false;

  async function logout(){
      await signOut(auth)
      await goto('/')
  }

  let loans = []
	
	async function userLoans() {
        loans = []

        const q = query(collection(db, 'loanprocess'), where("owner", "==", $userStore.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            loans = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            
            if(loans[1].status !== "Ongoing"){
                 renewal = true;
            }
        });
        
        
        return () => unsubscribe();
        
    }

	userLoans();
  
  function handleClick(event) {
    if (loans[1].status === "Ongoing") {
      event.preventDefault();
    }
  }
    



</script>

<aside class="flex flex-col bg-white shadow-md">
  
  <div class="flex items-center border-b-2 p-4 max-sm:p-2">
    {#if $userStore}
    <a href="/client" class="flex items-center justify-center gap-3">
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 max-sm:w-8 max-sm:h-8">
        <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <span class="text-lg font-semibold max-sm:hidden">{$userStore.displayName}</span>
    </a>
    {/if}
  </div>

  <div class="flex flex-col w-full h-full items-center">
    <div class="overflow-y-auto overflow-x-hidden">
      <div class="flex flex-col py-4 space-y-1">
          <a href="/client/payment_history" class="relative flex items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 hover:border-indigo-500">
            <span class="flex justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
              </svg>
            </span>
            <span class="ml-2 text-sm tracking-wide max-sm:hidden">Payment History</span>
          </a>
          <a href="/client/due_date" class="relative flex items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 hover:border-indigo-500">
            <span class="flex justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
              </svg>
            </span>
            <span class="ml-2 text-sm tracking-wide max-sm:hidden">Due Dates</span>
          </a>
          <a href="/client/loans" class="relative flex items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 hover:border-indigo-500">
            <span class="flex justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
              </svg>
            </span>
            <span class="ml-2 text-sm tracking-wide max-sm:hidden">Loans</span>
          </a>
          <a href="/application" on:click={handleClick} class={renewal ? 'relative flex items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 hover:border-indigo-500' : 'relative flex items-center h-11 text-gray-200 disabled cursor-not-allowed'}>
            <span class="flex justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
              </svg>              
            </span>
            <span class="ml-2 text-sm tracking-wide max-sm:hidden">Apply Renewal</span>
          </a>
        <hr/>
        <!-- logout hiwalay ko lang --> 
          <button class="flex items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800" on:click={logout}>
            <span class="flex justify-center items-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            </span>
            <span class=" ml-2 text-sm tracking-wide max-sm:hidden">Logout</span>
          </button>
       
      </div>


    </div>
  </div>
</aside>

