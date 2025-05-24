export {}

type StatusTask = "DOING" | "DONE";

declare global {
    type Task = {
        id: Number,
        detail: String,
        order: String,
        status: StatusTask
    }
}