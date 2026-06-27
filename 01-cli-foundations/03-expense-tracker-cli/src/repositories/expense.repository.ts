import { readFile, writeFile } from "node:fs/promises";
import type { Expense } from "../models/expense.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const DB_PATH = path.resolve(
  __dirname,
  "../../database/expense.json"
);

export async function readExpenses(): Promise<Expense[]> {
    try {
        const data = await readFile(DB_PATH, "utf-8");
        return JSON.parse(data) as Expense[];
    } catch {
        return [];
    }    
}

export async function writeExpenses(expenses: Expense[]): Promise<void> {
    await writeFile(DB_PATH, JSON.stringify(expenses, null, 2), "utf-8")
}