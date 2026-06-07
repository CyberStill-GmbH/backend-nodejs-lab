# NodeJS Backend Lab → Codenix Roadmap

> **Goal:** Build backend skill step by step until you are ready to build **Codenix**, a platform for problems, submissions, contests, rankings, editorials, users and learning paths.
>
> This roadmap is project-based. Every folder must produce code, notes, tests or a working feature. No endless theory.

---

## Repository Structure

```txt
nodejs-backend-lab/
│
├── 00-docs/
│   ├── backend-principles.md
│   ├── http-rest.md
│   ├── node-runtime.md
│   ├── async-patterns.md
│   ├── postgres-sql.md
│   ├── auth-security.md
│   ├── testing.md
│   ├── redis-workers.md
│   ├── architecture.md
│   └── codenix-system-design.md
│
├── 01-cli-foundations/
│   ├── 01-task-tracker-cli/
│   ├── 02-github-activity-cli/
│   ├── 03-expense-tracker-cli/
│   └── 04-codenix-problem-cli/
│
├── 02-node-core/
│   ├── 01-event-loop/
│   ├── 02-async-model/
│   ├── 03-modules/
│   ├── 04-streams/
│   └── 05-buffers-crypto/
│
├── 03-http-apis/
│   ├── 01-native-http-server/
│   ├── 02-express-health-api/
│   ├── 03-express-todo-api/
│   ├── 04-fastify-health-api/
│   └── 05-codenix-problems-api/
│
├── 04-databases/
│   ├── 01-postgres-raw/
│   ├── 02-migrations-seeds/
│   ├── 03-blogging-platform-api/
│   ├── 04-query-optimization/
│   └── 05-codenix-schema-v0/
│
├── 05-auth-access/
│   ├── 01-auth-api/
│   ├── 02-refresh-tokens/
│   ├── 03-rbac-api/
│   ├── 04-api-keys/
│   └── 05-codenix-auth-v0/
│
├── 06-testing-quality/
│   ├── 01-unit-tests/
│   ├── 02-api-tests/
│   ├── 03-integration-tests/
│   ├── 04-test-db/
│   └── 05-codenix-tests-v0/
│
├── 07-redis-workers/
│   ├── 01-redis-cache/
│   ├── 02-bullmq-jobs/
│   ├── 03-worker-retries/
│   ├── 04-dead-letter-queue/
│   └── 05-codenix-submission-worker-v0/
│
├── 08-realtime-observability/
│   ├── 01-server-sent-events/
│   ├── 02-websockets/
│   ├── 03-structured-logging/
│   ├── 04-health-metrics/
│   └── 05-codenix-live-submissions-v0/
│
├── 09-architecture/
│   ├── 01-mvc-refactor/
│   ├── 02-repository-pattern/
│   ├── 03-service-layer/
│   ├── 04-use-cases/
│   └── 05-codenix-clean-architecture-v0/
│
├── 10-production/
│   ├── 01-docker-compose/
│   ├── 02-env-config/
│   ├── 03-github-actions/
│   ├── 04-openapi-docs/
│   └── 05-codenix-deploy-v0/
│
├── 11-codenix-mvp/
│   ├── 01-problems-module/
│   ├── 02-users-auth-module/
│   ├── 03-submissions-module/
│   ├── 04-leaderboard-module/
│   ├── 05-contests-module/
│   ├── 06-editorials-module/
│   ├── 07-admin-module/
│   └── 08-codenix-api-mvp/
│
├── docker-compose.yml
├── README.md
└── ROADMAP.md
```

---

# Core Rule

Each project must include:

```txt
README.md
source code
examples
tests when applicable
notes in your own words
```

For APIs:

```txt
validation
error handling
status codes
basic tests
clear folder structure
```

For database projects:

```txt
schema
migrations
seed data
at least 3 real queries
```

For Codenix-related projects:

```txt
system decision
entities
endpoints
business rules
edge cases
```

---

# Phase 01 — CLI Foundations

Purpose: build confidence with Node, TypeScript, files, JSON, command flow and small tools before touching APIs.

## 01-task-tracker-cli

Build a CLI app to manage tasks.

### Features

```txt
add task
list tasks
mark done
delete task
filter by status
persist in JSON file
```

### Concepts

