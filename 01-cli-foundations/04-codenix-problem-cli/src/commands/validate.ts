import { join } from "node:path";
import { directoryExists, fileExists, PBM_PATH, readFileContents } from "../utils/filesystem.js";
import { validateDifficulty, validateFiles, validateMetadata, validateTags } from '../utils/validator.js';
import type { ProblemMetadata } from "../models/models.js";

export function validateCommand(problem: string): Array<string[]> {
    const problemsPath = join(PBM_PATH, 'problems');

    if (!directoryExists(problemsPath)) {
        throw new Error('Problems folder does not exists.');
    }

    const problemAnalyzedPath = join(problemsPath, problem);

    const fileErrors: string[] = validateFiles(problemAnalyzedPath);

    const metadataFilePath = join(problemAnalyzedPath, 'metadata.json');

    let metadataErrors: string[];
    const plainTextMetaData = readFileContents(metadataFilePath);

    if (!fileExists(metadataFilePath)) metadataErrors = [];

    const jsonMetadata = JSON.parse(plainTextMetaData) as ProblemMetadata;
    metadataErrors = validateMetadata(jsonMetadata);

    const difficultyErrors: string[] = validateDifficulty(jsonMetadata.difficulty);

    const tagsErrors: string[] = validateTags(jsonMetadata.tags);

    return [fileErrors, metadataErrors, difficultyErrors, tagsErrors];
}