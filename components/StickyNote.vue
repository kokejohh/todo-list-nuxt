<template>
    <div class="card bg-base-200 w-48 h-52 shadow-sm mx-2">
        <div class="card-body pb-0 pt-4 ">
            <div class="flex justify-between">
                <div class="cursor-move text-xl" data-swapy-handle>☰</div>
                <div class="space-x-4">
                    <span class="cursor-pointer hover:text-green-500" @click="openModal">🖉</span>
                    <span class="cursor-pointer hover:text-red-500" @click="deleteTask(task!.id)">X</span>
                </div>
            </div>
            <h2 :class="taskStatus ? 'line-through' : ''" class="card-title text-sm wrap-anywhere line-clamp-6">{{ task!.detail }}</h2>
        </div>
        <div class="card-action flex justify-end m-2">
            <input v-model="taskStatus" class="checkbox checkbox-sm" name="isDone" type="checkbox">
        </div>
    </div>
</template>

<script setup lang="ts">

import { tasksStore, modalStore } from '@/stores/todo';

const tasks = tasksStore();
const modal = modalStore();

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
    const cf = confirm("Do you want to delete this task ?");

    try {
        if (cf) {
            tasks.data = tasks.data.filter((task: Task) => {
                return task.id !== id
            });
            await $fetch('/api/tasks/' + id, {
                method: 'delete'
            });
        }
    } catch (err) {
        alert('Delete faild!');
    }
}

function openModal() {
    emit('update:modelValue', props.task);
    modal.modalEdit!.showModal();
}

</script>