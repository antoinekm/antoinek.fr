"use client";

import React from "react";
import styled from "styled-components";

import { Button } from "@/components/Button";
import PageWrapper from "@/components/page-wrapper";
import VideoDetailsClient from "@/components/video-details-client";

interface VideoDetailsDisplayProps {
  videoId: string;
  details: any;
  statistics: any;
  initialComments: any[];
  initialNextPageToken: string | null;
}

export default function VideoDetailsDisplay({
  videoId,
  details,
  statistics,
  initialComments,
  initialNextPageToken,
}: VideoDetailsDisplayProps) {
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  const descriptionWithBreaks = details?.snippet?.description
    ?.split("\n")
    .map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));

  return (
    <PageWrapper>
      <DetailsContainer>
        <VideoTitle>{details?.snippet?.title}</VideoTitle>
        <VideoEmbedWrapper>
          {videoId && (
            <VideoEmbed
              width={"560"}
              height={"315"}
              src={`${embedUrl}?autoplay=1`}
              frameBorder={"0"}
              allowFullScreen
              allow={"autoplay"}
              title={"Embedded YouTube Player"}
            />
          )}
        </VideoEmbedWrapper>
        <VideoInfoContainer>
          {statistics && (
            <VideoStatistics>
              <span>{`${statistics.viewCount} view${
                statistics.viewCount !== "1" ? "s" : ""
              }`}</span>
              {" | "}
              <span>{`${statistics.likeCount} like${
                statistics.likeCount !== "1" ? "s" : ""
              }`}</span>
            </VideoStatistics>
          )}

          <Button
            href={`https://youtu.be/${videoId}`}
            target={"_blank"}
            rel={"noopener noreferrer"}
            as={"a"}
          >
            {"Watch on YouTube"}
          </Button>
        </VideoInfoContainer>
        <VideoDescription>{descriptionWithBreaks}</VideoDescription>

        <VideoDetailsClient
          videoId={videoId}
          initialComments={initialComments}
          initialNextPageToken={initialNextPageToken}
          commentCount={statistics?.commentCount}
        />
      </DetailsContainer>
    </PageWrapper>
  );
}

const DetailsContainer = styled.div``;

const VideoTitle = styled.h1`
  margin-bottom: 20px;
`;

const VideoEmbedWrapper = styled.div`
  margin-bottom: 20px;
  max-width: 800px;
`;

const VideoEmbed = styled.iframe`
  width: 100%;
  height: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 10px;
`;

const VideoInfoContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
  max-width: 800px;
`;

const VideoStatistics = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  font-weight: 600;
`;

const VideoDescription = styled.p`
  max-width: 800px;
`;
