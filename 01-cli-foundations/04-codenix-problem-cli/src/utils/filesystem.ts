import { mkdirSync, writeFileSync, existsSync, readdirSync, readFileSync, read } from "node:fs";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { error } from 'node:console';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const PBM_PATH = path.resolve(
    __dirname,
    "../../"
);

export function createDirectory(targetPath: string): void {
    try {
        if (directoryExists(targetPath)) {
            console.log(`❌ Directory already exists.`);
        } else {
            mkdirSync(targetPath, { recursive: true });
            console.log(`Directory ready at: ${targetPath}`);
        }
    } catch (error) {
        console.log(`Failed to create directory: ${error}`);
        throw error;
    }
}

export function createFile(fileName: string, content: string): void {
    try {
        writeFileSync(fileName, content, 'utf-8');
        console.log(`Archivo creado en ${fileName}`);
    } catch (error) {
        console.log(`Error at creating file: ${error}.`);
        throw error;
    }
}

export function directoryExists(folderName: string): boolean {
    return existsSync(folderName);
}

export function fileExists(filename: string): boolean {
    return existsSync(filename);
}

export function getFolderContents(targetPath: string): string[] {
    return readdirSync(targetPath);
}

export function readFileContents(filePath: string): string {
    try {
        const fileContent: string = readFileSync(filePath, 'utf-8');
        return fileContent;
    } catch (error) {
        console.error('File content reading error:', error);
        return '';
    }
}

export function parseToJSONFormat(fileContent: string): JSON {
    try {
        const contentParsed: JSON = JSON.parse(fileContent);
        return contentParsed;
    } catch (error) {
        console.error('Error parsing content to JSON format:', error);
        return JSON.parse('');
    }
}