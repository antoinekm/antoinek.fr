"use client";

import Link from "next/link";
import React from "react";
import styled from "styled-components";

import Video from "@/components/Video";
import PageWrapper from "@/components/page-wrapper";
import VideoSkeleton from "@/components/video-skeleton";

export type VideosProps = {
  videos: any[];
  nextPageToken: string;
  prevPageToken: string;
};

export default function VideosClient({
  videos,
  nextPageToken,
  prevPageToken,
}: VideosProps) {
  return (
    <PageWrapper>
      <h1>{"🎥 latest videos"}</h1>
      <VideosWrapper>
        {videos?.length > 1
          ? videos.map((video, i) => (
              <Video
                key={i}
                title={video.snippet.title}
                thumbnailUrl={video.snippet.thumbnails.medium.url}
                url={`/videos/${video.snippet.resourceId.videoId}`}
              />
            ))
          : Array.from({ length: 12 }, (_, i) => <VideoSkeleton key={i} />)}
      </VideosWrapper>
      <PaginationContainer>
        <PaginationButton
          href={`/videos?pageToken=${prevPageToken}`}
          disabled={!prevPageToken}
        >
          {"← Previous"}
        </PaginationButton>
        <PaginationButton
          href={`/videos?pageToken=${nextPageToken}`}
          disabled={!nextPageToken}
        >
          {"Next →"}
        </PaginationButton>
      </PaginationContainer>
    </PageWrapper>
  );
}

const VideosWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  margin-top: 2rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const PaginationButton = styled(Link)<{ disabled: boolean }>`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  border: 1px solid #30302b;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  transition: all 0.1s ease;
  will-change: transform;
  transition: background-color 0.2s;
  font-size: 14px;
  font-weight: 600;

  &:hover {
    background-color: #30302b;
    text-decoration: none !important;
  }

  ${({ disabled }) =>
    disabled &&
    `
    pointer-events: none;
    opacity: 0.5;
  `}
`;
