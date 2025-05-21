<template>
    <div class="card bg-base-200 w-48 h-48 shadow-sm">
        <div class="card-body">
            <div class="flex justify-between">
            <span class="drag-handle cursor-move">☰</span>
            <span class="cursor-pointer">🖉</span>
            <span class="cursor-pointer mr-2" @click="handleClick">X</span>
            </div>
            <h2 class="card-title">{{ detail }}</h2>
            <div class="card-actions justify-end items-end">
            <button class="btn btn-primary">Edit</button>
        </div>
        </div>
  
    </div>
</template>

<script setup>
    defineProps({
        id: Number,
        detail: String
    });

    const emit = defineEmits(['removeTask']);

    function handleClick() {
        emit('removeTask');
    }

</script>