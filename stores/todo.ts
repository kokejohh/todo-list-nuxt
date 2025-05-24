import { defineStore } from "pinia";

const tasksStore = defineStore('task', () => {
    const data = ref<Task[]>([]);

    return { data }
});

const modalStore = defineStore('modal', () => {
    const modalEdit = ref<HTMLDialogElement | null>(null);

    return { modalEdit }
});

export {
    tasksStore,
    modalStore
}