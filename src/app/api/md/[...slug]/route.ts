import { env } from "env.mjs";
import { encodingForModel } from "js-tiktoken";
import { parse } from "node-html-parser";
import TurndownService from "turndown";

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
});

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await params;
  const path = slug[0] === "index" ? "" : slug.join("/");

  const pageUrl = `${env.NEXT_PUBLIC_APP_URL}/${path}`;

  const response = await fetch(pageUrl, {
    headers: { Accept: "text/html" },
  });

  if (!response.ok) {
    return new Response("Page not found", { status: 404 });
  }

  const html = await response.text();
  const root = parse(html);
  const content = root.querySelector("#page-content");

  if (!content) {
    return new Response("Page content not found", { status: 404 });
  }

  const markdown = turndown.turndown(content.innerHTML);
  const enc = encodingForModel("gpt-4o");
  const tokenCount = enc.encode(markdown).length;

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
      "x-markdown-tokens": String(tokenCount),
    },
  });
}
