#!/usr/bin/env node
import { writeFile } from 'node:fs/promises';
import { generateSinglePagePDF } from './generateSinglePagePDF.js';

const args = process.argv.slice(2);
const debugFlag = args.includes('--debug');
const nonFlagArgs = args.filter(arg => !arg.startsWith('--'));
const [url, outputPath] = nonFlagArgs;

if (!url || !outputPath) {
  console.error('Usage: one-page-pdf [--debug] <url> <output_file>');
  process.exit(1);
}

if (!/http/.test(url)) {
  console.warn(
    `provided url \`${url}\` does not start with http:// or https://, this might cause problem...`,
  );
}

const pdfData = await generateSinglePagePDF(url, { debug: debugFlag });
await writeFile(outputPath, pdfData);
console.log(`PDF saved at: ${outputPath}`);
