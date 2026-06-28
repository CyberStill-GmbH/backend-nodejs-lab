import { type GitHubEvent } from './types.js';

export const GithubFormatter = {
    format(event: GitHubEvent): string {
        const date = new Date(event.created_at).toLocaleDateString();
        const prefix = `[${date}] ${event.actor.login}`;

        switch (event.type) {
            case 'PushEvent':
                return `${prefix} pushed changes to ${event.repo.name}`;
            case 'PullRequestEvent':
                const action = event.payload.action;
                const title = event.payload.pull_request?.title ?? "untitled pull request";
                
                return `${prefix} ${action} a pull request in ${event.repo.name}: "${title}"`;
            case 'CreateEvent':
                return `${prefix} created a new ${event.payload.ref_type}: ${event.repo.name}`;
            case 'WatchEvent':
                return `${prefix} starred ${event.repo.name}`;
            default:
                return `${prefix} performed an unknown action (${event.type}) in ${event.repo.name}`
        }
    },

    // Formatting an entire list
    formatManyEvents(events: GitHubEvent[]): string[] {
        return events.map(event => this.format(event));
    }
};