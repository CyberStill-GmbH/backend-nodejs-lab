# Notes — Task Tracker CLI

## What I built

A small CLI application to manage tasks using Node.js, TypeScript and JSON file persistence.

## Commands implemented

- `add "title"`
- `list`
- `list pending`
- `list done`
- `done <id>`
- `delete <id>`

---

## What I learned

### `process.argv`

`process.argv` contains the arguments passed to the Node.js process.

Example:

```bash
npm run dev -- add "Study Node.js"
```

When using `npm run`, the `--` is needed to pass arguments to my script instead of passing them to npm.

Example output:

```txt
[
  'node path',
  'script path',
  'add',
  'Study Node.js'
]
```

In my CLI, the useful values start from the third position:

```ts
const [, , command, ...args] = process.argv;
```

So:

```txt
command = "add"
args = ["Study Node.js"]
```

---

### Reading JSON with Node.js

To read the task database, I used an async function with `readFile` from `node:fs/promises`.

```ts
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
```

What happens here:

- `readFile(DB_PATH, "utf-8")` reads the file as text.
- `JSON.parse(data)` converts the JSON text into JavaScript data.
- `as Task[]` tells TypeScript that the parsed data should follow my `Task[]` structure.
- The `catch` returns an empty array if the file cannot be read or parsed.

This makes the CLI safer because it does not crash immediately when the file is empty, missing, or invalid.

---

### Writing JSON with Node.js

To save tasks, I used `writeFile`.

```ts
export async function writeTasks(tasks: Task[]): Promise<void> {
    await writeFile(DB_PATH, JSON.stringify(tasks, null, 4), "utf-8");
}
```

What happens here:

- `JSON.stringify(tasks, null, 4)` converts the array into formatted JSON.
- The `4` means indentation with 4 spaces.
- `writeFile` overwrites the file with the updated task list.

---

### Task representation

I represented a task using a TypeScript interface.

```ts
export type TaskStatus = "pending" | "done";

export interface Task {
    id: number;
    title: string;
    status: TaskStatus;
    updatedAt: string;
    createdAt: string;
}
```

This helped me define a clear structure for each task:

- `id`: unique task identifier.
- `title`: task description.
- `status`: either `pending` or `done`.
- `createdAt`: creation date.
- `updatedAt`: last update date.

---

### ID generation

At first, I considered using an ID generator like this:

```ts
class IdGenerator {
    #currentId = 0;

    next() {
        this.#currentId += 1;
        return this.#currentId;
    }
}

const taskId = new IdGenerator();
const idNum = taskId.next();
```

But this has a problem in a CLI application: every time the program runs again, `#currentId` starts from `0`.

That means IDs could repeat.

A better approach is to read the existing tasks and calculate the next ID from the current data:

```ts
const nextId =
    tasks.length === 0
        ? 1
        : Math.max(...tasks.map((task) => task.id)) + 1;
```

This works better because the JSON file is the source of truth.

---

## Error handling

I handled basic errors such as:

- `add` without a title.
- `done` without an ID.
- `done` with an invalid ID.
- `delete` without an ID.
- `delete` with an invalid ID.
- `list` with an invalid status.

Example:

```bash
npm run dev -- list "study node"
```

This fails because `list` only accepts:

```txt
pending
done
```

So `"study node"` is not a valid status.

The current valid commands are:

```bash
npm run dev -- list
npm run dev -- list pending
npm run dev -- list done
```

A future improvement could be adding a separate search command:

```bash
npm run dev -- search "study node"
```

---

## Separation of responsibilities

I separated the project into different files:

```txt
src/index.ts
src/tasks.ts
src/storage.ts
src/types.ts
```

### `index.ts`

Handles terminal commands and CLI input.

### `tasks.ts`

Handles task logic:

- add task
- list tasks
- mark task as done
- delete task

### `storage.ts`

Handles persistence:

- read tasks from JSON
- write tasks to JSON

### `types.ts`

Defines shared TypeScript types.

This separation makes the project easier to read and easier to grow.

---

## Bugs or problems

### Invalid `list` argument

I tested:

```bash
npm run dev -- list "study node"
```

The CLI returned:

```txt
Error: status must be 'pending' or 'done'.
```

This is correct because the current `list` command filters by status, not by text.

### Possible path issue

I used:

```ts
const DB_PATH = "../tasks.json";
```

This depends on where the command is executed from.

A future improvement would be making the path more stable using `import.meta.url` and `path`.

---

## Next improvements

- Add `update <id> "new title"`.
- Add `search "text"`.
- Add `clear done`.
- Add due dates.
- Add priority: `low`, `medium`, `high`.
- Improve terminal output formatting.
- Add tests.
