# Expense Tracker CLI

A simple command-line expense tracker built with **Node.js** and **TypeScript**.

This project is part of my **Backend Node.js Lab**, where I build small applications to practice backend development fundamentals, clean code, TypeScript, and software architecture.

---

## Features

- Add a new expense
- List all expenses
- Update an existing expense
- Delete an expense
- JSON file persistence
- Layered architecture (Commands → Services → Repository)

---

## Project Structure

```text
database/
│   └── expense.json
src/
├── commands/
│   ├── add.ts
│   ├── delete.ts
│   ├── list.ts
│   └── update.ts
│
├── services/
│   └── expense.service.ts
│
├── repositories/
│   └── expense.repository.ts
│
├── models/
│   └── expense.ts
│
├── utils/
│   └── expense.utils.ts
│
└── index.ts
```

---

## Architecture

This project follows a simple layered architecture.

```
CLI
│
▼
Commands
│
▼
Services
│
▼
Repository
│
▼
JSON Database
```

### Responsibilities

| Layer | Responsibility |
|--------|----------------|
| Commands | Receive CLI requests and invoke the corresponding service |
| Services | Implement business logic |
| Repository | Read and write expense data |
| Models | Define application types |
| Utils | Shared helper functions |

---

## Installation

Clone the repository

```bash
git clone https://github.com/CyberStill-GmbH/backend-nodejs-lab.git
```

Navigate to the project

```bash
cd 01-cli-foundations/03-expense-tracker-cli
```

Install dependencies

```bash
npm install
```

---

## Available Scripts

Run in development

```bash
npm run dev
```

Compile the project

```bash
npm run build
```

Run compiled version

```bash
npm start -- list
```

Type checking

```bash
npm run typecheck
```

Watch type checking

```bash
npm run typecheck:watch
```

---

## Usage

### Add an expense

```bash
npm start -- add --description "Coffee" --amount 5
```

### List expenses

```bash
npm start -- list
```

Example output

```text
#51c2ca9d Coffee [5]
```

### Update an expense

```bash
npm start -- update --id 51c2ca9d --amount 8
```

### Delete an expense

```bash
npm start -- delete --id 51c2ca9d
```

---

## Technologies

- Node.js
- TypeScript
- Node File System API
- npm

---

## Learning Goals

This project focuses on:

- Building command-line applications
- TypeScript fundamentals
- Layered architecture
- File persistence
- Separation of concerns
- Backend project organization

---

## Future Improvements

- Expense categories
- Monthly summaries
- CSV export
- Budget management
- Unit testing
- Input validation library
- SQLite persistence

---

## License

This project is intended for educational purposes.