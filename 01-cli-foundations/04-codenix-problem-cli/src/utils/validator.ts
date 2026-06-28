import { join} from "node:path";
import path from "node:path";
import { fileExists } from "./filesystem.js";
import { isValidTag } from "./helpers.js";
import type { ProblemMetadata } from "../models/models.js";

export function validateFiles(problemPath: string): string[] {
    const errors: string[] = [];

    const requiredFiles: string[] = [
        'solution.md',
        'statement.md',
        'metadata.json',
        'tests.json'
    ];

    requiredFiles.forEach((file: string) => {
        const filePath = join(problemPath, file);

        if (!fileExists(filePath)) {
        errors.push(
            `❌ Problem[${path.basename(problemPath)}] missing ${file}`
        )
    }
    });

    return errors;
}

export function validateMetadata(metadata: ProblemMetadata): string[] {
    const errors: string[] = [];

    if (!metadata.title) {
        errors.push(`⚠️ Metadata Error: empty title`);
    }

    if (!metadata.slug) {
        errors.push(`⚠️ Metadata Error: empty slug`);
    }

    if (!metadata.difficulty) {
        errors.push(`⚠️ Metadata Error: empty difficulty`);
    }

    if (!metadata.tags) {
        errors.push(`⚠️ Metadata Error: empty title`);
    }

    return errors
}

export function validateDifficulty(difficulty: string) {
    const errors: string[] = [];

    if(!difficulty) return errors;

    const posibilities: string[] = [
        'easy',
        'medium',
        'hard'
    ];
    const posibleDifficultyNames = new Set(posibilities); 

    if (!posibleDifficultyNames.has(difficulty.toLowerCase())) {
        errors.push(`⚠️ Difficulty Error: unerecognized ${difficulty}`);
    }

    return errors
}

export function validateTags(tags: string[]): string[] {
    const errors: string[] = [];
    
    if (!tags) return [];
    tags.forEach((tag: string) => {
        if (!(isValidTag(tag.toLowerCase()))) {
            errors.push(`⛔ Invalid Tag: ${tag}`);
        }
    });

    return errors
}