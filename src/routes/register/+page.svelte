<script>
    import { addDoc, collection } from 'firebase/firestore';
    import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
	import { db, storage } from '$lib/firebase/client';
	import { goto } from '$app/navigation';
 
    
    let applicant = {
		firstname: '',
		lastname: '',
		email: '',
		number: ''
	};

    let filesToUpload = []

    async function submitHandler() {

        try {

			const inquiryRef = await addDoc(collection(db, 'inquiries'), {
					firstname: applicant.firstname,
					lastname: applicant.lastname,
					email: applicant.email,
					number: applicant.number
				});

			    const uploadFiles = filesToUpload.map((value)=>{
                const pathName = 'inquiries/' + inquiryRef.id + '/' + value.fileName + '.' + value.fileList[0].type.split('/')[1]
                const storageRef = ref(storage, pathName);
                 uploadBytes(storageRef, value.fileList[0])
                
            })

                alert('Application Submitted');
				await goto('/');
			} catch (error) {
				alert('Error sending Application');
			}
    }

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
        
    }

    async function getDownloadLink(){
        const pathName = 'applicationForm/Sanchez-AceForm.pdf' 
        const pathReference = ref(storage, pathName);

         const downloadApp = await getDownloadURL(pathReference);
         
         return downloadApp;
        
    }

</script>


<main class="h-screen grid place-items-center bg-gray-100">
    <div class=" flex flex-col p-4 rounded-lg bg-white w-full max-w-3xl h-fit shadow ">
	<form class=" form-control gap-10" on:submit|preventDefault={submitHandler}>
		<h1 class="font-bold text-2xl">Apply Now </h1>
        
        <div class=" grid grid-cols-2 gap-10">
		<input class=" rounded-lg" type="text" bind:value={applicant.firstname} placeholder="Firstname" required />
		<input class=" rounded-lg" type="text" bind:value={applicant.lastname} placeholder="Lastname"  required />
        <input class=" rounded-lg" type="email" bind:value={applicant.email} placeholder="Email"  required />
        <input class=" rounded-lg" type="text" bind:value={applicant.number} placeholder="Number" pattern="[0-9]+"  required />
        <div>
        <!-- svelte-ignore a11y-missing-attribute -->
        {#await getDownloadLink()}
            <p>Loading....</p>
        {:then downloadApp}
        <a href={downloadApp} class=" text-blue-500 underline" rel="noreferrer" target="_blank" download>Download</a> the Application form here.
        {/await}

        </div>
        </div>
        <input class=" file-input file-input-xs " id="clearance" type="file" accept=".pdf" on:change={(event)=>changeHandler(event.target.files, 'ApplicationForm')} required />
    
   
		<button class="bg-blue-500 py-2 rounded-lg text-white transition duration-200 ease-in-out hover:bg-blue-900" type="submit">Submit</button>
	</form>
    </div>
</main>
