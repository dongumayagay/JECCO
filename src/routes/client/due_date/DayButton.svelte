<script>
	import { getDocs, collection, query, where } from 'firebase/firestore';
	import { db } from '$lib/firebase/client';
    import {userStore} from '$lib/store.js'

	export let dayNumber;
	export let month;
	export let year;


	$: dateString = new Date(`${year}-${month}-${dayNumber}`).toLocaleDateString('fr-CA');
	
	let isThereEvent = false;

	// const showModal = () => open(Popup);

	async function checkIfExistingEvent(dateString) {
		const querySnapshot = await getDocs(
			query(collection(db, 'payments'), where('owner', '==', $userStore.uid), where('transactionDate', '==', dateString))
		);
		isThereEvent = !querySnapshot.empty;
	}
	
	$: checkIfExistingEvent(dateString);
</script>

<button class="border border-collapse aspect-video"
	class:bg-green-500={isThereEvent}
>
	{dayNumber}
</button>