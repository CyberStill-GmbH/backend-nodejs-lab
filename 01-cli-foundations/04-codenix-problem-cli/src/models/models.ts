export const TAGS_SET = new Set([
  // Arrays & Strings
  "array",
  "string",
  "matrix",
  "simulation",

  // Data Structures
  "linked-list",
  "stack",
  "queue",
  "deque",
  "priority-queue",
  "heap",
  "hash-table",
  "set",
  "map",
  "ordered-set",
  "ordered-map",
  "disjoint-set",
  "trie",
  "segment-tree",
  "fenwick-tree",
  "sparse-table",
  "sqrt-decomposition",
  "treap",

  // Searching & Sorting
  "binary-search",
  "ternary-search",
  "sorting",
  "two-pointers",
  "sliding-window",
  "prefix-sum",
  "difference-array",

  // Greedy & DP
  "greedy",
  "dynamic-programming",
  "bitmask-dp",
  "digit-dp",
  "tree-dp",
  "interval-dp",

  // Graphs
  "graph",
  "tree",
  "dfs",
  "bfs",
  "topological-sort",
  "shortest-path",
  "dijkstra",
  "bellman-ford",
  "floyd-warshall",
  "minimum-spanning-tree",
  "union-find",
  "lca",
  "heavy-light-decomposition",
  "centroid-decomposition",
  "euler-tour",
  "bridge",
  "articulation-point",
  "strongly-connected-components",
  "bipartite",
  "max-flow",
  "min-cost-flow",
  "matching",

  // Recursion & Backtracking
  "recursion",
  "backtracking",
  "branch-and-bound",

  // Divide & Conquer
  "divide-and-conquer",
  "meet-in-the-middle",

  // Math
  "math",
  "number-theory",
  "prime",
  "sieve",
  "gcd",
  "lcm",
  "modular-arithmetic",
  "modular-inverse",
  "combinatorics",
  "probability",
  "game-theory",
  "geometry",
  "computational-geometry",

  // Bit Manipulation
  "bit-manipulation",
  "bitmask",

  // Strings
  "string-matching",
  "kmp",
  "z-algorithm",
  "rolling-hash",
  "suffix-array",
  "suffix-automaton",
  "manacher",
  "palindrome",

  // Advanced
  "monotonic-stack",
  "monotonic-queue",
  "offline-query",
  "mo-algorithm",
  "randomized",
  "interactive",

  // Misc
  "implementation",
  "constructive-algorithms",
  "ad-hoc"
]);

export type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'easy' | 'medium' | 'hard';

export interface Problem {
    name: string;
    path: string;
}

export interface ProblemMetadata {
    title: string;
    slug: string;
    difficulty: string;
    tags: string[]
}