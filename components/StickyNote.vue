<template>
    <div class="card bg-base-200 w-48 h-52 shadow-sm mx-2">
        <div class="card-body pb-0 pt-4 ">
            <div class="flex justify-between">
                <button class="btn btn-xs btn-ghost cursor-move text-xl" :disabled="onProcess.is" data-swapy-handle>☰</button>
                <div class="join">
                    <button class="btn btn-xs btn-ghost join-item" :disabled="onProcess.is" @click="openModal">🖉</button>
                    <button class="btn btn-xs btn-ghost join-item" :disabled="onProcess.is" @click="deleteTask(task!.id)">X</button>
                </div>
            </div>
            <h2 :class="taskStatus ? 'line-through' : ''" class="card-title text-sm wrap-anywhere line-clamp-6">{{
                task!.detail }}</h2>
        </div>
        <div class="card-action flex justify-end m-2">
            <input v-model="taskStatus" class="checkbox checkbox-sm" :disabled="onProcess.is" name="isDone" type="checkbox">
        </div>
    </div>
</template>

<script setup lang="ts">

import { tasksStore, modalStore, onProcessStore } from '@/stores/todo';

import Swal from 'sweetalert2';

const tasks = tasksStore();
const modal = modalStore();
const onProcess = onProcessStore();

const props = defineProps({
    task: Object,
    modelValue: Object
});

const emit = defineEmits(['update:modelValue']);

let index = tasks.data.findIndex(task => task.id === props.task!.id)
const taskStatus = ref(tasks.data[index].status === 'DONE');

watch(taskStatus, async (isDone) => {
    index = tasks.data.findIndex(task => task.id === props.task!.id)
    tasks.data[index].status = isDone ? 'DONE' : 'DOING';
    try {
        await $fetch('/api/tasks/', {
            method: 'patch',
            body: {
                id: tasks.data[index].id,
                status: isDone ? 'DONE' : 'DOING'
            }
        });
    } catch (err) {
        alert('Set Status Failed');
    }
});

async function deleteTask(id: number) {
    onProcess.is = true;
    alert(onProcess.is);
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        theme: "dark",
        customClass: {
            popup: "!bg-base-200"
        }
    }).then(async (result) => {
        if (result.isConfirmed) {
            Toast.fire({
                icon: "info",
                title: "deleting task"
            });
            await $fetch('/api/tasks/' + id, {
                method: 'delete'
            });
            tasks.data = tasks.data.filter((task: Task) => {
                return task.id !== id
            });
            Toast.fire({
                icon: "success",
                title: "deleted succesfully",
                timer: 3000
            });
        }
        onProcess.is = false;
    });

}

function openModal() {
    emit('update:modelValue', props.task);
    modal.modalEdit!.showModal();
}

</script>