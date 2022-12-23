<script>
    /** @type {import('./$types').PageData} */
    export let data; 

    const {inquiryId} = data
    console.log(inquiryId)
</script>

<a href="/admin/clientmanage/inquiries/">Back</a>
<h1>{inquiryId}</h1>
