import puppeteer from "puppeteer";

export const generateSinglePagePDF = async (url: string): Promise<Uint8Array> => {
  const browser = await puppeteer.launch({ defaultViewport: null });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle2" });

  const [pageHeight, pageWidth] = await Promise.all([
    page.evaluate(() =>
      // @ts-ignore puppeteer uses document
      document.documentElement.scrollHeight
    ),
    page.evaluate(() =>
      // @ts-ignore puppeteer uses document
      document.documentElement.clientWidth
    ),
  ]);

  const pdfBuffer = await page.pdf({
    printBackground: true,
    width: `${pageWidth}px`,
    height: `${pageHeight}px`,
  });

  await browser.close();
  return pdfBuffer;
};
