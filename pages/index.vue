<template>
    <ClientOnly>
        <fieldset class="fieldset bg-base-200 border-base-300 rounded-box max-w-lg border p-4 mx-auto">
            <legend class="fieldset-legend">Create Task</legend>
            <div class="join">
                <input v-model="text" @keyup.enter="addTask" :disabled="onProcess.is" type="text"
                    class="input w-full join-item" placeholder="What task you have to do ?" />
                <button class="btn btn-primary join-item" :disabled="onProcess.is" @click="addTask">Create</button>
                <button class="btn btn-secondary join-item" :disabled="onProcess.is" @click="saveTasks">Save</button>
            </div>
        </fieldset>
    </ClientOnly>
    <div class="h-10 py-4">
        <span v-show="onProcess.is" class="loading loading-bars loading-xl block mx-auto"></span>
    </div>
    <div ref="container" class="flex flex-wrap max-w-4xl space-y-4 pt-4 justify-center mx-auto">
        <div v-for="{ slotId, itemId, item } in slottedItems" :key="slotId" :data-swapy-slot="slotId">
            <div v-if="item" :data-swapy-item="itemId" :key="itemId">
                <StickyNote :task="item" v-model="selectedTask" />
            </div>
        </div>
    </div>
    <Modal :task="selectedTask" />
</template>

<script setup lang="ts">

import { tasksStore, onProcessStore } from '@/stores/todo';

import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { createSwapy, utils } from 'swapy';
import type { SlotItemMapArray, Swapy } from 'swapy';

const tasks = tasksStore();
const onProcess = onProcessStore();

const selectedTask = ref<Record<string, any> | undefined>();
const swapy = ref<Swapy | null>(null);
const container = ref<HTMLElement | null>();
const slotItemMap = ref<SlotItemMapArray>([...utils.initSlotItemMap(tasks.data, 'order')]);

watch(() => tasks, () =>
    utils.dynamicSwapy(swapy.value, tasks.data, 'order', slotItemMap.value, (value: SlotItemMapArray) => slotItemMap.value = value), { deep: true }
);

const slottedItems = computed(() => {
    const items = utils.toSlottedItems(tasks.data, 'order', slotItemMap.value);
    // debounceSlottedItems(items);
    return items
});

// const debounceSlottedItems = debounce((items) => {
//     items.forEach((item) => {
//         $fetch('/api/tasks', {
//             method: 'patch',
//             body: {
//                 id: item.item?.id,
//                 order: parseInt(item.slotId)
//             },
//         });
//     });
// }, 1000);

onMounted(async () => {
    onProcess.is = true;
    try {
        const getAlltasks = await $fetch('/api/tasks');
        const allTasks = getAlltasks.map(data => ({
            ...data,
            order: String(data.order)
        }));
        tasks.data = [...allTasks];
    } catch (err) {
        Toast.fire({
            icon: "error",
            title: "database down"
        })
        console.error(err);
    } finally {
        onProcess.is = false;
    }

    if (container.value) {
        swapy.value = createSwapy(container.value, {
            manualSwap: true,
            autoScrollOnDrag: true
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

const text = ref<string>('');

async function addTask() {
    const detail = text.value.trim();
    if (detail === '') return;

    onProcess.is = true;
    Toast.fire({
        icon: 'info',
        title: 'creating task'
    });
    try {
        const newTask = await $fetch('/api/tasks', {
            method: 'post',
            body: {
                detail,
            }
        });
        text.value = '';
        tasks.data.push({
            id: newTask.id,
            detail: newTask.detail,
            order: String(newTask.order),
            status: 'DOING'
        });
        Toast.fire({
            icon: "success",
            title: "created succesfully",
            timer: 3000
        });
    } catch (err) {
        Toast.fire({
            icon: "error",
            title: "failed to create",
            timer: 3000
        });
    } finally {
        onProcess.is = false;
    }
}

async function saveTasks() {
    onProcess.is = true;
    Toast.fire({
        icon: 'info',
        title: 'saving'
    });

    try {
        await Promise.all(slottedItems.value.map((item) => {
            return $fetch('/api/tasks', {
                method: 'patch',
                body: {
                    id: item.item?.id,
                    order: parseInt(item.slotId)
                },
            });
        }));

        Toast.fire({
            icon: 'success',
            title: 'saved successfully',
            timer: 3000
        });
    } catch (err) {
        Toast.fire({
            icon: 'error',
            title: 'failed to save',
            timer: 3000
        });
    } finally {
        onProcess.is = false;
    }
}

</script>