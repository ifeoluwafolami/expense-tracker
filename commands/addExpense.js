import {promises as fs} from "fs";
import path from "path";
import { fileURLToPath } from "url";
import listExpenses from "./listExpenses.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, '../expenses.json');

export default async function addExpense(description, amount, category="Uncategorized") {
    let expenses = await listExpenses();
    
    let newExpense = {
        id: expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1,
        date: new Date().toISOString().split('T')[0],
        description: description,
        amount: amount,
        category: category
    };

    expenses.push(newExpense);

    try {
        await fs.writeFile(filePath, JSON.stringify(expenses, null, 2), "utf-8");
        console.log("New expense added successfully.");
    } catch (writeError) {
        console.error("Error writing to file: ", writeError);
    }

    console.log(newExpense);
}
