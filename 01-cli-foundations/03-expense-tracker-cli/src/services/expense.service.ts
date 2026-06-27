import { error } from "node:console";
import type { Expense } from "../models/expense.js";
import { readExpenses, writeExpenses } from "../repositories/expense.repository.js";

export async function addExpense(expense: Expense) {
    const expenses = await readExpenses();
    expenses.push(expense);
    await writeExpenses(expenses);
    console.log(`Expense added: #${expense.id} ${expense.description} ${expense.amount}`);
}

export async function deleteExpense(id: string) {
    const expenses = await readExpenses();
    const idValidate = expenses.find((item) => item.id === id);

    if (!idValidate) {
        console.log(`Expense ${id} not exists.`);
        return;
    }

    const filtered = expenses.filter((item) => item.id !== id);
    await writeExpenses(filtered);
}

export async function listExpenses() {
    const expenses = await readExpenses();

    if (expenses.length === 0) {
        console.log("Expense list is empty.");
        return;
    }

    for (const expense of expenses) {
        console.log(
            `#${expense.id} ${expense.description} [${expense.amount}]`
        )
    }    
}

export async function updateExpenses(id: string, expense: Record<string, string>) {
    const expenses = await readExpenses();
    const idValid = expenses.find((item) => item.id === id);
    const currentExpense = expenses.filter((item) => item.id === id)[0];

    if (!idValid || !currentExpense) {
        console.log(
            `The expense ${id} doesn't exists.`
        );
        return;
    }
    
    const filtered = expenses.filter((item) => item.id !== id);
    const descriptionUpdate = expense.description ?? currentExpense.description;
    const amountUpdate = Number(expense.amount) ?? currentExpense.amount;

    const expenseUpdated: Expense = {
        id: id,
        description: descriptionUpdate,
        date: new Date().toISOString(),
        amount: amountUpdate
    };
    filtered.push(expenseUpdated);
    await writeExpenses(filtered);
}