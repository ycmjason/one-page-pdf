#!/usr/bin/env node
import { writeFile } from 'node:fs/promises';
import { generateSinglePagePDF } from './generateSinglePagePDF.js';

const [_node, _script, url, outputPath] = process.argv;

if (!url || !outputPath) {
  console.error('Usage: one-page-pdf <url> <output_file>');
  process.exit(1);
}

if (!/http/.test(url)) {
  console.warn(
    `provided url \`${url}\` does not start with http:// or https://, this might cause problem...`,
  );
}

const pdfData = await generateSinglePagePDF(url);
await writeFile(outputPath, pdfData);
console.log(`PDF saved at: ${outputPath}`);
