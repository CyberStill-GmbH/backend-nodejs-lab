import { directoryExists, getFolderContents, PBM_PATH } from "../utils/filesystem.js";
import path from "node:path";

export function listCommand(): string[] {
    const problemsFolder = path.join(PBM_PATH, 'problems');
    
    if (directoryExists(problemsFolder)) {
        const files: string[] = getFolderContents(problemsFolder);
        return files;
    } else {
        throw new Error('Problems folder does not exists.');
    }
}