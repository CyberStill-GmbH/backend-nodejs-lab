import { deleteExpense } from "../services/expense.service.js";

export async function deleteCommand(target: string) {
    await deleteExpense(target);
}