import listExpenses from "./listExpenses.js";
import inquirer from "inquirer";

export default async function filterExpenses() {
    const expenses = await listExpenses();

    const categoryList = expenses.map(expense => expense.category);
    // console.log(categoryList);

    const categorySet = Array.from(new Set(categoryList));
    // console.log(categorySet);

    const groupedExpenses = {};

    categorySet.forEach(cat => {
        groupedExpenses[cat] = expenses.filter(expense => expense.category === cat).map(({description, amount}) => `${description}: ${amount}`);
    });

    const {selectedCategory} = await inquirer.prompt([
        {
            type: "list",
            name: "selectedCategory",
            message: "Choose a category.",
            choices: categorySet
        }
    ]);

    console.log(groupedExpenses[selectedCategory]);
}
