<script>
	import {goto} from '$app/navigation';
	import { collection, getDocs, onSnapshot} from "firebase/firestore";
	import { onMount } from 'svelte';
	import {db} from '$lib/firebase/client.js'
	
	let inquiries = []

	function viewInquiry(inquiryId){
		goto('/kanrisha/clientmanage/inquiries/' + inquiryId)

	}

	
	onMount(() => {
        const unsubscribe = onSnapshot(collection(db, 'inquiries'), (querySnapshot) => {
        inquiries = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        });
        return () => unsubscribe();
        
    })

	function editOption(event) {
		event.stopPropagation();
  }
	


</script>
		
	<div class="overflow-x-auto relative shadow-md rounded-lg h-full bg-white mt-4">
		<table class="table table-normal w-full bg-white ">
		  	<thead>				
				<tr>
					<th scope="col" class="px-6"></th>
			  		<th>firstname</th> 
			  		<th>email</th> 
				  	<th>number</th>
			 		<!-- <th>address</th> -->
				</tr>
		 	</thead> 
			{#each inquiries as applicant }			 
				<tr class="hover cursor-pointer" on:click={() => viewInquiry(applicant.id)}>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<td class="px-4" on:click={editOption}>
						<div  class="flex items-center space-x-2 text-sm">
							<div class="dropdown">
								<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
								<label for='' tabindex="0" class="flex items-center justify-between px-2 text-sm font-medium leading-5 rounded-lg text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Delete">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" fill="currentColor" class="w-5 h-5">
										<path d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clip-rule="evenodd" />
									</svg>
								</label>
								<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
								<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-38">
									<!-- svelte-ignore a11y-click-events-have-key-events -->
									<li><label for="update">Edit</label></li>
									<li><button>Delete</button></li>
								</ul>
							</div>
						</div>  
					</td>
					<td>{applicant.firstname + '  ' + applicant.lastname}</td> 
					<td>{applicant.email}</td> 
					<td>{applicant.number}</td> 
				</tr>
			{/each}	
		</table>	
	</div>	