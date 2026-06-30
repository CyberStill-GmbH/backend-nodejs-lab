import { createServer } from 'node:http';
import { Worker } from 'node:worker_threads';

const server = createServer((req, res) => {
    if (req.url === '/fib') {
        const workerPath = new URL('./worker.js', import.meta.url);
        const worker = new Worker(workerPath, { workerData: 40 });

        worker.on('message', (result) => {
            res.end(String(result));
        });

        worker.on('error', (error) => {
            res.statusCode = 500;
            res.end(`Error in the server: ${error.message}\n`);
        });
    } else {
        res.end('ok fast\n');
    }
});

server.listen(3000, () => console.log('Listening at port 3000...'));