<script>
import { goto } from '$app/navigation';

    function submitHandler(){
        alert('Password reset request sent!');
        goto('/');

    }
    

</script>



<svelte:head>
	<title>JEM | Forgot Password</title>
</svelte:head>


<main class="flex h-screen justify-center items-center bg-gray-100">
    <div class=" flex rounded-lg bg-white shadow p-10">
        <form class=" form-control" on:submit|preventDefault={submitHandler}>
            <h1 class="font-bold text-2xl max-sm:text-lg mb-5">Request Reset Password</h1>
            <div class=" flex justify-center w-full" >
                <div class="flex flex-col justify-center">
                    <label for="" class="font-semibold text-lg max-sm:text-sm">Recovery Email</label>
                    <div class="flex flex-col gap-5">
                        <input class="rounded-lg w-96 max-sm:w-52" type="email" placeholder="Recovery Email" required />
                        <button class="bg-blue-500 py-2 w-96 max-sm:w-52 rounded-lg text-white transition duration-200 ease-in-out hover:bg-blue-900" type="submit">Submit</button>
                    </div>
                </div>
            
            </div>
        </form>
    </div>
</main>
