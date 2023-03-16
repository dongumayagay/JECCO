<script>

    async function passwordResetRequest(uid,newPassword){
        
        try {
            const response = await fetch('/api/changepass',{method:'POST', body:JSON.stringify({uid,newPassword})})
            const result = await response.json()
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    function submitHandler(){
        //get the uid of User
        //generate random password
        //get the email or contact number of the user
        
        //process
        //change password
        //send new password to the user
        //

    }

</script>

    <div>


        <button class="btn" on:click={() => passwordResetRequest('B3oIQWnPQOUBgmjzFIaBNDp3yvL2', 'newclientpass123') }>Click</button>
          


        
    </div>