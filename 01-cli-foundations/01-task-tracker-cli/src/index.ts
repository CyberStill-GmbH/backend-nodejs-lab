import { error } from "node:console";
import { addTask, listTasks, markTaskDone, deleteTasks } from "./tasks.js"
import { type TaskStatus } from "./types.js";
import { title } from 'node:process';

async function main(): Promise<void> {
    
    const [, , command, ...args] = process.argv;

    if (!command) {
        printHelp();
        return;
    }

    switch (command) {
        case 'add':
            const title = args.join(" ").trim();

            if (!title) {
                console.log("Error: Task title is required");
                return;
            }

            await addTask(title);
            break;

        case 'list':
            const status = args[0] as TaskStatus | undefined;

            if (status && status !== 'pending' && status !== 'done') {
                console.log("Error: status must be 'pending' or 'done'.");
                return;
            }

            await listTasks(status);
            break
        case 'done':
            const idx = Number(args[0]);

            if (!Number.isInteger(idx) || idx <= 0) {
                console.log("Valid task id is required.")
                return
            }

            await markTaskDone(idx);
            break;

        case 'delete':
            const idy = Number(args[0]);

            if (!Number.isInteger(idy) || idy <= 0) {
                console.log("Valid task id is required.");
                return;
            }

            await deleteTasks(idy);
            break;
    }
}

function printHelp(): void {
    console.log(`
Task Tracker CLI

Commands:
  add "task title"       Add a new task
  list                   List all tasks
  list pending           List pending tasks
  list done              List completed tasks
  done <id>              Mark task as done
  delete <id>            Delete task

Examples:
  npm run dev -- add "Study Node.js"
  npm run dev -- list
  npm run dev -- done 1
  npm run dev -- delete 1
`);
} 

main().catch((error) => {
    console.log("Unecpected Error:", error);
    process.exit(1);
});