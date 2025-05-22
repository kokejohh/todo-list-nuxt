<template>

<dialog id="my_modal_1" class="modal">
  <div class="modal-box bg-base-300 w-96 h-96">
    <fieldset class="fieldset bg-base-300 border-base-300 rounded-box border p-4 mx-auto">
        <legend class="fieldset-legend">Edit Task</legend>
        <textarea class="text-lg min-h-48 w-full">{{ task?.detail }}</textarea>
    </fieldset>
    <div class="modal-action">
        <button class="btn btn-primary">Edit</button>
      <form method="dialog">
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
</template>

<script setup lang="ts">
  defineProps({
    task: Object
  });
</script>