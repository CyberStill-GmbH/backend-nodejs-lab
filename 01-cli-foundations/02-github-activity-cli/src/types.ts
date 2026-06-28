export interface GitHubEvent {
    id: string;
    created_at: string;
    actor: {
        login: string;
        avatar_url: string;
    };
    repo: {
        name: string;
    };
    type:
        | "PushEvent"
        | "PullRequestEvent"
        | "WatchEvent"
        | "CreateEvent"
        | "IssuesEvent"
        | "ForkEvent"
        | string;

    payload: {
        // Shared by PushEvent / CreateEvent
        ref?: string | null;

        // PushEvent
        size?: number;
        commits?: {
            sha: string;
            message: string;
            author?: {
                name?: string;
                email?: string;
            };
            url?: string;
        }[];

        // PullRequestEvent / IssuesEvent
        action?: "opened" | "closed" | "reopened" | "started" | string;
        pull_request?: {
            title: string;
            html_url: string;
        };
        issue?: {
            title: string;
            html_url: string;
        };

        // CreateEvent
        ref_type?: "repository" | "branch" | "tag";

        // ForkEvent
        forkee?: {
            full_name: string;
            html_url: string;
        };
    };
}

export interface GitHubError {
    message: string;
    status: number;
}