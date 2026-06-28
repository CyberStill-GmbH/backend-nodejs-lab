export function printHelp(): void {
    console.log(`
        Expense Tracker CLI

        Commands:
        add --description "expense title" --amount "expense amount" Add a new expense
        list                   List all expenses
        delete <id>            Delete task

        Examples:
        npm run dev --add "café" --amount 8
        npm run dev --list
        npm run dev --delete 1
    `);
}

export function parseArgs(args: string[]): Record<string, string> {
    const result: Record<string, string> = {};

    for (let i = 0; i < args.length; i++) {
        if (args[i]?.startsWith("--")) {
            const key = args[i]?.replace("--", "");
            const value = args[i + 1];

            if (key && value) {
                result[key] = value;
            }

            i++;
        }
    }

    return result;
}