import { writeFile } from "node:fs";
import type { Expense } from "../models/expense.js";
import { addExpense } from "../services/expense.service.js";

export async function addCommand(expense: Expense) {
   await addExpense(expense);
}