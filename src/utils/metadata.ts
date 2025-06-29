import { env } from "env.mjs";
import { Metadata } from "next";

interface ConstructMetadataParams {
  title?: string;
  description?: string;
  absoluteUrl?: string; // For complete URLs (e.g., dynamic routes)
  image?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  };
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  type?: "website" | "article" | "profile";
  noIndex?: boolean;
}

const BASE_URL = env.NEXT_PUBLIC_APP_URL;
const DEFAULT_TITLE = "Antoine Kingue";
const DEFAULT_DESCRIPTION = "Antoine Kingue: developer, designer and youtuber";
const DEFAULT_IMAGE = {
  url: "/static/images/open-graph.jpg",
  width: 1500,
  height: 500,
  alt: "Antoine Kingue",
};

// Helper function to detect current route from call stack
function getCurrentRoute(): string {
  const error = new Error();
  const stack = error.stack || "";

  // Look for app directory patterns in the stack
  const appRouteMatch = stack.match(
    /\/app\/([^\/\s]*(?:\/[^\/\s]*)*?)\/page\./,
  );
  if (appRouteMatch && appRouteMatch[1]) {
    let route = appRouteMatch[1];
    // Handle dynamic routes by preserving [brackets]
    route = route.replace(/\[([^\]]+)\]/g, (match) => {
      // This will be replaced by actual values when generating metadata
      return match;
    });
    return `/${route}`;
  }

  // Fallback patterns
  const fileMatch = stack.match(/\/([^\/\s]*?)\/page\./);
  if (fileMatch && fileMatch[1] && fileMatch[1] !== "app") {
    return `/${fileMatch[1]}`;
  }

  return "";
}

export function constructMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  absoluteUrl,
  image = DEFAULT_IMAGE,
  keywords,
  author = "Antoine Kingue",
  publishedTime,
  modifiedTime,
  type = "website",
  noIndex = false,
}: ConstructMetadataParams = {}): Metadata {
  const fullTitle = title || DEFAULT_TITLE;

  // Use absoluteUrl if provided, otherwise auto-detect route
  const canonicalUrl = absoluteUrl || `${BASE_URL}${getCurrentRoute()}`;

  return {
    title: fullTitle,
    description,
    keywords,
    authors: author ? [{ name: author }] : undefined,
    creator: author,
    publisher: author,
    robots: noIndex ? "noindex, nofollow" : "index, follow",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type,
      locale: "en_US",
      url: canonicalUrl,
      siteName: DEFAULT_TITLE,
      title: fullTitle,
      description,
      images: [
        {
          url: image.url,
          width: image.width || DEFAULT_IMAGE.width,
          height: image.height || DEFAULT_IMAGE.height,
          alt: image.alt || DEFAULT_IMAGE.alt,
        },
      ],
      publishedTime,
      modifiedTime,
    },
    twitter: {
      card: "summary_large_image",
      site: "@AntoineKingue",
      creator: "@AntoineKingue",
      title: fullTitle,
      description,
      images: [image.url],
    },
  };
}
