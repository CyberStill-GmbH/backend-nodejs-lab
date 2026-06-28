import process from 'node:process';
import { listCommand} from './commands/list.js';
import { deleteCommand } from './commands/delete.js';
import { addCommand } from './commands/add.js';
import { printHelp, parseArgs } from './utils/expense.utils.js';
import type { Expense } from './models/expense.js';
import { updateCommand } from './commands/update.js';

async function main(): Promise<void> {
    const [, ,command, ...args] = process.argv;
    
    if (!command) {
        printHelp();
        return;
    }

    switch (command) {
        case 'add':
            const parsed = parseArgs(args);

            if (!parsed.description || !parsed.amount) {
                throw new Error("Missing fields");
            }
        
            const expense: Expense = {
                id: crypto.randomUUID(),
                description: parsed.description,
                amount: Number(parsed.amount),
                date: new Date().toISOString()
            }

            await addCommand(expense);
            break;

        case 'list':
            await listCommand();
            break;
        
        case 'update':
            const parseUpdate = parseArgs(args);    
            
            if (!parseUpdate.id) {
                throw new Error("id not specified");
            }

            await updateCommand(parseUpdate.id, parseUpdate);
            console.log(`
                #${parseUpdate.id} was sucessfully updated.
            `);
            break

        case 'delete':
            const idToDelete = parseArgs(args);

            if (!idToDelete.id) {
                throw new Error("Id not specified");
            }

            await deleteCommand(idToDelete.id);

            console.log(
                `Expense ${idToDelete.id} deleted!`
            );
            break;

        default:
            console.log("unknown command.");
    }
}

main().catch((error) => {
    console.log("Unexpected error:", error);
    process.exit(1);
});

