import puppeteer from 'puppeteer';

export const generateSinglePagePDF = async (
  url: string,
  options: { debug?: boolean; zoom: number },
): Promise<Uint8Array> => {
  const A4_WIDTH_PX = 794; // A4 width at 96 DPI (210mm)

  const browser = await puppeteer.launch({
    dumpio: !!options.debug,
    defaultViewport: null,
    headless: true,
  });
  const page = await browser.newPage();

  // Set viewport to A4 width
  await page.setViewport({
    width: A4_WIDTH_PX,
    height: 0, // Temporary height, will be adjusted
  });

  await page.evaluate(zoomLevel => {
    document.body.style.zoom = `${zoomLevel}`;
  }, options.zoom);

  await page.goto(url, { waitUntil: 'networkidle2' });

  const [pageHeight, pageWidth] = await Promise.all([
    page.evaluate(() => document.documentElement.scrollHeight),
    page.evaluate(() => document.documentElement.clientWidth),
  ]);

  const pdfBuffer = await page.pdf({
    waitForFonts: true,
    printBackground: true,
    width: `${pageWidth}px`,
    height: `${pageHeight}px`,
  });

  await browser.close();
  return pdfBuffer;
};
