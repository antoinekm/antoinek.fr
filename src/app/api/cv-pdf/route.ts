import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Whitelist of CV source pages that can be exported, mapped to their
// downloadable filename. Keeps the route safe against arbitrary fetches.
const SOURCES: Record<string, { page: string; filename: string }> = {
  default: { page: "cv.html", filename: "Antoine-Kingue-CV.pdf" },
  reserviste: {
    page: "cv-reserviste.html",
    filename: "Antoine-Kingue-CV-Reserviste.pdf",
  },
};

export async function GET(req: NextRequest) {
  const isProd = process.env.NODE_ENV === "production";

  const sourceKey = req.nextUrl.searchParams.get("source") ?? "default";
  const source = SOURCES[sourceKey] ?? SOURCES.default;

  let browser: Awaited<ReturnType<typeof launchBrowser>> | null = null;
  try {
    browser = await launchBrowser(isProd);
    const page = await browser.newPage();

    const origin = req.nextUrl.origin;
    await page.goto(`${origin}/${source.page}?print=1`, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    await page.emulateMediaType("print");

    // Set viewport to A4 width so the layout renders at expected size
    await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });

    // Make sure web fonts are fully loaded before rendering
    await page.evaluate(async () => {
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }
    });

    // Measure the actual rendered height of the CV so the PDF is a single
    // page sized to the content (no clipping, no scaling artifacts).
    const heightPx: number = await page.evaluate(() => {
      const main = document.querySelector("main");
      if (!main) return document.documentElement.scrollHeight;
      const rect = main.getBoundingClientRect();
      return Math.ceil(rect.height);
    });

    const pxToMm = 25.4 / 96;
    const heightMm = Math.ceil(heightPx * pxToMm) + 2; // tiny safety margin

    const pdf = await page.pdf({
      width: "210mm",
      height: `${heightMm}mm`,
      printBackground: true,
      preferCSSPageSize: false,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });

    await browser.close();
    browser = null;

    return new NextResponse(new Uint8Array(pdf), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${source.filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    if (browser) {
      try {
        await browser.close();
      } catch {}
    }
    console.error("[cv-pdf] failed:", err);
    return NextResponse.json(
      { error: "PDF generation failed", detail: String(err) },
      { status: 500 },
    );
  }
}

async function launchBrowser(isProd: boolean) {
  if (isProd) {
    const chromium = (await import("@sparticuz/chromium")).default;
    const puppeteer = await import("puppeteer-core");
    return puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  }
  const puppeteer = await import("puppeteer");
  return puppeteer.default.launch({
    headless: true,
    executablePath: puppeteer.default.executablePath(),
  });
}
