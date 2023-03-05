<script>
	import {goto} from '$app/navigation';
	import { collection, onSnapshot, orderBy, query, updateDoc, doc, deleteDoc} from "firebase/firestore";
	import { onMount } from 'svelte';
	import {db} from '$lib/firebase/client.js';
	import ConfirmDeleteModal from '$lib/components/ConfirmDeleteModal.svelte';

	let inquiries = []
	let showModal = false;
    let deleteSuccess = false;
    let idToDelete;
	
	function viewInquiry(inquiryId){
		goto('/kanrisha/clientmanage/inquiries/' + inquiryId)
	}

	onMount(() => {
		const q = query(collection(db, 'inquiries'), orderBy("inquiryNum", "desc") );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
        inquiries = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        });
        return () => unsubscribe();
        
    })

	function editOption(event) {
		event.stopPropagation();
  }

  async function inquiryRead(inquiryId){
	await updateDoc(doc(db, 'inquiries', inquiryId),{
        isRead: true,
      });
  }

  async function deleteInquiry(id){
        await deleteDoc(doc(db, "inquiries", id));
    }
	
	function confirmDelete() {
        showModal = true;
    }

    function handleConfirm() {
        deleteInquiry(idToDelete);
        showModal = false;
    }

    function handleCancel() {
        showModal = false;
    }
</script>
		
<svelte:head>
	<title>JEM | Applications</title>
</svelte:head>

	<div class="flex items-center p-4 shadow-md rounded-md h-12 bg-white gap-4">
		<h1 class="left-0 pr-10 text-xl font-semibold">Applications</h1>
	</div>

	<div class="overflow-x-auto relative shadow-md rounded-lg h-full bg-white mt-4">
		
		<table class="table table-compact w-full bg-white ">
		  	<thead>				
				<tr>
					<th scope="col" class="px-6 bg-stone-300"></th>
			  		<th class="bg-stone-300">firstname</th> 
			  		<th class="bg-stone-300">email</th> 
				  	<th class="bg-stone-300">number</th>
			 		<!-- <th>address</th> -->
				</tr>
		 	</thead> 
			{#each inquiries as applicant }		
				<tr class="{applicant.isRead ? 'bg-gray-100' : 'bg-white font-bold '} cursor-pointer hover:bg-sky-200" on:click={() => viewInquiry(applicant.id)} on:click={inquiryRead(applicant.id)}>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<td class="flex px-4" on:click={editOption}>
						<div  class="flex items-center space-x-2 text-sm">
							<div class="dropdown">
								<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
								<label for='' tabindex="0" class="flex items-center justify-between px-2 text-sm font-medium leading-5 rounded-lg text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Delete">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" fill="currentColor" class="w-5 h-5">
										<path d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clip-rule="evenodd" />
									</svg>
								</label>
								<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
								<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-38 text-black">
									<!-- svelte-ignore a11y-click-events-have-key-events -->
									<li><button on:click={() => {idToDelete = applicant.id, confirmDelete(); }}>Delete</button></li>
								</ul>
							</div>
						</div>  
						<span class="{applicant.isRead ? 'hidden' : 'text-red-500'} font-bold mr-2">New</span>
					</td>
					<td>{applicant.firstname + '  ' + applicant.lastname}</td> 
					<td>{applicant.email}</td> 
					<td>{applicant.number}</td> 
				</tr>
			{/each}	
		</table>	
	</div>	

	<ConfirmDeleteModal showModal={showModal}
	onConfirm={handleConfirm}
	onCancel={handleCancel}/>