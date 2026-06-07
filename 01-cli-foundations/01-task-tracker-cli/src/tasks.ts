import { title } from "node:process";
import { readTasks, writeTasks } from "./storage.js";
import { type Task, type TaskStatus } from "./types.js";
/**
 * Implement incremental ID algorithm to make
 * easier founding andwriting the file name  
**/
class IdGenerator {
    #currentId = 0;

    next() {
        this.#currentId += 1;
        return this.#currentId;
    }
}

const taskId = new IdGenerator();

export async function addTask(title: string) {
    
    const tasks = await readTasks();

    const idNum = taskId.next();
    const currentDate = new Date().toISOString();

    const task: Task = {
        id: idNum,
        title,
        status: "pending",
        createdAt: currentDate,
        updatedAt: currentDate
    };

    tasks.push(task);
    await writeTasks(tasks);

    console.log(`Task added: #${task.id} ${task.title}`);
    
}

export async function listTasks(status?: TaskStatus): Promise<void> {
    const tasks = await readTasks();

    const filtered = status 
        ? tasks.filter((task) => task.status === status)
        : tasks;

    if (filtered.length === 0) {
        console.log("Not tasks found.");
        return;
    }

    for (const task of filtered) {
        console.log(
            `#${task.id} [${task.status}] ${task.title} | created: ${task.createdAt}`
        );
    }
}

export async function markTaskDone(id: number) {
    const tasks = await readTasks();

    const task = tasks.find((item) => item.id = id);

    if (!task) {
        console.log(`Task not found: #${id}`);
        return;
    }

    task.status = 'done';
    task.updatedAt = new Date().toISOString();

    await writeTasks(tasks);

    console.log(`Task completed: #${task.id} ${task.title}`);
}

export async function deleteTasks(id: number): Promise<void> {
    const tasks = await readTasks();

    const task = tasks.find((item) => item.id = id);

    if (!task) {
        console.log(`Task not found: #${id}`);
        return;
    }

    tasks.filter((item) => item.id !== id);

    await writeTasks(tasks);
    console.log(`Task deleted: #${task.id} ${task.title}`);
}



