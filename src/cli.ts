#!/usr/bin/env node
import { writeFile } from "node:fs/promises";
import { generateSinglePagePDF } from "./generateSinglePagePDF.js";

const url = process.argv[2];
const outputPath = process.argv[3];

if (!url || !outputPath) {
	console.error("Usage: one-page-pdf <url> <output_file>");
	process.exit(1);
}

const pdfData = await generateSinglePagePDF(url);
await writeFile(outputPath, pdfData);
console.log(`PDF saved at: ${outputPath}`);
