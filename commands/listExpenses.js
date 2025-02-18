import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, '../expenses.json');

export default function listExpenses() {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf-8", (err, data) => {
            if (err) {
                console.error("Error reading file: ", err);
                reject(err);
                return;
            }

            try {
                let expenses = JSON.parse(data);
                // console.log(expenses);
                resolve(expenses);
            } catch (parseError) {
                console.error("Error parsing JSON data: ", parseError);
            }
        })
    })
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
    listExpenses().then(expenses => console.log("My Expenses: ", expenses));
}