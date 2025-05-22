<template>

  <dialog id="my_modal_1" class="modal" ref="modalRef">
    <div class="modal-box bg-base-300 w-96 h-96">
      <fieldset class="fieldset bg-base-300 border-base-300 rounded-box border p-4 mx-auto">
        <legend class="fieldset-legend">Edit Task</legend>
        <textarea v-model="detail" class="text-lg min-h-48 w-full"></textarea>
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