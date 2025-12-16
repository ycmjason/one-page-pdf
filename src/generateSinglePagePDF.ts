import puppeteer from 'puppeteer';

export const generateSinglePagePDF = async (
  url: string,
  options?: { debug?: boolean },
): Promise<Uint8Array> => {
  const browser = await puppeteer.launch({
    dumpio: !!options?.debug,
    defaultViewport: null,
    headless: 'shell',
    args: ['--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-sandbox'],
  });
  const page = await browser.newPage();

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
