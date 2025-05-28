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
          <button class="btn btn-primary" @click="saveTask(task?.id)">Save</button>
        </form>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">

import { tasksStore, modalStore, onProcessStore } from '@/stores/todo';

const tasks = tasksStore();
const modal = modalStore();
const onProcess = onProcessStore();

const props = defineProps({
  task: Object
});

const modalRef = ref<HTMLDialogElement | null>(null);
const detail = ref<string>('');

onMounted(() => {
  modal.modalEdit = modalRef.value;
  const dialog = modal.modalEdit;
  if (dialog) {
    const observer = new MutationObserver(() => {
      if (dialog.open) {
        detail.value = props.task?.detail.trim();
      }
    });
    observer.observe(dialog, { attributes: true, attributeFilter: ['open']});
  }
});

async function saveTask(id: number) {
  const detailTxt = detail.value.trim();
  if (detailTxt === '') return;

  onProcess.is = true;
  Toast.fire({
    icon: 'info',
    title: 'editing'
  })
  try {
    await $fetch('/api/tasks/', {
      method: 'patch',
      body: {
        id,
        detail: detailTxt
      }
    });
    const index = tasks.data.findIndex((task: Task) => task.id === id);
    tasks.data[index].detail = detailTxt;
    Toast.fire({
      icon: 'success',
      title: 'edited successfully',
      timer: 3000
    })
  } catch (err) {
    Toast.fire({
      icon: 'error',
      title: 'failed to edit',
      timer: 3000
    });
  } finally {
    onProcess.is = false;
  }
}
</script>