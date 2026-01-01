import fs from "fs";
import { marked } from "marked";
import path from "path";

import type { BlogPost, BlogPostMetadata } from "../types/blog";

const BLOG_DIRECTORY = path.join(process.cwd(), "content/blog");

/**
 * Parse frontmatter from markdown content
 */
function parseFrontmatter(content: string): {
  metadata: Record<string, any>;
  content: string;
} {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { metadata: {}, content };
  }

  const frontmatter = match[1];
  const markdown = match[2];

  const metadata: Record<string, any> = {};
  const doubleQuote = String.fromCharCode(34); // "
  const singleQuote = String.fromCharCode(39); // '

  frontmatter.split("\n").forEach((line) => {
    const colonIndex = line.indexOf(":");
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      let value: any = line.slice(colonIndex + 1).trim();

      // Remove quotes
      if (
        (value.startsWith(doubleQuote) && value.endsWith(doubleQuote)) ||
        (value.startsWith(singleQuote) && value.endsWith(singleQuote))
      ) {
        value = value.slice(1, -1);
      }

      // Parse arrays
      if (value.startsWith("[") && value.endsWith("]")) {
        value = value
          .slice(1, -1)
          .split(",")
          .map((item) => item.trim().replace(/^[""]|[""]$/g, ""));
      }

      metadata[key] = value;
    }
  });

  return { metadata, content: markdown };
}

/**
 * Get all blog posts metadata (sorted by date, newest first)
 */
export async function getAllPosts(): Promise<BlogPostMetadata[]> {
  if (!fs.existsSync(BLOG_DIRECTORY)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIRECTORY);
  const posts = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const filePath = path.join(BLOG_DIRECTORY, file);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { metadata } = parseFrontmatter(fileContent);

      return {
        slug,
        title: metadata.title || slug,
        date: metadata.date || "",
        description: metadata.description || "",
        tags: metadata.tags || [],
        author: metadata.author || "Anonymous",
      };
    })
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return posts;
}

/**
 * Get a single blog post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIRECTORY, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { metadata, content } = parseFrontmatter(fileContent);
  const htmlContent = await marked(content);

  return {
    slug,
    title: metadata.title || slug,
    date: metadata.date || "",
    description: metadata.description || "",
    tags: metadata.tags || [],
    author: metadata.author || "Anonymous",
    content: htmlContent,
  };
}

/**
 * Get all blog post slugs
 */
export async function getAllPostSlugs(): Promise<string[]> {
  if (!fs.existsSync(BLOG_DIRECTORY)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIRECTORY);
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}
