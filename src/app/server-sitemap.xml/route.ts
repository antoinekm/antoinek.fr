import { env } from "env.mjs";
import { YOUTUBE } from "src/constants/youtube";

const maxResults = 50;

async function fetchVideos(pageToken?: string | null) {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${maxResults}&playlistId=${
      YOUTUBE.PLAYLIST_ID
    }&key=${env.YOUTUBE_API_KEY}${pageToken ? `&pageToken=${pageToken}` : ""}`,
  );
  const data = await response.json();
  return {
    videos: data.items,
    nextPageToken: data.nextPageToken,
  };
}

export async function GET() {
  let pageToken: null | string = null;
  let allVideos: {
    snippet: {
      resourceId: { videoId: string };
      publishedAt: string;
    };
  }[] = [];

  do {
    const { videos, nextPageToken } = await fetchVideos(pageToken);
    allVideos = [...allVideos, ...videos];
    pageToken = nextPageToken;
  } while (pageToken);

  const fields = allVideos.map((video) => ({
    loc: `${env.NEXT_PUBLIC_APP_URL}/videos/${video.snippet.resourceId.videoId}`,
    lastmod: new Date(video.snippet.publishedAt).toISOString(),
  }));

  // Create sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${fields
  .map(
    (field) => `  <url>
    <loc>${field.loc}</loc>
    <lastmod>${field.lastmod}</lastmod>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