```txt
fs/promises
JSON persistence
command parsing
basic error handling
```

### Codenix connection

Later, Codenix needs scripts for seeding problems, importing statements, generating test cases and admin utilities.

---

## 02-github-activity-cli

Fetch GitHub user activity and show it in terminal.

### Features

```txt
fetch public events from GitHub API
show commits, issues, PRs
handle invalid username
handle network errors
```

### Concepts

```txt
fetch
external APIs
HTTP status codes
rate limits
terminal formatting
```

### Codenix connection

Codenix may later integrate with GitHub profiles, repositories or user activity.

---

## 03-expense-tracker-cli

Build a local expense tracker.

### Features

```txt
add expense
list expenses
filter by month
filter by category
summary by category
export JSON
```

### Concepts

```txt
dates
filters
aggregation
local persistence
```

### Codenix connection

This trains reports and summaries. Codenix will need user progress summaries and contest analytics.

---

## 04-codenix-problem-cli

Build a CLI to create local problem files.

### Features

```txt
create problem folder
generate statement.md
generate solution.md
generate tests.json
list local problems
validate problem metadata
```

### Concepts

```txt
file generation
project scaffolding
validation
developer tooling
```

### Codenix connection

This becomes the first admin tool for Codenix problem creation.

---

# Phase 02 — Node Core

Purpose: understand only the Node internals you will actually need for backend and Codenix.

## 01-event-loop

### Exercises

```txt
R01 - Predict execution order with setTimeout, Promise.then, queueMicrotask, process.nextTick.
R02 - Block the event loop for 3 seconds and measure HTTP delay.
R03 - Implement sleep(ms) with Promise.
R04 - Compare setImmediate vs setTimeout(fn, 0).
R05 - Create an endpoint that becomes slow when CPU is blocked.
```

### Codenix connection

A judge/submission system must not block the API process.

---

## 02-async-model

### Exercises

```txt
R06 - Convert callback-style function to Promise manually.
R07 - Implement retry(fn, attempts, delay).
R08 - Implement concurrencyLimit(tasks, limit).
R09 - Fetch 10 URLs with max 3 concurrent requests.
R10 - Compare Promise.all vs Promise.allSettled with failing jobs.
```

### Codenix connection

Submission processing, testcase running, imports and report generation all require controlled concurrency.

---

## 03-modules

### Exercises

```txt
R11 - Create ESM modules for validators, services and repositories.
R12 - Use dynamic import to load plugins.
R13 - Build a rule plugin system.
R14 - Resolve file paths using import.meta.url.
```

### Codenix connection

Codenix can use plugins later for languages, judge adapters, validators or problem importers.

---

## 04-streams

### Exercises

```txt
R15 - Read a large file line by line.
R16 - Stream a JSONL file and parse records.
R17 - Create a Transform stream that normalizes input.
R18 - Hash a file using streams.
```

### Codenix connection

Large submissions, logs, test files and generated outputs should be processed without loading everything into memory.

---

## 05-buffers-crypto

### Exercises

```txt
R19 - Convert string to base64 and back.
R20 - Detect file type by magic bytes.
R21 - Generate SHA-256 hash for a file.
R22 - Generate secure random tokens.
```

### Codenix connection

Useful for tokens, testcase fingerprints, file validation and submission integrity.

---

# Phase 03 — HTTP APIs

Purpose: learn how APIs work from raw HTTP to Express and Fastify.

## 01-native-http-server

### Features

```txt
GET /health
GET /problems
POST /problems
manual JSON body parsing
manual routing
```

### Concepts

```txt
http.createServer
request body as stream
status codes
headers
```

### Codenix connection

You understand what Express/Fastify abstracts.

---

## 02-express-health-api

### Features

```txt
GET /health
GET /version
global error handler
request logger
env validation
```

### Concepts

```txt
Express app/server separation
middleware chain
error middleware
dotenv
zod
```

---

## 03-express-todo-api

### Features

```txt
CRUD todos
validation
pagination
filter by status
tests with Supertest
```

### Concepts

```txt
controllers
services
repositories
DTOs
REST basics
```

---

## 04-fastify-health-api

### Features

```txt
GET /health
GET /version
schema validation
Pino logging
plugin structure
```

### Concepts

