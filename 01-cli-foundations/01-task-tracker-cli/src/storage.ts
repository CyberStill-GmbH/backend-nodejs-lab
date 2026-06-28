import { readFile, writeFile } from "node:fs/promises";
import { type Task } from "./types.js";

const DB_PATH = "../tasks.json";

export async function readTasks(): Promise<Task[]> {
    try {
        const data = await readFile(DB_PATH, "utf-8");
        return JSON.parse(data) as Task[];

    } catch {
        return [];
    }
}

export async function writeTasks(tasks: Task[]): Promise<void> {
    await writeFile(DB_PATH, JSON.stringify(tasks, null, 4), "utf-8");
}