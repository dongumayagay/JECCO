<script>
	import {goto} from '$app/navigation';
	import { collection, getDocs, onSnapshot} from "firebase/firestore";
	import { onMount } from 'svelte';
	import {db} from '$lib/firebase/client.js'
	
	let inquiries = []

	function viewInquiry(inquiryId){
		goto('/admin/clientmanage/inquiries/' + inquiryId)

	}
	
	onMount(() => {
        const unsubscribe = onSnapshot(collection(db, 'inquiries'), (querySnapshot) => {
        inquiries = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        });
        return () => unsubscribe();
        
    })

</script>

		
	<div class="overflow-x-auto relative shadow-md sm:rounded-lg h-full bg-white mt-4">
			
				<table class="table table-normal w-full bg-white ">
				  	<thead>
						
						<tr>
					 		<th>Id</th>
					  		<th>firstname</th> 
					  		<th>lastname</th> 
					  		<th>email</th> 
						  	<th>number</th>
					 		<th>address</th>
						</tr>
				 	</thead> 
					 {#each inquiries as applicant }
					 <!-- on:click={() => viewInquiry(inquiries)} -->
						<tr class="hover cursor-pointer" >
							<td>{applicant.id}</td> 
							<td>{applicant.firstname}</td> 
							<td>{applicant.lastname}</td> 
							<td>{applicant.email}</td> 
							<td>{applicant.number}</td> 
							<td>{applicant.address}</td>
						</tr>
					{/each}	
				</table>	
			</div>	