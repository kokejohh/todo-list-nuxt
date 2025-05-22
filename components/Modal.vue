<template>
  <dialog id="modal_edit" class="modal" ref="modalRef">
    <div class="modal-box bg-base-200 w-80">
      <fieldset class="fieldset bg-base-300 border-base-300 w-60 rounded-box border p-4 mx-auto">
        <legend class="fieldset-legend">Edit Task</legend>
        <textarea v-model="detail" class="text-lg w-full min-h-50"></textarea>
      </fieldset>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn">Close</button>
          <button class="btn btn-primary">Save</button>
        </form>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">

const props = defineProps({
  task: Object
});

const modalRef = ref<HTMLDialogElement | null>(null);
const isModalOpen = ref<boolean>(false);
const detail = ref<string>('');

onMounted(() => {
  const dialog = modalRef.value;
  if (dialog) {
    const observer = new MutationObserver(() => {
      isModalOpen.value = dialog.open;
    });
    observer.observe(dialog, { attributes: true, attributeFilter: ['open'] });
  }
  watch(isModalOpen, () => {
    if (isModalOpen.value) {
      detail.value = props.task?.detail;
    }
  })
});
</script>