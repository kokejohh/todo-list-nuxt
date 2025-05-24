<template>
    <div class="card bg-base-200 w-48 h-48 shadow-sm mx-2">
        <div class="card-body pt-4 ">
            <div class="flex justify-between">
                <div class="cursor-move text-xl" data-swapy-handle>☰</div>
                <div class="space-x-4">
                    <span class="cursor-pointer hover:text-green-500" @click="openModal">🖉</span>
                    <span class="cursor-pointer hover:text-red-500" @click="deleteTask(task!.id)">X</span>
                </div>
            </div>
            <h2 class="card-title text-sm wrap-anywhere line-clamp-6">{{ task!.detail }}</h2>
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
})

const emit = defineEmits(['update:modelValue']);

async function deleteTask(id: number) {
    const cf = confirm("Do you want to delete this task ?");

    try {
        if (cf) {
            await $fetch('/api/tasks/' + id, {
                method: 'delete'
            });
            tasks.data = tasks.data.filter((task: Task) => {
                return task.id !== id
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