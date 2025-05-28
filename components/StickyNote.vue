<template>
    <div :class="{'!opacity-80': taskStatus}" class="card bg-base-200 opacity-90 w-48 h-52 shadow-sm mx-2">
        <div class="card-body pb-0 pt-4 ">
            <div class="flex justify-between">
                <button class="btn btn-xs btn-ghost cursor-move text-xl" :disabled="onProcess.is" data-swapy-handle>☰</button>
                <div class="join">
                    <button class="btn btn-xs btn-ghost join-item" :disabled="onProcess.is || taskStatus" @click="openModal">🖉</button>
                    <button class="btn btn-xs btn-ghost join-item" :disabled="onProcess.is" @click="deleteTask(task!.id)">X</button>
                </div>
            </div>
            <h2 :class="{'text-gray-500': onProcess.is || taskStatus}" class="card-title text-sm wrap-anywhere line-clamp-6">{{task!.detail }}</h2>
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
        tasks.data[index].status = !isDone ? 'DONE' : 'DOING';
        Toast.fire({
            icon: 'error',
            title: 'failed to set status',
            timer: 3000
        })
    }
});

async function deleteTask(id: number) {
    Swal.fire({
        title: "Delete task ?",
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        theme: "dark",
        customClass: {
            popup: "!bg-base-200 !w-80",
        },
        reverseButtons: true
    }).then(async (result) => {
        if (result.isConfirmed) {
            onProcess.is = true;
            Toast.fire({
                icon: "info",
                title: "deleting task"
            });
            try {
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
            } catch {
                Toast.fire({
                    icon: "error",
                    title: "failed to deletion",
                    timer: 3000
                });
            } finally {
                onProcess.is = false;
            }
        }
    });
}

function openModal() {
    emit('update:modelValue', props.task);
    modal.modalEdit!.showModal();
}

</script>