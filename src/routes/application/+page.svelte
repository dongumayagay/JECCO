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
    let errorMessage = '';

    async function submitHandler() {

        try {

			const inquiryRef = await addDoc(collection(db, 'inquiries'), {
					firstname: applicant.firstname,
					lastname: applicant.lastname,
					email: applicant.email,
					number: applicant.number
				});

			    filesToUpload.map((value)=>{
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
        const fileInput = file[0];
        const fileType = fileInput.type;

        const result = filesToUpload.find((item)=>item.fileList[0] === file[0])
            if(result){
                result.file = file;
            }
            else{
            
            filesToUpload = [...filesToUpload, {
            fileList: file, 
            fileName: fileId,

            }]
        }
        
        if (fileType !== 'application/pdf') {
           errorMessage = 'Only PDF files are allowed.';
        } else {
            errorMessage = '';
        }

        if (errorMessage) {
             document.querySelector('input[type="file"]').value = '';
        }
    }  
   
    

    async function getDownloadLink(){
        const pathName = 'applicationForm/Sanchez-AceForm.pdf' 
        const pathReference = ref(storage, pathName);

         const downloadApp = await getDownloadURL(pathReference);
         
         return downloadApp;
        
    }

    
</script>

<svelte:head>
	<title>Client | Application</title>
</svelte:head>


<main class="h-screen flex justify-center items-center bg-gray-100">
    <div class=" flex rounded-lg bg-white shadow p-10">
        <form class=" form-control gap-10" on:submit|preventDefault={submitHandler}>
            <h1 class="font-bold text-2xl">Apply Now </h1>
            
                <div class=" grid grid-cols-2 gap-10 max-sm:grid-cols-1">
                    <input class=" rounded-lg" type="text" maxlength="30" minlength="2" bind:value={applicant.firstname} placeholder="Firstname" required />
                    <input class=" rounded-lg" type="text" maxlength="30" minlength="2" bind:value={applicant.lastname} placeholder="Lastname"  required />
                    <input class=" rounded-lg" type="email" bind:value={applicant.email} placeholder="Email" title="(ex. jecco@jecco.com)"  required />
                    <input class=" rounded-lg" type="text" minlength="11" maxlength="11" bind:value={applicant.number} placeholder="Number" pattern="[0-9]+" title="(ex. 09XXXXXXXXX)"  required />
                
                    <div class="flex gap-2">
                    {#await getDownloadLink()}
                        <p>Loading...</p>
                    {:then downloadApp}
                        <div class="flex gap-2 max-sm:text-xs">
                            <!-- svelte-ignore a11y-invalid-attribute -->
                            <a href="#" on:click={() => downloadApp} class=" text-blue-500 underline flex items-center" download={'Sanchez-AceForm.pdf'}>  Download </a>  
                        </div>
                    {/await}
                    <p>the application form here.</p>
                    </div>

                </div>
                <div>
                    <input class=" file-input file-input-xs " id="clearance" type="file" accept="application/pdf" on:change={(event)=>changeHandler(event.target.files, 'ApplicationForm')} required />
                    {#if errorMessage}
                        <p class="text-red-500">{errorMessage}</p>
                    {/if}
                </div>
    
            <button class="bg-blue-500 py-2 rounded-lg text-white transition duration-200 ease-in-out hover:bg-blue-900" type="submit">Submit</button>
        </form>
    </div>
</main>
