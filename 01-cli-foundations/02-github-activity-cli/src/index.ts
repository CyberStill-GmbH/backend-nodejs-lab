import { GithubRequest } from './github.js';
import { GithubFormatter } from './formatter.js';
import type { GitHubEvent } from './types.js';



async function main(): Promise<void> {
    const [, , command, ...args] = process.argv;

    if (!command || command !== 'user') {
        printHelp();
        return;
    }

    if (args.length !== 1) {
        console.log("You must provide just one username per request");
        return;
    }

    const username = args.join("").trim();

    if (!username) {
        console.log("Error: Undifined GitHub username");
        return;
    }

    const userEvents: GitHubEvent[] = await GithubRequest(username);
    const formatingEvents: string[] = GithubFormatter.formatManyEvents(userEvents);

    for (const [idx, event] of formatingEvents.entries()) {
        console.log(`#${idx + 1} ${event}`);
    }
}

function printHelp(): void {
    console.log(`
GitHub Activity Cli

Commands:
  user "task title"       List user activity
  
Examples:
  npm run dev -- user "BullShit"
`);

}

main().catch((error) => {
    console.log("Unexpected error ocurried:", error);
    process.exit(1);
});