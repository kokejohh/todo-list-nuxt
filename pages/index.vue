<template>
    <fieldset class="fieldset bg-base-200 border-base-300 rounded-box max-w-lg border p-4 mx-auto">
        <legend class="fieldset-legend">Create Task</legend>
        <div class="join">
            <input v-model="text" @keyup.enter="addTask" type="text" class="input w-full join-item"
                placeholder="What task you have to do ?" />
            <button class="btn btn-primary join-item" @click="addTask">Create</button>
        </div>
    </fieldset>
    <div ref="container"
        class="flex flex-wrap flex-row-reverse lg:max-w-4xl space-y-4 mt-4 py-4 mx-auto justify-center">
        <div v-for="{ slotId, itemId, item } in slottedItems" :key="slotId" :data-swapy-slot="slotId">
            <div v-if="item" :data-swapy-item="itemId" :key="itemId">
                <StickyNote :task="item" v-model="selectedTask" />
            </div>
        </div>
    </div>
    <Modal :task="selectedTask" />
</template>

<script setup lang="ts">

import { tasksStore } from '@/stores/todo';

import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { createSwapy, utils } from 'swapy';
import type { SlotItemMapArray, Swapy } from 'swapy';

const tasks = tasksStore();

const selectedTask = ref<Record<string, any> | undefined>();
const swapy = ref<Swapy | null>(null);
const container = ref<HTMLElement | null>();
const slotItemMap = ref<SlotItemMapArray>([...utils.initSlotItemMap(tasks.data, 'order')]);

type Task = {
    id: Number,
    detail: String,
    order: String
}

watch(() => tasks, () =>
    utils.dynamicSwapy(swapy.value, tasks.data, 'order', slotItemMap.value, (value: SlotItemMapArray) => slotItemMap.value = value), { deep: true }
);

const slottedItems = computed(() => utils.toSlottedItems(tasks.data, 'order', slotItemMap.value));

onMounted(async () => {
    // const getAlltasks = await $fetch('/api/tasks');
    // getAlltasks.map(data => {
    //     data.order = data.order + ''
    // });
    // tasks.data.push(...getAlltasks);

    if (container.value) {
        swapy.value = createSwapy(container.value, {
            manualSwap: true,
            autoScrollOnDrag: true,
        });

        swapy.value.onSwap(event => {
            requestAnimationFrame(() => {
                console.log('request animation');
                slotItemMap.value = event.newSlotItemMap.asArray;
            })
        });

        swapy.value.onSwapEnd(() => {
            swapy.value?.update();
        })
    }
});

onUnmounted(() => {
    swapy.value?.destroy();
});

const text = ref('');

async function addTask() {
    const detail = text.value.trim();
    if (detail === '') return;

    const order = (tasks.data.length + 1).toString();
    const newId: number = Date.now();
    tasks.data.push({ id: newId, detail, order });
    text.value = '';
    try {
        // const createTask = await $fetch('/api/tasks', {
        //     method: 'post',
        //     body: {
        //         detail,
        //         order: parseInt(order)
        //     }
        // });
        // const index = tasks.data.findIndex(task => task.id === newId);
        // if (index !== -1) tasks.data[index].id = createTask.id.toString();
    } catch (err) {
        tasks.data = tasks.data.filter((task: Task) => task.id !== newId);
        alert('Create failed!');
    }
}

</script>