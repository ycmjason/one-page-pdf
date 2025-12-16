#!/usr/bin/env node
import { writeFile } from 'node:fs/promises';
import mri from 'mri';
import { generateSinglePagePDF } from './generateSinglePagePDF.js';

const args = mri<{
  debug: boolean;
  zoom: string;
}>(process.argv.slice(2), {
  default: {
    debug: false,
    zoom: '1',
  },
});

const [url, outputPath] = args._;

if (!url || !outputPath) {
  console.error('Usage: one-page-pdf [--debug] [--zoom <number>] <url> <output_file>');
  process.exit(1);
}

if (!/http/.test(url)) {
  console.warn(
    `provided url \`${url}\` does not start with http:// or https://, this might cause problem...`,
  );
}

const pdfData = await generateSinglePagePDF(url, {
  debug: args.debug,
  zoom: Number(args.zoom),
});
await writeFile(outputPath, pdfData);
console.log(`PDF saved at: ${outputPath}`);
