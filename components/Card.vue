<template>
    <div class="card bg-base-200 w-48 h-48 shadow-sm">
        <div class="card-body">
            <div class="flex justify-between">
            <div class="cursor-move text-xl" data-swapy-handle>☰</div>
            <div class="space-x-4">
                <span class="cursor-pointer" @click="openModal" >🖉</span>
                <span class="cursor-pointer" @click="handleClick">X</span>
            </div>
            </div>
            <h2 class="card-title text-sm">{{ task.detail }}</h2>
        </div>
    </div>
</template>

<script setup>
    // const props = defineProps({
    //     id: String,
    //     detail: String,
    // });

    const props = defineProps({
        task: Object,
        modelValue: Object
    })
    // const props = defineProps(['task', 'modelValue'])

    const emit = defineEmits(['removeTask', 'update:modelValue']);

    function handleClick() {
        emit('removeTask');
    }

    function openModal() {
        emit('update:modelValue', props.task);
        my_modal_1.showModal();
    }
</script>