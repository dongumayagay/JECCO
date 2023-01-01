<script>
    /** @type {import('./$types').PageData} */
    export let data; 

    const {inquiryId} = data
    console.log(inquiryId)
</script>

<a href="/admin/clientmanage/inquiries/"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
  </a>


<div class="overflow-x-auto relative shadow-md sm:rounded-lg h-full bg-white mt-4">

    <h1 class="p-4" >{inquiryId}</h1>

</div>