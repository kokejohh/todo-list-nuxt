import { defineStore } from "pinia";

const onProcessStore = defineStore('onProcess', () => {
    const is = ref<boolean>(true);

    return { is }
});
const tasksStore = defineStore('task', () => {
    const data = ref<Task[]>([]);

    return { data }
});

const modalStore = defineStore('modal', () => {
    const modalEdit = ref<HTMLDialogElement | null>(null);

    return { modalEdit }
});

export {
    onProcessStore,
    tasksStore,
    modalStore
}