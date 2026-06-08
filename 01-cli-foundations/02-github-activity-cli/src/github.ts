import process from 'node:process';
import { type GitHubError, type GitHubEvent } from './types.js';
import dotenv from "dotenv";
import { error } from 'node:console';

dotenv.config();


export async function GithubRequest(gitUser: string): Promise<GitHubEvent[]> {
    try {
        const url = `https://api.github.com/users/${gitUser}/events/public`;
    
        const response = await fetch(url);

        if (!response.ok) {
            const errorData: GitHubError = {
                message: `User '${gitUser}' not found or API error`,
                status: response.status
            };
            throw errorData
        }
        
        const events = (await response.json()) as GitHubEvent[];

        return events;
    } catch (error) {
        throw error;
    }
}

