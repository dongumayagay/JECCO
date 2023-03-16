<script>
    import { updateDoc, doc } from 'firebase/firestore';
	import {db} from '$lib/firebase/client.js';

    let editModal = false  
    let areaInfo = [];
    let addUserInput = {} 

    export async function clientInfo(infoArea){
        areaInfo = infoArea
        addUserInput = {
            areaId:areaInfo.areaId,
            owner:areaInfo.owner,
            seqNumber:areaInfo.seqNumber,
            areaName:areaInfo.areaName
	    }
    }

    function resetAddUserInput(){
		addUserInput = {
            areaId:areaInfo.areaId,
            owner:areaInfo.owner,
            seqNumber:areaInfo.seqNumber,
            areaName:areaInfo.areaName
	    }
	}

    async function addArea(){
		try {
			const docRef = await updateDoc(doc(db, "areas", areaInfo.id), {
                seqNumber:addUserInput.seqNumber,
                areaName:addUserInput.areaName,
                areaId:addUserInput.areaId,
                owner:addUserInput.owner,
        	});
		} catch (error) {
			console.log(error)
		}
		resetAddUserInput()
		editModal = false
	}
</script>

<input type="checkbox" bind:checked={editModal} id="edit" class="modal-toggle" />
<div class="modal">
    <div class="modal-box max-w-5xl overflow-y-auto">
        <!-- Modal -->
        <form class="relative bg-white rounded-lg shadow" on:submit={addArea}>
            <!-- Modal header -->
            <div class="flex justify-between items-start p-4 rounded-t border-b ">
                <h3 class="text-xl font-semibold  ">
                    Add 
                </h3>
            </div>
            <!-- Modal body -->
            <div class="p-6 space-y-6">
                <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-3">
                        <label for="first-name" class="block mb-2 text-sm font-medium  ">Area Id</label>
                        <input type="text" disabled bind:value={addUserInput.areaId} class="text-sm rounded-lg w-full p-2.5" required="">
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="first-name" class="block mb-2 text-sm font-medium  ">SEQ#</label>
                        <input type="text" disabled bind:value={addUserInput.seqNumber} class="text-sm rounded-lg w-full p-2.5" required="">
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="first-name" class="block mb-2 text-sm font-medium  ">Area Name</label>
                        <input type="text" bind:value={addUserInput.areaName} class="text-sm capitalize rounded-lg w-full p-2.5" placeholder="Cuyab" required="">
                    </div>
                </div>
            </div>
            <div class="modal-action">
                <button type="submit" class="btn border-transparent bg-green-600">Save</button>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <label for="edit" on:click={resetAddUserInput} class="btn border-transparent bg-red-600">Cancel</label>
            </div>
        </form>
    </div>
</div>