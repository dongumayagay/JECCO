<script>
    import {addDoc, collection, getDoc, updateDoc, doc } from 'firebase/firestore';
	import {db} from '$lib/firebase/client.js';

    let addModal = false  
    let cliInfo = [];
    let addUserInput = {} 
    //loan ref id generator
    let totalAreas = 0 
    let ctrlNumber = "000000"
    let thisLoanNumber = ""

    export async function clienInfo(infoClient,areaLength){
        const docSnap = await getDoc(doc(db, "id_counters", "clientArrangement_counter")); 
        totalAreas = docSnap.data()
        totalAreas.count ++
        ctrlNumber = ctrlNumber + totalAreas.count.toString()
        thisLoanNumber = ctrlNumber.slice(-6)
        cliInfo = infoClient
        addUserInput = {
            areaId:thisLoanNumber,
            owner:cliInfo.id,
            seqNumber:areaLength+1,
	    }
    }

    function resetAddUserInput(){
        ctrlNumber = "000000"
		addUserInput = {
            seqNumber:'',
            areaName:'',
            areaId:thisLoanNumber,
            owner:cliInfo.id,
	    }
	}

    async function addArea(){
		try {
			const docRef = await addDoc(collection(db, "areas"), {
                seqNumber:addUserInput.seqNumber,
                areaName:addUserInput.areaName,
                areaId:addUserInput.areaId,
                owner:addUserInput.owner,
        	});
            await updateDoc(doc(db, "id_counters", "clientArrangement_counter"), {
                count: totalAreas.count
            });
		} catch (error) {
			console.log(error)
		}
		resetAddUserInput()
		addModal = false
	}
</script>

<input type="checkbox" bind:checked={addModal} id="add2" class="modal-toggle" />
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
                        <input type="text" bind:value={addUserInput.areaName} class="text-sm capitalize rounded-lg w-full p-2.5" required="">
                    </div>
                </div>
            </div>
            <div class="modal-action">
                <button type="submit" class="btn border-transparent bg-green-600">Add</button>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <label for="add2" on:click={resetAddUserInput} class="btn border-transparent bg-red-600">Cancel</label>
            </div>
        </form>
    </div>
</div>