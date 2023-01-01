<script>
    import { addDoc, collection } from 'firebase/firestore';
    import { getStorage, ref, uploadBytes } from "firebase/storage";
	import { db } from '$lib/firebase/client';
	import { goto } from '$app/navigation';
 
    
    let applicant = {
		firstname: '',
		lastname: '',
		email: '',
		number: '',
		address: '',
	};

    let filesToUpload = []

    async function submitHandler() {

        try {

			const inquiryRef = await addDoc(collection(db, 'inquiries'), {
					firstname: applicant.firstname,
					lastname: applicant.lastname,
					email: applicant.email,
					number: applicant.number,
					address: applicant.address
				});

			const uploadFiles = filesToUpload.map((value)=>{
                const pathName = 'inquiries/' + inquiryRef.id + '/' + value.fileName + '.' + value.fileList[0].type.split('/')[1]
                const storageRef = ref(storage, pathName);
                 uploadBytes(storageRef, value.fileList[0])
                
            })

                alert('Application Submitted');
				await goto('/');
			} catch (error) {
				console.log(error);
				alert('Error sending Application');
			}
    }

    const storage = getStorage();

    function changeHandler(file, fileId){

        const result = filesToUpload.find((item)=>item.fileList[0] === file[0])
            if(result){
                result.file = file

            }
            else{
            
            filesToUpload = [...filesToUpload, {
            fileList: file, 
            fileName: fileId,

            }]

            }

            console.log(filesToUpload)
        
    }



</script>



<main class="h-full grid place-items-center bg-gray-100">
    <div class=" flex flex-col p-4 rounded-lg bg-white w-full max-w-lg h-fit shadow ">
	<form class=" form-control gap-4" on:submit|preventDefault={submitHandler}>
		<h1 class="font-bold text-lg">Application Form</h1>
        <div class=" grid grid-cols-2 gap-4">
		<input class=" rounded-lg" type="text" bind:value={applicant.firstname} placeholder="Firstname" required />
		<input class=" rounded-lg" type="text" bind:value={applicant.lastname} placeholder="Lastname"  required />
        <input class=" rounded-lg" type="email" bind:value={applicant.email} placeholder="Email"  required />
        <input class=" rounded-lg" type="text" bind:value={applicant.number} placeholder="Number"  required />
        <input class=" rounded-lg" type="text" bind:value={applicant.address} placeholder="Address"  required />
        </div>
    <div class=" rounded-lg flex flex-col gap-2 p-2 bg-white border border-zinc-500">
        <label class=" font-extralight text-zinc-700" for="clearance">Brgy. Clearance</label>
        <input class=" file-input file-input-xs " id="clearance" type="file" accept=".jpg, .jpeg, .png, .svg, .webp" on:change={(event)=>changeHandler(event.target.files, 'BrgyClearance')}/>
    </div>
    <div class=" rounded-lg flex flex-col gap-2 p-2 bg-white border border-zinc-500">
        <label class="font-extralight text-zinc-700" for="clearance">Business permit</label>
        <input class=" file-input file-input-xs " id="clearance" type="file" accept=".jpg, .jpeg, .png, .svg, .webp" on:change={(event)=>changeHandler(event.target.files, 'BusinessPermit')}/>                       
    </div>
    <div class=" rounded-lg flex flex-col gap-2 p-2 bg-white border border-zinc-500">
        <label class="font-extralight text-zinc-700" for="clearance">Proof of Billing</label>
        <input class=" file-input file-input-xs " id="clearance" type="file" accept=".jpg, .jpeg, .png, .svg, .webp" on:change={(event)=>changeHandler(event.target.files, 'ProofofBilling')}/>                       
    </div>
    <div class=" rounded-lg flex flex-col gap-2 p-2 bg-white border border-zinc-500">
        <label class="font-extralight text-zinc-700" for="clearance">Copy of Valid Id</label>
        <input class=" file-input file-input-xs " id="clearance" type="file" accept=".jpg, .jpeg, .png, .svg, .webp" on:change={(event)=>changeHandler(event.target.files, 'ValidID')}/>                       
    </div>
    <div class=" rounded-lg flex flex-col gap-2 p-2 bg-white border border-zinc-500">
        <label class="font-extralight text-zinc-700" for="clearance">2x2 Picture</label>
        <input class=" file-input file-input-xs " id="clearance" type="file" accept=".jpg, .jpeg, .png, .svg, .webp" on:change={(event)=>changeHandler(event.target.files, '2x2Picture')}/>                       
    </div>
		<button class="bg-blue-500 py-2 rounded-lg text-white transition duration-200 ease-in-out hover:bg-blue-900" type="submit">Submit</button>
	</form>
    </div>
</main>
