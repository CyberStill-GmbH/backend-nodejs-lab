import { join } from "node:path";
import { createDirectory, createFile, PBM_PATH } from "../utils/filesystem.js";
import { metadataTemplate, solutionTemplate, statementTemplate, testsTemplate } from "../utils/templates.js";

export async function createCommand(problem: string): Promise<void> {
    try {
        const problemsDirectory = join(PBM_PATH, 'problems');
        createDirectory(problemsDirectory);

        const newProblemPath = join(problemsDirectory, problem);
        createDirectory(newProblemPath);

        const createStatement = join(newProblemPath, 'statement.md');
        createFile(
            createStatement,
            statementTemplate(problem)
        );

        const createSolution = join(newProblemPath, 'solution.md');
        createFile(
            createSolution,
            solutionTemplate()
        );

        const createTests = join(newProblemPath, 'tests.json');
        createFile(
            createTests,
            testsTemplate()
        );

        const createMetadata = join(newProblemPath, 'metadata.json');
        createFile(
            createMetadata,
            metadataTemplate(problem)
        );
    } catch (error) {
        console.log('❌ Create command unexpected error:', error);
        throw error;
    }
}