```txt
Fastify schema-first
plugins
encapsulation
structured logging
```

---

## 05-codenix-problems-api

### Features

```txt
POST /problems
GET /problems
GET /problems/:id
PATCH /problems/:id
DELETE /problems/:id
filter by difficulty
filter by tag
```

### Concepts

```txt
REST design
validation
pagination
domain-specific API
```

### Codenix connection

First real Codenix module.

---

# Phase 04 — Databases

Purpose: become dangerous with PostgreSQL and backend data modeling.

## 01-postgres-raw

### Exercises

```txt
R23 - Create tables manually.
R24 - Insert and query data using pg.
R25 - Use parameterized queries.
R26 - Write vulnerable SQL, then fix it.
R27 - Use transactions.
```

---

## 02-migrations-seeds

### Exercises

```txt
R28 - Create migration files manually.
R29 - Add seed data.
R30 - Reset database locally.
R31 - Add constraints and foreign keys.
```

---

## 03-blogging-platform-api

### Features

```txt
users
posts
comments
likes
tags
post search
pagination
top posts
```

### Concepts

```txt
JOIN
LEFT JOIN
GROUP BY
COUNT
N:M relationships
indexes
```

### Codenix connection

Problems, tags, comments, editorials and likes are similar patterns.

---

## 04-query-optimization

### Exercises

```txt
R32 - Use EXPLAIN ANALYZE.
R33 - Add index and compare before/after.
R34 - Detect N+1 query.
R35 - Optimize leaderboard query.
```

---

## 05-codenix-schema-v0

### Tables

```txt
users
problems
problem_tags
tags
test_cases
submissions
submission_results
contests
contest_problems
leaderboard_entries
editorials
```

### Deliverables

```txt
ER diagram
SQL schema
seed data
5 real queries
```

---

# Phase 05 — Auth & Access

Purpose: build real access control for future Codenix admin, users and judges.

## 01-auth-api

### Features

```txt
register
login
logout
GET /me
password hashing
protected routes
```

---

## 02-refresh-tokens

### Features

```txt
access token
refresh token
token rotation
logout invalidates refresh token
```

---

## 03-rbac-api

### Roles

```txt
admin
problem_setter
contest_manager
user
viewer
```

### Features

```txt
requireRole middleware
requirePermission middleware
ownership checks
```

---

## 04-api-keys

### Features

```txt
generate API key
store hashed key
validate API key
revoke API key
rate limit by key
```

### Codenix connection

Useful for future integrations, judge workers or admin tooling.

---

## 05-codenix-auth-v0

### Deliverables

```txt
users can register/login
admins can create problems
normal users can submit solutions
RBAC applied to Codenix routes
```

---

# Phase 06 — Testing & Quality

Purpose: stop writing code that only works by accident.

## 01-unit-tests

### Exercises

```txt
test validators
test services
test pure use cases
mock repositories
```

---

## 02-api-tests

### Exercises

```txt
test GET /health
test CRUD endpoints
test validation errors
test auth errors
```

---

## 03-integration-tests

### Exercises

```txt
run tests with real PostgreSQL
seed test database
clean database between tests
```

---

## 04-test-db

### Deliverables

```txt
test database config
migration test script
seed test helpers
factory functions
```

---

## 05-codenix-tests-v0

### Required tests

```txt
create problem
list problems
register/login
submit solution
get submission status
admin-only routes blocked for normal users
```

---

# Phase 07 — Redis & Workers

Purpose: build asynchronous backend features.

## 01-redis-cache

### Exercises

```txt
cache GET /problems
invalidate cache on update
cache leaderboard
TTL experiments
```

---

## 02-bullmq-jobs

### Exercises

```txt
create queue
add jobs
process jobs
handle failed jobs
retry with backoff
```

---

## 03-worker-retries

### Exercises

```txt
simulate random job failure
retry 3 times
move failed jobs to DLQ
record failure reason
```

---

## 04-dead-letter-queue

### Deliverables

```txt
failed_jobs table
retry failed job endpoint
dead-letter queue documentation
```

---

## 05-codenix-submission-worker-v0

### Features

```txt
POST /submissions returns 202 Accepted
submission job goes to queue
worker processes submission
status changes from queued → running → accepted/wrong_answer
results saved in DB
```

### Note

