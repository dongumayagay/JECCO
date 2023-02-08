<script>
  import {goto} from '$app/navigation'
  import {auth} from '$lib/firebase/client.js'
  import {signOut} from 'firebase/auth'

  async function logout(){
      await signOut(auth)
      await goto('/')
  }

  let isDropdownOpen = false 

  const handleDropdownClick = () => {
  isDropdownOpen = !isDropdownOpen 
}

const handleDropdownFocusLoss = ({ relatedTarget, currentTarget }) => {
  if (relatedTarget instanceof HTMLElement && currentTarget.contains(relatedTarget)) return 
  isDropdownOpen = false
}


let isDropdownOpent = false 

const handleDropdownClickt = () => {
isDropdownOpent = !isDropdownOpent
}

const handleDropdownFocusLosst = ({ relatedTarget, currentTarget }) => {
if (relatedTarget instanceof HTMLElement && currentTarget.contains(relatedTarget)) return 
isDropdownOpent = false
}
  
</script>

  <div class="fixed flex flex-col top-0 left-0 w-64 h-screen bg-white">
    <div class="flex pt-4 h-14 border-b">
      <div><a href="/kanrisha" class="flex items-center pl-2.5 mb-5">
        <span class="self-center text-xl font-semibold whitespace-nowrap">Admin</span>
     </a></div>
    </div>
    <div class="overflow-y-auto overflow-x-hidden flex-grow">
      <div class="flex flex-col py-4 space-y-1">
          <a href="/kanrisha" class=" flex items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500">
            <span class="inline-flex justify-center items-center ml-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
             </svg>
            </span>
            <span class="ml-2 text-sm tracking-wide truncate">General Reports</span>
          </a>

          <div class=" dropdown " on:focusout={handleDropdownFocusLoss}>
            <button class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 w-full" on:click={handleDropdownClick} >
              <span class="inline-flex justify-center items-center ml-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
              </span>
              <span class="ml-2 text-sm tracking-wide truncate">Client Management</span>
              <svg sidebar-toggle-item class="absolute right-4 w-6 h-6 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>

            <ul class=" dropdown-content menu p-2 bg-gray-200 w-full" style:visibility={isDropdownOpen ? 'visible' : 'hidden'}>
              <li><a href="/kanrisha/clientmanage/clientprof">Client Profile</a></li>
              <li><a href="/kanrisha/clientmanage/inquiries">Inquiries</a></li>
              <li><a href="/kanrisha/clientmanage/client_arrangement">Client Arrangement</a></li>
            </ul>
          </div>

          <a href="/kanrisha/employeesprof" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
            <span class="inline-flex justify-center items-center ml-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </span>
            <span class="ml-2 text-sm tracking-wide truncate">Employee Profile</span>
          </a>
      
          <div class=" dropdown w-full" on:focusout={handleDropdownFocusLosst}>
              <button class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 w-full" on:click={handleDropdownClickt} >
                <span class="inline-flex justify-center items-center ml-4">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                </span>
                <span class="ml-2 text-sm tracking-wide truncate">Transactions</span>
                <svg sidebar-toggle-item class="absolute right-4 w-6 h-6 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              </button>
              <ul class=" dropdown-content menu p-2 bg-gray-200 w-full" style:visibility={isDropdownOpent ? 'visible' : 'hidden'}>
                <li><a href="/kanrisha/transactions/loan_processing">Loan Processing</a></li>
                <li><a href="/kanrisha/transactions/payments">Payments</a></li>
              </ul>
          </div>

            <a href="/kanrisha/systemad/users" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
              <span class="inline-flex justify-center items-center ml-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
              </span>
              <span class="ml-2 text-sm tracking-wide truncate">Admin User</span>
            </a>
            
        <!-- logout hiwalay ko lang --> 
          <button class="absolute bottom-0 left-0 flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent" on:click={logout}>
            <span class="inline-flex justify-center items-center ml-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            </span>
            <span class=" ml-2 text-sm tracking-wide truncate">Logout</span>
          </button>
       
      </div>

    </div>
  </div>