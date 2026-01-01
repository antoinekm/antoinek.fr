import { env } from "env.mjs";
import { GetServerSideProps } from "next";
import { getServerSideSitemapLegacy } from "next-sitemap";
import { YOUTUBE } from "src/constants/youtube";

import { getAllPosts } from "../../lib/blog";

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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let pageToken: null | string = null;
  let allVideos: any[] = [];

  do {
    const { videos, nextPageToken } = await fetchVideos(pageToken);
    allVideos = [...allVideos, ...videos];
    pageToken = nextPageToken;
  } while (pageToken);

  const videoFields = allVideos.map((video) => ({
    loc: `${env.NEXT_PUBLIC_APP_URL}/videos/${video.snippet.resourceId.videoId}`,
    lastmod: new Date(video.snippet.publishedAt).toISOString(),
  }));

  // Add blog posts to sitemap
  const blogPosts = await getAllPosts();
  const blogFields = blogPosts.map((post) => ({
    loc: `${env.NEXT_PUBLIC_APP_URL}/blog/${post.slug}`,
    lastmod: new Date(post.date).toISOString(),
  }));

  const fields = [...videoFields, ...blogFields];

  return getServerSideSitemapLegacy(ctx, fields);
};

export default function Sitemap() {}
