<script>
    import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
    import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
	import { db, storage } from '$lib/firebase/client';
	import { goto } from '$app/navigation';
    
    let numberOfInquiries;

    
    let applicant = {
        inquiryNum: '',
		firstname: '',
		lastname: '',
		email: '',
		number: ''
	};

    let filesToUpload = []
    let errorMessage = '';

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    async function submitHandler() {

        try {
            const docSnap = await getDoc(doc(db, "id_counters", "inquiry_counter")); 
            numberOfInquiries = docSnap.data()
            numberOfInquiries.count ++

			const inquiryRef = await addDoc(collection(db, 'inquiries'), {
                    inquiryNum: numberOfInquiries.count,
					firstname: applicant.firstname.toLowerCase().split(" ").map(capitalize).join(" "),
					lastname: applicant.lastname.toLowerCase().split(" ").map(capitalize).join(" "),
					email: applicant.email,
					number: applicant.number,
                    isRead: false
				});

			    filesToUpload.map((value)=>{
                const pathName = 'inquiries/' + inquiryRef.id + '/' + value.fileName + '.' + value.fileList[0].type.split('/')[1]
                const storageRef = ref(storage, pathName);
                 uploadBytes(storageRef, value.fileList[0])
                
            })
            await updateDoc(doc(db, "id_counters", "inquiry_counter"), {
                count: numberOfInquiries.count
            })
                alert('Application Submitted');
				await goto('/');
			} catch (error) {
				alert(error);
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
        const pathName = 'applicationForm/Application-Agreement_Form.pdf' 
        const pathReference = ref(storage, pathName);

         const downloadApp = await getDownloadURL(pathReference);
         
         return downloadApp;
        
    }

        function validateInput(value) {
            const pattern = /^[a-zA-Z ]+([-]?[a-zA-Z ]+)?(\.[a-zA-Z ]+([-]?[a-zA-Z ]+)?)?$/;
            return pattern.test(value);
        }

        function handleInput(event, binding) {
            
            if (!validateInput(event.target.value)) {
                event.target.setCustomValidity('Please enter only text, 1 dot, and 1 dash');
                binding.value = '';
            } else {
                event.target.setCustomValidity('');
                binding.value = event.target.value;
            }
        }

    
    function limitInputLength(event) {
        const maxLength = 11;
        const value = event.target.value;
        const pattern = /^09\d*$/;

        if (value.length > maxLength) {
            event.target.value = applicant.number;
        }
            else if(value.length < maxLength){
                event.target.setCustomValidity('Your number is too short. (Ex. 09XX XXX XXX)');
        }
             else if (!pattern.test(value) ) {
            event.target.setCustomValidity('Input must start with "09" and only contain numbers (Ex. 09XX XXX XXX)');
        } else {
            event.target.setCustomValidity('');
            applicant.number = value;
        }
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
                    <input class=" rounded-lg capitalize" type="text" maxlength="30" minlength="2" bind:value={applicant.firstname} on:input={(event) => handleInput(event, { value: applicant.firstname })} placeholder="Firstname" required />
                    <input class=" rounded-lg capitalize" type="text" maxlength="30" minlength="2" bind:value={applicant.lastname} on:input={(event) => handleInput(event, { value: applicant.lastname })} placeholder="Lastname"  required />
                    <input class=" rounded-lg" type="email" bind:value={applicant.email} placeholder="Email" title="(ex. jecco@jemapp.com)"  required />
                    <input class=" rounded-lg" type="text" on:input={limitInputLength} bind:value={applicant.number} placeholder="Number" required />                
                    <div class="flex gap-2">
                    {#await getDownloadLink()}
                        <p>Loading...</p>
                    {:then downloadApp}
                        <div class="flex gap-2 max-sm:text-xs">
                            <!-- svelte-ignore a11y-invalid-attribute -->
                            <a href="#" on:click={() => window.open(downloadApp)} class=" text-blue-500 underline flex items-center">  Download </a>  
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
