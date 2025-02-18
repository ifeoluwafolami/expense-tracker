import listExpenses from "./listExpenses.js";
import chalk from "chalk";

export default async function summarizeExpenses() {
    let expenses = await listExpenses();

    let numberOfExpenses = expenses.length;
    console.log(chalk.greenBright("Total Number Of Expenses: "), numberOfExpenses);
    
    let totalAmountSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    console.log(chalk.greenBright("Total Amount Spent: "), totalAmountSpent);

    let mostExpensiveExpenseCost = Math.max(...expenses.map(expense => expense.amount));

    let mostExpensiveExpense = expenses.filter(expense => expense.amount === mostExpensiveExpenseCost).map(expense => `${expense.description}: ${expense.amount}`);
    
    console.log(chalk.greenBright("Most Expensive Expense: "));
    for(let expense of mostExpensiveExpense) {
        console.log(expense);
    }

    let leastExpensiveExpenseCost = Math.min(...expenses.map(expense => expense.amount));

    let leastExpensiveExpense = expenses.filter(expense => expense.amount === leastExpensiveExpenseCost).map(expense => `${expense.description}: ${expense.amount}`);
    
    console.log(chalk.greenBright("Least Expensive Expense: "));
    for(let expense of leastExpensiveExpense) {
        console.log(expense);
    }
    
}
