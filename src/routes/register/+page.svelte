


<main class="h-full grid place-items-center">
	<form class=" rounded-lg bg-green-300 w-full max-w-lg h-auto flex flex-col p-4 gap-2">
		<h1 class="font-bold text-lg">Application Form</h1>
		<input class=" rounded-lg" type="text" placeholder="Firstname" required />
		<input class=" rounded-lg" type="text" placeholder="Lastname"  required />
        <input class=" rounded-lg" type="text" placeholder="Number or Email"  required />
        <input class=" rounded-lg" type="text" placeholder="Address"  required />
        <input class=" rounded-lg" type="text" placeholder="Co-maker"  required />
    <div class=" rounded-lg flex flex-col gap-2 p-2 bg-white border border-zinc-500">
        <label class="font-extralight text-zinc-700" for="clearance">Brgy. Clearance</label>
        <input id="clearance" type="file"  required />                       
    </div>
    <div class=" rounded-lg flex flex-col gap-2 p-2 bg-white border border-zinc-500">
        <label class="font-extralight text-zinc-700" for="clearance">Business permit</label>
        <input id="clearance" type="file"  required />                       
    </div>
    <div class=" rounded-lg flex flex-col gap-2 p-2 bg-white border border-zinc-500">
        <label class="font-extralight text-zinc-700" for="clearance">Proof of Billing</label>
        <input id="clearance" type="file"  required />                       
    </div>
    <div class=" rounded-lg flex flex-col gap-2 p-2 bg-white border border-zinc-500">
        <label class="font-extralight text-zinc-700" for="clearance">Copy of Valid Id</label>
        <input id="clearance" type="file"  required />                       
    </div>
    <div class=" rounded-lg flex flex-col gap-2 p-2 bg-white border border-zinc-500">
        <label class="font-extralight text-zinc-700" for="clearance">2x2 Picture</label>
        <input id="clearance" type="file"  required />                       
    </div>
		<button class="bg-blue-500 py-2 rounded-lg text-white" type="submit">Submit</button>
	</form>
</main>
