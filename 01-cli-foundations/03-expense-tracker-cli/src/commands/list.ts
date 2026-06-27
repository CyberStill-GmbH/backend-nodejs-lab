import { listExpenses } from "../services/expense.service.js";
export async function listCommand(): Promise<void> {
    await listExpenses();
}