import { env } from "env.mjs";
import { Metadata } from "next";

import VideoDetails from "@/screens/Videos/Details";
import { constructMetadata } from "@/utils/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id: videoId } = await params;

  try {
    const videoDetailsURL = `${env.NEXT_PUBLIC_APP_URL}/api/youtube/videos?part=snippet,statistics&id=${videoId}`;
    const response = await fetch(videoDetailsURL);
    const data = await response.json();
    const details = data.items[0]?.snippet;

    if (details) {
      return constructMetadata({
        title: details.title,
        description: details.description,
        type: "article",
        image: {
          url:
            details.thumbnails?.maxres?.url ||
            details.thumbnails?.high?.url ||
            "/static/images/open-graph.jpg",
          width: 1280,
          height: 720,
          alt: details.title,
        },
      });
    }
  } catch (error) {
    console.error("Error fetching video metadata:", error);
  }

  // Fallback metadata
  return constructMetadata({
    title: "Video Details",
    description: "Watch this video on Antoine's YouTube channel",
  });
}

export default async function VideoDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: videoId } = await params;

  try {
    const videoDetailsURL = `${env.NEXT_PUBLIC_APP_URL}/api/youtube/videos?part=snippet,statistics&id=${videoId}`;
    const videoCommentsURL = `${env.NEXT_PUBLIC_APP_URL}/api/youtube/commentThreads?part=snippet,replies&videoId=${videoId}&textFormat=html&order=relevance`;

    const [detailsResponse, commentsResponse] = await Promise.all([
      fetch(videoDetailsURL),
      fetch(videoCommentsURL),
    ]);

    const data = await detailsResponse.json();
    const details = data.items[0]?.snippet;
    const statistics = data.items[0]?.statistics;

    const videoCommentsData = await commentsResponse.json();
    const comments = videoCommentsData.items;
    const nextPageToken = videoCommentsData.nextPageToken;

    return (
      <VideoDetails
        videoId={videoId}
        details={details}
        comments={comments}
        statistics={statistics}
        nextPageToken={nextPageToken}
      />
    );
  } catch (error) {
    console.error("Error fetching video details:", error);
    return (
      <VideoDetails
        videoId={videoId}
        err={{
          statusCode: 404,
        }}
      />
    );
  }
}
