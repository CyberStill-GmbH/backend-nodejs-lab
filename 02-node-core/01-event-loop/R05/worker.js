import { parentPort, workerData } from 'node:worker_threads';

function lazyFibonacci(n) {
    if (n <= 1) return n;
    return lazyFibonacci(n - 1) + lazyFibonacci(n - 2);
}

const result = lazyFibonacci(workerData);

parentPort.postMessage(`fib(40) = ${result}\n`);