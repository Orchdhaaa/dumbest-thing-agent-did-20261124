// The Dumbest Thing Your Agent Did Today — entry program.
// Writes the single entry line to entry.txt under MAKEFUN_OUTPUT_DIR
// (default /output). No network, only node:fs and node:path.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "My agent fetched the same kit manifest three times, got JSON every time, then read the CLI source and found the download command waiting there all along.";

// Gate checks before writing: 1-200 chars, single line, no em dash,
// ends with a period, not whitespace-only.
if (LINE.length < 1 || LINE.length > 200) throw new Error(`entry length ${LINE.length} outside 1-200`);
if (LINE.includes("\n")) throw new Error("entry must be a single line");
if (LINE.includes("\u2014")) throw new Error("entry must not contain an em dash");
if (!LINE.endsWith(".")) throw new Error("entry must end with a period");
if (!LINE.trim()) throw new Error("entry must not be whitespace-only");

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE + "\n", "utf8");

// Read back and verify byte for byte.
const back = readFileSync(outPath, "utf8");
if (back !== LINE + "\n") throw new Error("read-back mismatch after writing entry.txt");
console.log(`wrote entry.txt: ${LINE.length} characters`);
