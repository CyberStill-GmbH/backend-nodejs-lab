import { createServer } from "node:http";

const server = createServer((req, res) => {
    if (req.url === '/block') {
        const start = Date.now();
        while (Date.now() - start < 3000) {};
        res.end("blocked 3s\n");
    } else {
        res.end("Fast response\n");
    }
});

server.listen(3000, () => console.log("Server at: 3000"));