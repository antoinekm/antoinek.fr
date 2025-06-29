import { env } from "env.mjs";

import VideosClient from "@/components/videos-client";
import { constructMetadata } from "@/utils/metadata";

export const metadata = constructMetadata({
  title: "Videos",
  description:
    "Watch Antoine Kingue's latest videos about web development, technology, and creative projects on YouTube.",
});

export default async function VideosPage({
  searchParams,
}: {
  searchParams: Promise<{ pageToken?: string }>;
}) {
  const { pageToken = "" } = await searchParams;

  const playListId = "UUN0hmDGaj1RAshd3A-x35pA";
  const maxResults = 12;
  const url = `${env.NEXT_PUBLIC_APP_URL}/api/youtube/playlistItems?part=snippet&maxResults=${maxResults}&playlistId=${playListId}&pageToken=${pageToken}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const { nextPageToken, prevPageToken, items: videos } = data;

    return (
      <VideosClient
        videos={videos}
        nextPageToken={nextPageToken}
        prevPageToken={prevPageToken}
      />
    );
  } catch (error) {
    console.error("Error fetching videos:", error);
    return <VideosClient videos={[]} nextPageToken={""} prevPageToken={""} />;
  }
}
