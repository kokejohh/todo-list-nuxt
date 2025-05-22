<template>
    <div class="card bg-base-200 w-48 h-48 shadow-sm">
        <div class="card-body">
            <div class="flex justify-between">
            <div class="cursor-move text-xl" data-swapy-handle>☰</div>
            <div class="space-x-4">
                <span class="cursor-pointer">🖉</span>
                <span class="cursor-pointer" @click="handleClick">X</span>
            </div>
            </div>
            <h2 class="card-title text-sm">{{ detail }}</h2>
        </div>
    </div>
</template>

<script setup>
    defineProps({
        id: String,
        detail: String
    });

    const emit = defineEmits(['removeTask']);

    function handleClick() {
        emit('removeTask');
    }

    onMounted(() => {
        console.error("mounte card");
    })

</script>