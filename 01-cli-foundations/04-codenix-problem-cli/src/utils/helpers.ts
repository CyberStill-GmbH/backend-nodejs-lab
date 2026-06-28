import { TAGS_SET } from "../models/models.js";
import { error } from 'node:console';

export function showHelp(): void {
    console.log('\n🚀 === CODENIX CLI HELP ===');
    console.log('Uso: npx tsx src/index.ts <comando> [argumentos]');
    console.log('\nComandos disponibles:');
    console.log('  create <nombre>  - Crea un nuevo problema (ej: create suma-numeros)');
    console.log('  list             - Muestra todos los problemas locales');
    console.log('  validate         - Valida el estado actual');
    console.log('  help             - Muestra este menú de ayuda\n');
}

export function validationErrors(validationResult: Array<string[]>): void {
    const sections = [
        "File Validation",
        "Metadata Validation",
        "Difficulty Validation",
        "Tag Validation",
    ];

    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const errors = validationResult[i];

        const hasErrors = errors && errors.length > 0;

        console.log("\n============================");
        console.log(`${section}`);

        if (!hasErrors) {
            console.log("🟢 Passed");
            continue;
        }

        console.log("============================");

        for (const err of errors) {
            console.log(`❌ ${err}`);
        }
    }

    console.log("\n_____________________________\n");
}

export function isValidTag(tag: string) {
    return TAGS_SET.has(tag);
}