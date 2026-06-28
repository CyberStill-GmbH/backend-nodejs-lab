import process from "node:process";
import { createCommand } from "./commands/create.js";
import { listCommand } from "./commands/list.js";
import { showHelp, validationErrors } from "./utils/helpers.js";
import { validateCommand } from "./commands/validate.js";

async function main(): Promise<void> {
    const [, , command, ...args] = process.argv;

    if (!command || command === 'help' || command === '--help' || command === 'h') {
        showHelp();
        return;
    }

    switch (command) {
        case 'create':
            const problemName = args[0];

            if (!problemName) {
                throw new Error("Empty problem name. Try Again.");
            }

            createCommand(problemName);

            break;
        case 'list':
            const problemList = listCommand();

            if (problemList.length === 0) {
                console.log('There is not problems to show. Create some.');
                break;
            }
            
            console.log('📚 Local problems\n');
            problemList.forEach((file: string) => {
                console.log(
                    `✓ ${file}`
                );
            });

            break;
        case 'validate':
            const problemsAnalyzed = listCommand();
            
            problemsAnalyzed.forEach((file: string) => {
                console.log(`==========Analyze ${file}=============`);
                const validationOutput: Array<string[]> = validateCommand(file);
                validationErrors(validationOutput);
            });
            break;
        default:
            console.log('Unknown command.');
    }
}

main().catch((error) => {
    console.log("Unexpected error:", error?.message | error);
    process.exit(1);
});