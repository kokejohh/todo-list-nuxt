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

import { tasksStore, modalStore } from '@/stores/todo';

const tasks = tasksStore();
const modal = modalStore();

const props = defineProps({
  task: Object
});

const modalRef = ref<HTMLDialogElement | null>(null);
const isModalOpen = ref<boolean>(false);
const detail = ref<string>('');

onMounted(() => {
  modal.modalEdit = modalRef.value;
  const dialog = modal.modalEdit;
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
  });
});

async function sleep(ms: number) {

  // return new Promise((res, rej) => {
    // setTimeout(() => res(1), ms)
    // setTimeout(() => {
    //   setTimeout(() => {
    //     alert(2000)
    //   }, 1000);
    //   alert(1000);
    // }, 1000);
  // });
}
async function saveTask(id: number) {
  const index = tasks.data.findIndex((task: Task) => task.id === id)
  const tmpDetail = tasks.data[index].detail;
  tasks.data[index].detail = detail.value

  try {
    // await $fetch('/api/tasks/', {
    //   method: 'patch',
    //   body: {
    //     id,
    //     detail: detail.value
    //   }
    // });
  } catch (err) {
    alert('Edit Failed');
    tasks.data[index].detail = tmpDetail;
  }
}
</script>