# 01 - Event Loop

A hands-on series of exercises to build an accurate mental model of Node.js's event loop: its phases, the microtask queue, and the difference between non-blocking I/O and CPU-bound work.

## Prerequisites

- Node.js installed (`node --version` to check)
- A terminal (PowerShell, CMD, or VS Code's integrated terminal)

Run any exercise with:

```bash
node R0X.js
```

---

## R01 - Predict execution order

**Goal:** Predict the output of a script mixing `setTimeout`, `Promise.then`, `queueMicrotask`, and `process.nextTick`, then verify it.

```javascript
console.log("1: sync");

setTimeout(() => console.log("2: setTimeout"), 0);

Promise.resolve().then(() => console.log("3: promise.then"));

queueMicrotask(() => console.log("4: queueMicrotask"));

process.nextTick(() => console.log("5: nextTick"));

console.log("6: sync");
```

**Output:**

```
1: sync
6: sync
5: nextTick
3: promise.then
4: queueMicrotask
2: setTimeout
```

**Takeaway:**

- All synchronous code runs first, top to bottom, as a single unit of work.
- Once the call stack is empty, the **microtask queue** is drained completely — `process.nextTick` first (highest priority), then `Promise.then` / `queueMicrotask` in insertion order.
- Only after the microtask queue is empty does the event loop move into its first real phase (**Timers**), where the `setTimeout` callback finally runs.
- Microtasks aren't "a phase" — they run in the gap **after every single task** that finishes on the main thread, regardless of where that task came from (initial script, a timer callback, an I/O callback, etc.).

---

## R02 - Block the event loop and measure HTTP delay

**Goal:** Prove that a synchronous, CPU-blocking operation freezes the entire server — not just the route that triggered it.

```javascript
import { createServer } from "node:http";

const server = createServer((req, res) => {
  if (req.url === "/block") {
    const start = Date.now();
    while (Date.now() - start < 3000) {} // blocks the thread for 3s
    res.end("blocked 3s\n");
  } else {
    res.end("Fast response\n");
  }
});

server.listen(3000, () => console.log("Listening on :3000"));
```

**How to test it:** open two terminals and fire both requests close together (not one after the other):

```bash
# Terminal 1
curl.exe "localhost:3000/block"

# Terminal 2 (right after, don't wait for Terminal 1 to finish)
curl.exe "localhost:3000/fast"
```

**Result:** `/fast` takes ~3 seconds to respond, even though its own logic is instant.

**Takeaway:**

- Node.js runs on a **single thread**. There's no real parallelism inside that thread — only one task can execute at a time.
- The event loop **can't interrupt** synchronous code mid-execution. If the call stack never empties, the event loop never gets a turn to check for other pending callbacks.
- One slow/blocking request degrades performance for **every other concurrent user**. This is exactly the scenario the event loop is designed to avoid — but only if you let it, by writing non-blocking code.

---

## R03 - Implement `sleep(ms)` with a Promise

**Goal:** Build a non-blocking delay function usable with `await`, and understand why it behaves nothing like Arduino's `delay()`.

```javascript
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function example() {
  console.log("before");
  await sleep(2000);
  console.log("after 2 seconds");
}

example().catch((error) => {
  console.log("unexpected error:", error);
  process.exit(1);
});
```

**Proof of non-blocking behavior:**

```javascript
async function task(name, ms) {
  console.log(`${name} starts`);
  await sleep(ms);
  console.log(`${name} ends`);
}

task("A", 2000);
task("B", 1000);
console.log("this prints BEFORE A and B finish");
```

```
A starts
B starts
this prints BEFORE A and B finish
B ends      (after ~1s)
A ends      (after ~2s)
```

**Takeaway:**

- Arduino's `delay()` is a **busy-wait**: the CPU is actively stuck in a loop checking the clock, blocking everything else.
- `sleep()` built on a Promise + `setTimeout` **delegates** the timer to libuv and immediately returns control to the main thread. The `async` function pauses at `await`, but pausing here means "hand control back to the event loop," not "freeze the thread."
- When the timer fires, libuv queues the callback in the **Timers phase**. The event loop picks it up there, resolves the Promise, and the resolution is scheduled as a **microtask**, which is what resumes the `async` function right after the `await`.
- Multiple `sleep()` calls can run concurrently because none of them block the thread while waiting.

---

## R04 - `setImmediate` vs `setTimeout(fn, 0)`

**Goal:** Compare execution order in two different contexts: top-level scope vs. inside an I/O callback.

**Case A — top-level scope (non-deterministic order):**

```javascript
setTimeout(() => console.log("timeout"), 0);
setImmediate(() => console.log("immediate"));
```

Running this multiple times can print `timeout`/`immediate` in either order.

**Case B — inside an I/O callback (deterministic order):**

```javascript
import { readFile } from "node:fs";

readFile(import.meta.filename, () => {
  setTimeout(() => console.log("timeout"), 0);
  setImmediate(() => console.log("immediate")); // always wins here
});
```

This one always prints `immediate` before `timeout`.

**Takeaway:**

| Context | Result | Why |
|---|---|---|
| Top-level scope | Non-deterministic | `setTimeout(fn, 0)` is internally clamped to a minimum ~1ms delay. It becomes a real race between that 1ms elapsing and how fast the Node process reaches the Timers phase on startup — which varies run to run. |
| Inside an I/O callback | `setImmediate` always wins | The I/O callback runs during the **Poll** phase. The event loop's phase order is fixed: Poll → **Check** → Close → (back to Timers). Since Check comes right after Poll in the same loop iteration, `setImmediate` is guaranteed to fire before the loop ever revisits Timers. |

---

## R05 - Slow endpoint when the CPU is blocked

**Goal:** Show that synchronous CPU-bound work (not just I/O) can also block the event loop — and how to offload it using `worker_threads`.

**The problem (naive, blocking version):**

```javascript
function fibonacciSlow(n) {
  if (n <= 1) return n;
  return fibonacciSlow(n - 1) + fibonacciSlow(n - 2);
}

const server = createServer((req, res) => {
  if (req.url === "/fib") {
    const result = fibonacciSlow(40); // blocks the main thread for several seconds
    res.end(`fib(40) = ${result}\n`);
  } else {
    res.end("ok fast\n");
  }
});
```

This blocks the entire server the same way the `while` loop did in R02 — async wrapping (`Promise`, `async`) does **not** fix it, because the computation itself never yields control back.

**The fix — offload to a worker thread:**

```javascript
// server.js
import { createServer } from "node:http";
import { Worker } from "node:worker_threads";

const server = createServer((req, res) => {
  if (req.url === "/fib") {
    const workerPath = new URL("./worker.js", import.meta.url);
    const worker = new Worker(workerPath, { workerData: 40 });

    worker.on("message", (result) => {
      res.end(String(result));
    });

    worker.on("error", (error) => {
      res.statusCode = 500;
      res.end(`Error in the server: ${error.message}\n`);
    });
  } else {
    res.end("ok fast\n");
  }
});

server.listen(3000, () => console.log("Listening on :3000"));
```

```javascript
// worker.js
import { parentPort, workerData } from "node:worker_threads";

function fibonacciSlow(n) {
  if (n <= 1) return n;
  return fibonacciSlow(n - 1) + fibonacciSlow(n - 2);
}

parentPort.postMessage(fibonacciSlow(workerData));
```

**Takeaway:**

- I/O-bound work (files, network, DB) is naturally non-blocking in Node — the OS/libuv does the waiting.
- **CPU-bound work has no async equivalent.** There's nothing to "wait on" externally — the thread is actively computing. Wrapping it in a `Promise` doesn't help; the computation still runs synchronously inside the executor.
- `worker_threads` moves the heavy computation to a **separate thread**, freeing the main thread to keep accepting and responding to other requests.
- This is conceptually similar to offloading work to a queue system (e.g. Redis + BullMQ), but operates at a much smaller scale: same process, same machine, no persistence, and the work dies if the process crashes. Use `worker_threads` for one-off CPU-heavy tasks tied to a single request; reach for a real job queue when the work needs to survive restarts, retry on failure, or scale across multiple machines.

---

## Overall summary

| Concept | Key idea |
|---|---|
| Microtasks vs macrotasks | Microtasks (`nextTick`, Promises) drain completely after every single task, taking priority over the next macrotask (timers, I/O, `setImmediate`) |
| Blocking the event loop | A single-threaded runtime means one synchronous blocking operation freezes *everything*, including unrelated requests |
| `sleep()` vs `delay()` | Non-blocking delays delegate the wait to libuv and free the thread; busy-waits don't |
| `setTimeout` vs `setImmediate` | Order is only deterministic when both are scheduled from within an I/O callback (Poll → Check) |
| CPU-bound work | Async syntax doesn't fix CPU-bound blocking — only moving the work to another thread (`worker_threads`) or process does |