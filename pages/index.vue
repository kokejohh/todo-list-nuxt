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
                <Card :task="item" @remove-task="removeTask(item.id)" v-model="selectedTask"/>
            </div>
        </div>
    </div>

    <Modal :task="selectedTask" />
</template>

<script setup lang="ts">
import { createSwapy, utils } from 'swapy';
import type { SlotItemMapArray, Swapy } from 'swapy';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

type Task = {
    id: String,
    detail: String
}

const selectedTask = ref<Record<string, any> | undefined>();
const swapy = ref<Swapy | null>(null);
const container = ref<HTMLElement | null>();
const tasks = ref<Task[]>([]);
const slotItemMap = ref<SlotItemMapArray>([...utils.initSlotItemMap(tasks.value, 'id')]);

watch(tasks, () =>
    utils.dynamicSwapy(swapy.value, tasks.value, 'id', slotItemMap.value, (value: SlotItemMapArray) => slotItemMap.value = value), {deep: true}
);

const slottedItems = computed(() => utils.toSlottedItems(tasks.value, 'id', slotItemMap.value));

onMounted(async () => {
    // const getAlltasks: Task[] = await $fetch('/api/tasks');
    // getAlltasks.map(data => {
    //     data.id = data.id + ''
    // });
    // tasks.value.push(...getAlltasks);

    if (container.value) {
        swapy.value = createSwapy(container.value, {
            manualSwap: true,
            autoScrollOnDrag: true,
        });

        swapy.value.onSwap(event => {
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

async function addTask() {
    if (text.value.trim() === '') return;

    // const createTask = await $fetch('/api/tasks', {
    //     method: 'post',
    //     body: {
    //         detail: text.value,
    //     }
    // });

    tasks.value.push({ id: (tasks.value.length + 1).toString(), detail: text.value });
    text.value = '';
}

async function editTask(id: string) {
    const task = tasks.value.find(i => i.id === id);

}

async function removeTask(id: any) {
    tasks.value = tasks.value.filter(i => i.id !== id);
    // await $fetch('/api/tasks/' + id, {
    //     method: 'delete'
    // })
}

</script>