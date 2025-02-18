import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import listExpenses from "./listExpenses.js";
import inquirer from "inquirer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, '../expenses.json');

export default async function deleteExpense() {
    let expenses = await listExpenses();

    const { selectedExpense } = await inquirer.prompt([
        {
            type: "list",
            name: "selectedExpense",
            message: "Select an expense to delete.",
            choices: expenses.map(expense => expense.description)
        }
    ]);

    let expenseToBeDeleted = expenses.find(expense => expense.description === selectedExpense);

    expenses.splice((expenseToBeDeleted.id - 1), 1);

    // Reorder IDs
    expenses.forEach((expense, index) => {
        expense.id = index + 1;
    });

    try {
        await fs.writeFile(filePath, JSON.stringify(expenses, null, 2), "utf-8");
        console.log("Expense deleted successfully!");
    } catch (error) {
        console.error("Failed to delete expense: ", error);
    }
}
