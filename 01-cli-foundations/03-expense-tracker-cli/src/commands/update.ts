import { updateExpenses } from "../services/expense.service.js";
import type { Expense } from "../models/expense.js"

export async function updateCommand(id: string, expanseUpdate: Record<string, string>) {
    await updateExpenses(id, expanseUpdate);
}