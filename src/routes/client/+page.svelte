<!-- <script>
	import Navbar from './Navbar.svelte'
	import Sidebar from './Sidebar.svelte'

	let open = false
</script>

<Sidebar bind:open/>
<Navbar bind:sidebar={open}/>

<svelte:head>
	<link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet"/>
</svelte:head> -->
<script>
	import Sidebar from './Sidebar.svelte'

	let open = false

	

</script>

	<nav>
	 <button on:click={()=>{open=true}}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
		<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
	  </svg>
	   </button>
	</nav>

<main>
	Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis reprehenderit maiores molestias asperiores dolores debitis velit provident natus hic, voluptas sit odit fuga nostrum harum sapiente. A, mollitia vero. Maiores.



</main>

{#if open}
	<Sidebar bind:open/>
{/if}