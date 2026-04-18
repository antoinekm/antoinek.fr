import { env } from "env.mjs";
import fs from "fs";
import path from "path";

function discoverApiRoutes(): string[] {
  const apiDir = path.join(process.cwd(), "src/app/api");
  const routes: string[] = [];

  function walk(dir: string, prefix: string) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (entry.name.startsWith("[")) continue;
        walk(path.join(dir, entry.name), `${prefix}/${entry.name}`);
      } else if (entry.name === "route.ts") {
        routes.push(prefix);
      }
    }
  }

  walk(apiDir, "/api");
  return routes;
}

function discoverPages(): string[] {
  const pagesDir = path.join(process.cwd(), "src/pages");
  const pages: string[] = [];

  if (!fs.existsSync(pagesDir)) return pages;

  for (const entry of fs.readdirSync(pagesDir, { withFileTypes: true })) {
    if (!entry.isFile()) continue;
    const name = entry.name.replace(/\.(ts|tsx)$/, "");
    if (name.startsWith("_")) continue;
    if (name === "index") {
      pages.push("/");
    } else {
      pages.push(`/${name}`);
    }
  }

  return pages;
}

export async function GET() {
  const baseUrl = env.NEXT_PUBLIC_APP_URL;
  const apiRoutes = discoverApiRoutes();
  const pages = discoverPages();

  const linkset = [
    {
      anchor: `${baseUrl}/`,
      "api-catalog": [
        {
          href: `${baseUrl}/.well-known/api-catalog`,
          type: "application/linkset+json",
        },
      ],
    },
    ...apiRoutes.map((route) => ({
      anchor: `${baseUrl}${route}`,
      type: [
        {
          href: `${baseUrl}${route}`,
          type: "application/json",
        },
      ],
    })),
    ...pages.map((page) => ({
      anchor: `${baseUrl}${page}`,
      type: [
        {
          href: `${baseUrl}${page}`,
          type: "text/html",
        },
      ],
      "service-doc": [
        {
          href: `${baseUrl}${page === "/" ? "/index" : page}.md`,
          type: "text/markdown",
        },
      ],
    })),
  ];

  return new Response(JSON.stringify({ linkset }, null, 2), {
    headers: {
      "Content-Type": "application/linkset+json",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
