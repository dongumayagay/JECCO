<script>
  import {goto} from '$app/navigation'
  import {auth} from '$lib/firebase/client.js'
  import {signOut} from 'firebase/auth'
  import {userStore} from '$lib/store.js'

  async function logout(){
      await signOut(auth)
      await goto('/')
  }
  
</script>

<aside class="flex flex-col bg-white shadow-md">

  <div class="flex w-full items-center h-14 m-1">
    <div>
        {#if $userStore}
          <a href="/kanrisha" class="flex items-center pl-3">
            <span class="self-center text-xl font-semibold whitespace-nowrap truncate">Admin {$userStore.displayName} </span>
          </a>
        {/if}
    </div>
  </div>

  <hr/>
    <div class="flex flex-col w-full h-full items-center">
      <div class="overflow-y-auto overflow-x-hidden">
          <a href="/kanrisha" class=" flex items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500">
            <span class="inline-flex justify-center items-center ml-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
             </svg>
            </span>
            <span class="ml-2 text-sm tracking-wide truncate">Dashboard</span>
          </a>
            
          <div class="collapse collapse-arrow rounded-md hover:bg-gray-50 ">
            <input class="w-full" type="checkbox" /> 
            <div class=" flex items-center collapse-title">
              <span class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
              </span>
              <span class="ml-2 text-sm tracking-wide truncate">Client Management</span>
            </div>
            <div class="flex flex-col collapse-content px-0 py-0 bg-gray-200 active h-full" style="padding-bottom: 0px;"> 
              <a class=" hover:bg-gray-300 p-3" href="/kanrisha/clientmanage/clientprof">Client Profile</a>
              <a class=" hover:bg-gray-300 p-3" href="/kanrisha/clientmanage/inquiries">Inquiries</a>
              <a class=" hover:bg-gray-300 p-3" href="/kanrisha/clientmanage/client_arrangement">Client Arrangement</a>
            </div>
          </div>
          
          <a href="/kanrisha/employeesprof" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
            <span class="inline-flex justify-center items-center ml-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </span>
            <span class="ml-2 text-sm tracking-wide truncate">Employee Profile</span>
          </a>
          <div class="collapse collapse-arrow rounded-md hover:bg-gray-50">
            <input class="w-full " type="checkbox" /> 
            <div class=" flex items-center collapse-title ">
              <span class="inline-flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>                
              </span>
              <span class="ml-2 text-sm tracking-wide truncate">Transactions</span>
            </div>
            <div class="flex flex-col px-0 py-0 collapse-content bg-gray-200" style=" padding-bottom: 0px"> 
              <a class=" hover:bg-gray-400 active:bg-gray-500 p-3" href="/kanrisha/transactions/loan_processing">Loan Processing</a>
              <a class=" hover:bg-gray-400 active:bg-gray-500 p-3" href="/kanrisha/transactions/payments">Payments</a>
              <a class=" hover:bg-gray-400 active:bg-gray-500 p-3" href="https://dashboard.paymongo.com/links" target="_blank" rel="noreferrer">Online Payments</a>
            </div>
          </div>
            <a href="/kanrisha/systemad/users" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
              <span class="inline-flex justify-center items-center ml-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
              </span>
              <span class="ml-2 text-sm tracking-wide truncate">Admin User</span>
            </a>
            
        <!-- logout --> 
          <button class="absolute bottom-0 left-0 flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent" on:click={logout}>
            <span class="inline-flex justify-center items-center ml-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            </span>
            <span class=" ml-2 text-sm tracking-wide truncate">Logout</span>
          </button>
       
      </div>

    </div>
</aside>