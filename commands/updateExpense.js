import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import listExpenses from "./listExpenses.js";
import inquirer from "inquirer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, '../expenses.json');

export default async function updateExpense() {
    let expenses = await listExpenses();

    if (expenses.length === 0){
        console.log("No expenses added yet.");
        return;
    }

    const { selectedExpense } = await inquirer.prompt([
        {
            type: "list",
            name: "selectedExpense",
            message: "Select an expense to delete.",
            choices: expenses.map(expense => expense.description)
        }
    ]);

    let expenseToBeUpdated = expenses.find(expense => expense.description === selectedExpense);

    const update = await inquirer.prompt([
        {
            type: "input",
            name: "description",
            message: "Input an updated description. Leave blank if you do not want to update this field."
        },
        {
            type: "number",
            name: "amount",
            message: "Input an updated amount. Leave blank if you do not want to update this field."
        }
    ]);

    expenses[expenseToBeUpdated.id - 1] = {
        id: expenseToBeUpdated.id,
        date: expenseToBeUpdated.date,
        description: update.description ? update.description : expenseToBeUpdated.description,
        amount: update.amount ? update.amount : expenseToBeUpdated.amount
    }

    try {
        await fs.writeFile(filePath, JSON.stringify(expenses, null, 2), "utf-8");
        console.log("Expense updated successfully!");
    } catch (error) {
        console.error("Failed to update expense: ", error);
    }
}
