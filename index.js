#!/usr/bin/env node

import addExpense from "./commands/addExpense.js";
import deleteExpense from "./commands/deleteExpense.js";
import filterExpenses from "./commands/filterExpenses.js";
import listExpenses from "./commands/listExpenses.js";
import summarizeExpenses from "./commands/summarizeExpenses.js";
import updateExpense from "./commands/updateExpense.js";

import { Command } from "commander";

const program = new Command();

program
.name('expense-tracker')
.description('An expense tracker to help manage finances')
.version('1.0.0');

program
.command('add')
.description('Add a new expense')
.option('-d, --description <description>', 'Description of expense')
.option('-a, --amount <amount>', 'Cost of expense')
.option('-c, --category <category>', 'Category of expense')
.action(async (options) => {
    const {description, amount, category} = options;

    if (!description || !amount) {
        console.error('Description and amount fields are required.');
        process.exit(1);
    }

    await addExpense(description, parseFloat(amount), category);
});


program
.command('delete')
.description('Delete an expense')
.action(() => deleteExpense());

program
.command('filter')
.description('Filter through all expenses by category')
.action(() => filterExpenses());

program
.command('list')
.description('List all expenses')
.action(async () => {
    let expenses = await listExpenses();
    console.log("Expenses: ", expenses ? expenses : "No expenses found.");
});


program
.command('summarize')
.description('Give a summary of expenses')
.action(() => summarizeExpenses());

program
.command('update')
.description('Update an expense')
.action(() => updateExpense());

program.parse();