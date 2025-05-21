<template>

    <fieldset class="fieldset bg-base-200 border-base-300 rounded-box max-w-lg border p-4 mx-auto">
        <legend class="fieldset-legend">Create Task</legend>
        <div class="join">
            <input v-model="text" @keyup.enter="addTask" type="text" class="input w-full join-item"
                placeholder="What task you have to do ?" />
            <button class="btn btn-primary join-item" @click="addTask">New</button>
        </div>
    </fieldset>

    <div class="flex">
            <div class="w-2/3">
                <draggable v-model="tasks" item-key="id" :animation="200" handle=".drag-handle" group="task"
                    drag-class="dragging" delay="50" class="bg-base-100 min-h-screen h-full flex flex-wrap content-start lg:max-w-4xl space-y-4 space-x-4 mt-4 pl-4 py-4 mx-auto">
                    <template #item="{ element }">
                        <Card :detail="element.detail" @removeTask="removeTask(element.id)" />
                    </template>
                </draggable>
            </div>


            <div class="w-1/3">
                <draggable v-model="tasksFinish" item-key="id" :animation="200" handle=".drag-handle" group="task"
                    drag-class="dragging" delay="50" class="bg-base-300 min-h-screen h-full flex flex-wrap content-start lg:max-w-4xl space-y-4 space-x-4 mt-4 pl-4 py-4 mx-auto">
                    <template #item="{ element }">
                        <Card :detail="element.detail" />
                    </template>
                </draggable>
            </div>
    </div>
</template>

<script setup>

import draggable from 'vuedraggable';
import Card from '~/components/Card.vue';

const tasks = ref([]);
const tasksFinish = ref([{
    id: 1,
    detail: "fisi"
}]);
const text = ref('');

function addTask() {
    if (text.value.trim() === '') return;
    tasks.value.unshift({ id: tasks.value.length + 1, detail: text.value });
    text.value = '';
}

function removeTask(id) {
    tasks.value = tasks.value.filter(i => i.id !== id);
}

</script>

