import { env } from "env.mjs";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import VideoDetailsDisplay from "@/components/video-details-display";
import { constructMetadata } from "@/utils/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id: videoId } = await params;

  try {
    const videoURL = `${env.NEXT_PUBLIC_APP_URL}/api/youtube/videos?part=snippet,statistics&id=${videoId}`;
    const response = await fetch(videoURL);
    const data = await response.json();
    const video = data.items?.[0];

    if (!video) {
      return constructMetadata({
        title: "Video Not Found",
        description: "The requested video could not be found.",
      });
    }

    return constructMetadata({
      title: video.snippet.title,
      description:
        video.snippet.description?.slice(0, 160) ||
        "Watch this video by Antoine Kingue",
      image: {
        url:
          video.snippet.thumbnails?.maxres?.url ||
          video.snippet.thumbnails?.high?.url,
        width: 1280,
        height: 720,
        alt: video.snippet.title,
      },
    });
  } catch (error) {
    console.error("Error generating metadata:", error);
    return constructMetadata({
      title: "Video",
      description: "Watch this video by Antoine Kingue",
    });
  }
}

export default async function VideoDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: videoId } = await params;

  try {
    // Fetch video details
    const videoURL = `${env.NEXT_PUBLIC_APP_URL}/api/youtube/videos?part=snippet,statistics&id=${videoId}`;
    const videoResponse = await fetch(videoURL);
    const videoData = await videoResponse.json();
    const details = videoData.items?.[0];

    if (!details) {
      notFound();
    }

    // Fetch initial comments
    const commentsURL = `${env.NEXT_PUBLIC_APP_URL}/api/youtube/commentThreads?part=snippet,replies&videoId=${videoId}&order=relevance`;
    let comments = [];
    let nextPageToken = null;

    try {
      const commentsResponse = await fetch(commentsURL);
      const commentsData = await commentsResponse.json();
      comments = commentsData.items || [];
      nextPageToken = commentsData.nextPageToken || null;
    } catch (error) {
      console.error("Error fetching comments:", error);
    }

    const statistics = details.statistics;

    return (
      <VideoDetailsDisplay
        videoId={videoId}
        details={details}
        statistics={statistics}
        initialComments={comments}
        initialNextPageToken={nextPageToken}
      />
    );
  } catch (error) {
    console.error("Error fetching video details:", error);
    throw error;
  }
}
