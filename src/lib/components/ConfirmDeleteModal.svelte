<script>
    export let showModal;
    export let onConfirm;
    export let onCancel;
  </script>


<div class="fixed inset-0 z-50 overflow-auto bg-smoke-light flex" style="background-color: rgba(0,0,0,0.4)" class:invisible={!showModal}>
  <div class="relative p-8 bg-white w-full max-w-md m-auto flex-col flex justify-center gap-10 rounded-lg transition-all transform" style="transform: translateY(-50%)">
    <div class="text-lg mb-2"> <span>Are you sure you want to delete this profile?</span></div>
        <div class="flex justify-end gap-4">
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" on:click={onConfirm}> Yes </button>
            <button class="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded" on:click={onCancel}> No </button>
        </div>
  </div>
</div>