<template>
    <fieldset class="fieldset bg-base-200 border-base-300 rounded-box max-w-lg border p-4 mx-auto">
        <legend class="fieldset-legend">Create Task</legend>
        <div class="join">
            <input v-model="text" @keyup.enter="addTask" type="text" class="input w-full join-item"
                placeholder="What task you have to do ?" />
            <button class="btn btn-primary join-item" @click="addTask">Create</button>
        </div>
    </fieldset>
    <div ref="container" class="flex flex-wrap lg:max-w-4xl space-y-4 space-x-4 mt-4 py-4 mx-auto justify-center">

        <div v-for="{ slotId, itemId, item } in slottedItems" :key="slotId" :data-swapy-slot="slotId">
            <div v-if="item" :data-swapy-item="itemId" :key="itemId">
                <Card :detail="'' + item.detail" @remove-task="removeTask(item.id)"/>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">

import { createSwapy, utils } from 'swapy';
import type { SlotItemMapArray, Swapy } from 'swapy';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

type Task = {
    id: String,
    detail: String
}

const swapy = ref<Swapy | null>(null);
const container = ref<HTMLElement | null>();
const tasks = ref<Task[]>([]);
const slotItemMap = ref<SlotItemMapArray>([...utils.initSlotItemMap(tasks.value, 'id')]);

watch(tasks, () =>
    utils.dynamicSwapy(swapy.value, tasks.value, 'id', slotItemMap.value, (value: SlotItemMapArray) => slotItemMap.value = value), { deep: true }
);

const slottedItems = computed(() => utils.toSlottedItems(tasks.value, 'id', slotItemMap.value));

onMounted(() => {
    if (container.value) {
        swapy.value = createSwapy(container.value, {
            manualSwap: true,
            autoScrollOnDrag: true,

        });

        swapy.value.onSwap(event => {
            console.log('swap', event);
            requestAnimationFrame(() => {
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

import Card from '~/components/Card.vue';

const text = ref('');

function addTask() {
    if (text.value.trim() === '') return;
    tasks.value.unshift({ id: (tasks.value.length + 1).toString(), detail: text.value });
    text.value = '';
}

function removeTask(id: String) {
    tasks.value = tasks.value.filter(i => i.id !== id);
}

</script>