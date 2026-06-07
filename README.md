<div align="center">
```
███╗   ██╗ ██████╗ ██████╗ ███████╗      ██╗ ███████╗
████╗  ██║██╔═══██╗██╔══██╗██╔════╝     ██╔╝ ██╔════╝
██╔██╗ ██║██║   ██║██║  ██║█████╗      ██╔╝  ███████╗
██║╚██╗██║██║   ██║██║  ██║██╔══╝     ██╔╝   ╚════██║
██║ ╚████║╚██████╔╝██████╔╝███████╗  ██╔╝    ███████║
╚═╝  ╚═══╝ ╚═════╝ ╚═════╝ ╚══════╝ ╚═╝     ╚══════╝
                                          L  A  B
```
 
**A serious backend learning lab. No hand-holding. No magic. Just Node.**
 
![Status](https://img.shields.io/badge/status-actively_learning-22c55e?style=flat-square)
![Node](https://img.shields.io/badge/node-v20+-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-3b82f6?style=flat-square)
![Made with](https://img.shields.io/badge/made_with-curiosity_%26_coffee-f59e0b?style=flat-square)
 
</div>
---

A structured, hands-on learning repository for backend development with Node.js — built from the ground up, covering core internals, HTTP servers, databases, architecture patterns, and real mini-projects.

This is not a course. It's a lab: a place to read, experiment, break things, and build understanding that actually sticks.

---

## Why this exists

Most Node.js learning resources either stop at "hello world" or jump straight into frameworks without explaining what's happening underneath. This repo fills the gap — starting from how Node actually works (event loop, streams, async model) and building up to production-level patterns and multi-service projects.

The goal is to understand Node.js deeply enough to make real architectural decisions, not just follow tutorials.

---

## Structure

```
nodejs-lab/
├── 01-foundations/       Core internals: event loop, modules, async, streams, buffers
├── 02-http/              Native HTTP, Express, Fastify, REST design, WebSockets
├── 03-databases/         PostgreSQL, MongoDB, Redis — raw drivers and ORMs
├── 04-patterns/          MVC, Repository, Dependency Injection, Clean Architecture
├── 05-projects/          Mini-projects that integrate everything above
├── ROADMAP.md            What's done, what's next
└── docker-compose.yml    Spins up Postgres, MongoDB, and Redis locally
```

Each topic folder follows this convention:

```
event-loop/
├── README.md       Theory and personal notes — written in plain English
├── diagrams/       Visual explanations (draw.io, Excalidraw, hand-drawn scans)
├── examples/       Numbered scripts: 01-phases.js, 02-timers.js, ...
└── exercises/      Self-imposed challenges and experiments
```

The `README.md` inside each topic is the most important file. If it can't be explained in plain words, it hasn't been understood yet.

---

## Learning path

Progress follows this order — each stage depends on the one before it:

```
01-foundations → 02-http → 03-databases → 04-patterns → 05-projects
```

Within `01-foundations`, the recommended order is:

1. **Event loop** — understanding the execution model that makes everything else make sense
2. **Async** — callbacks → Promises → async/await → Promise combinators
3. **Modules** — CommonJS vs ESM, `__dirname`, `path`, `fs`
4. **Streams** — Readable, Writable, Transform, pipe
5. **Buffers** — binary data, encoding, Buffer API

Don't skip ahead. The instinct to jump to frameworks is understandable, but every hour spent on the event loop saves ten hours of debugging mysterious async behavior later.

---

## What's covered

### Foundations
The internals of Node.js: how the event loop works and why it matters, the different phases (timers, I/O, microtasks, `nextTick`), the module system, and how Node handles asynchronous code at a low level.

### HTTP & Servers
Building servers with the native `http` module first, then with Express and Fastify. REST API design, middleware patterns, authentication flows, and real-time communication with WebSockets.

### Databases
Three database types, each serving a different purpose:
- **PostgreSQL** — relational data, raw SQL with `pg`, migrations, then Prisma/Drizzle as abstraction layers
- **MongoDB** — document modeling with Mongoose, when schema-less makes sense
- **Redis** — caching, session management, rate limiting, and job queues with BullMQ

The final exercise combines all three in a single project.

### Architecture Patterns
The patterns that separate "code that works" from "code that scales": MVC, Repository pattern, dependency injection, and Clean Architecture. Each is explored with practical examples, not just theory.

### Projects
Mini-projects that integrate everything:

| Project | Concepts practiced |
|---|---|
| `todo-api` | REST, PostgreSQL, basic auth |
| `auth-system` | JWT, refresh tokens, middleware |
| `file-uploader` | Streams, S3/local storage, queues |
| `chat-ws` | WebSockets, Redis pub/sub |
| `api-gateway` | Routing, rate limiting, multi-service |

---

## Running locally

Most database-dependent examples require Postgres, MongoDB, and Redis. Spin them all up with:

```bash
docker-compose up -d
```

Individual scripts can be run directly:

```bash
node 01-foundations/event-loop/examples/01-phases.js
```

Node.js v20+ is recommended. No global installs required beyond Node and Docker.

---

## Philosophy

**Depth over breadth.** Better to understand the event loop completely than to have touched fifteen frameworks shallowly.

**Write before you code.** Every topic has a `README.md` for notes. Explaining something in writing is how you find out whether you actually understand it.

**Break things on purpose.** The `exercises/` folders exist for deliberate experimentation — trying edge cases, writing wrong code to see what breaks, and asking "what happens if I do this?"

**No magic.** When a framework does something that feels like magic, the goal is to understand the mechanism underneath before relying on the abstraction.

---

## Roadmap

See [ROADMAP.md](./ROADMAP.md) for current progress, topics in progress, and what's coming next.

---

## License

MIT — use, adapt, and build on this freely.