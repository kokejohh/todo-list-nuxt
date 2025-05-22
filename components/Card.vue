<template>
    <div class="card bg-base-200 w-48 h-48 shadow-sm">
        <div class="card-body pt-4">
            <div class="flex justify-between">
                <div class="cursor-move text-xl" data-swapy-handle>☰</div>
                <div class="space-x-4">
                    <span class="cursor-pointer hover:text-green-500" @click="openModal" >🖉</span>
                    <span class="cursor-pointer hover:text-red-500" @click="deleteTask">X</span>
                </div>
            </div>
            <h2 class="card-title text-sm">{{ task.detail }}</h2>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        task: Object,
        modelValue: Object
    })
    const emit = defineEmits(['removeTask', 'update:modelValue']);

    function deleteTask() {
        emit('deleteTask');
    }

    function openModal() {
        emit('update:modelValue', props.task);
        modal_edit.showModal();
    }
</script>