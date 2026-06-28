export function statementTemplate(title: string): string {
    return `# ${title}

## Description

Write the problem statement here.

## Input

-

## Output

-

## Constraints

-

## Examples

`;
}

export function solutionTemplate(): string {
    return `# Solution

## Idea

Explain the algorithm.

## Complexity

Time: O()

Space: O()
`;
}

export function testsTemplate(): string {
    return JSON.stringify([], null, 2);
}

export function metadataTemplate(title: string): string {
    const slug = title.toLowerCase().replace(/\s+/g, "-");

    return JSON.stringify(
        {
            title,
            slug,
            difficulty: "Easy",
            tags: []
        },
        null,
        2
    );
}