At this stage, execution can be simulated. Real sandbox comes later.

---

# Phase 08 — Realtime & Observability

Purpose: make Codenix feel alive and make the backend observable.

## 01-server-sent-events

### Exercise

```txt
stream submission status updates with SSE
```

---

## 02-websockets

### Exercise

```txt
broadcast contest updates to connected clients
```

---

## 03-structured-logging

### Deliverables

```txt
request id
method/path/status/duration logs
error logs
worker logs
```

---

## 04-health-metrics

### Endpoints

```txt
GET /health
GET /ready
GET /metrics
```

---

## 05-codenix-live-submissions-v0

### Features

```txt
live submission status
live contest leaderboard updates
worker emits events
API forwards events to client
```

---

# Phase 09 — Architecture

Purpose: refactor from “working code” to maintainable backend.

## 01-mvc-refactor

Refactor previous APIs into:

```txt
routes
controllers
services
repositories
schemas
errors
```

---

## 02-repository-pattern

### Exercise

```txt
ProblemRepository interface
PostgresProblemRepository
InMemoryProblemRepository
```

---

## 03-service-layer

### Exercise

```txt
ProblemService
SubmissionService
ContestService
AuthService
```

---

## 04-use-cases

### Use cases

```txt
CreateProblem
SubmitSolution
StartContest
UpdateLeaderboard
PublishEditorial
```

---

## 05-codenix-clean-architecture-v0

Target structure:

```txt
src/
  domain/
  application/
  infrastructure/
  interfaces/
  shared/
```

Rule:

```txt
domain imports nothing from infrastructure
application defines use cases
infrastructure implements DB/queue/cache
interfaces expose HTTP routes/controllers
```

---

# Phase 10 — Production

Purpose: prepare backend for real deployment and portfolio quality.

## 01-docker-compose

Services:

```txt
api
postgres
redis
worker
```

---

## 02-env-config

Deliverables:

```txt
.env.example
config validation
separate dev/test/prod config
```

---

## 03-github-actions

Pipeline:

```txt
install
lint
test
build
```

---

## 04-openapi-docs

Deliverables:

```txt
OpenAPI spec
document auth
document errors
document request/response schemas
```

---

## 05-codenix-deploy-v0

Deliverables:

```txt
Dockerized API
Dockerized worker
PostgreSQL + Redis
README deployment guide
public demo if possible
```

---

# Phase 11 — Codenix MVP

Purpose: build the first serious version of Codenix.

## 01-problems-module

Features:

```txt
CRUD problems
difficulty
tags
constraints
examples
test cases
```

---

## 02-users-auth-module

Features:

```txt
register/login
profile
roles
permissions
```

---

## 03-submissions-module

Features:

```txt
create submission
submission status
submission history
submission results
language field
runtime/memory fields
```

---

## 04-leaderboard-module

Features:

```txt
global leaderboard
problem leaderboard
contest leaderboard
ranking by solved count and penalty
```

---

## 05-contests-module

Features:

```txt
create contest
add problems
start/end time
contest submissions
contest standings
```

---

## 06-editorials-module

Features:

```txt
problem editorial
solution explanation
code snippets
visibility control
```

---

## 07-admin-module

Features:

```txt
admin dashboard API
user management
problem management
contest management
submission moderation
```

---

## 08-codenix-api-mvp

Final MVP requirements:

```txt
auth
RBAC
problems
tags
test cases
submissions
worker queue
simulated judge
leaderboard
contests
editorials
OpenAPI
tests
Docker
README
```

---

# Weekly Execution Plan

## Monday to Friday

```txt
Main block: backend lab
Secondary block: CP or SQL
Tiny block: notes/refactor/tests
```

## Saturday

```txt
AtCoder contest
upsolve 1 hard problem
backend light if energy exists
```

## Sunday

```txt
review week
document lessons
plan next folder
clean repo
```

---

# Definition of Progress

Progress is not watching videos.

Progress is:

```txt
a script that runs
an endpoint that responds
a failing test that becomes green
a query that works
a README that explains a decision
a bug understood and documented
```

---

# Final Message

This roadmap exists for one purpose:

```txt
Backend skill → Codenix
```

You are not building random APIs.

You are building the foundation for a real platform.

Finish the lab.
Then build Codenix.
