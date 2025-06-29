"use client";

import { env } from "env.mjs";
import ErrorPage from "next/error";
import React from "react";
import styled from "styled-components";

import { Button } from "@/components/Button";
import PageWrapper from "@/components/page-wrapper";

export type VideoDetailsProps = {
  videoId: string;
  details?: any;
  comments?: any[];
  statistics?: {
    commentCount: string;
    likeCount: string;
    viewCount: string;
    favoriteCount: string;
  };
  nextPageToken?: string;
  err?: {
    statusCode: number;
  };
};

const VideoDetails = ({
  videoId,
  details,
  comments,
  statistics,
  nextPageToken,
  err,
}: VideoDetailsProps) => {
  const [currentNextPageToken, setCurrentNextPageToken] = React.useState<
    string | null
  >(nextPageToken || null);
  const [currentComments, setCurrentComments] = React.useState<any[]>(
    comments || [],
  );

  if (err) {
    return <ErrorPage statusCode={err.statusCode} />;
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  const descriptionWithBreaks = details?.description
    ?.split("\n")
    .map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));

  const loadMoreComments = async () => {
    if (nextPageToken) {
      const videoCommentsURL = `${env.NEXT_PUBLIC_APP_URL}/api/youtube/commentThreads?part=snippet,replies&videoId=${videoId}&pageToken=${nextPageToken}&order=relevance`;

      try {
        const response = await fetch(videoCommentsURL);
        const data = await response.json();
        const newComments = data.items;

        if (!newComments) {
          throw new Error("No comments found");
        }

        setCurrentComments((prevComments) => [...prevComments, ...newComments]);
        setCurrentNextPageToken(data.nextPageToken || null);
      } catch (error) {
        console.error("Error fetching additional comments:", error);
      }
    }
  };

  return (
    <PageWrapper>
      <DetailsContainer>
        <VideoTitle>{details?.title}</VideoTitle>
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

        {currentComments && currentComments.length > 0 && (
          <CommentsContainer>
            <h2>{`${statistics?.commentCount} comments`}</h2>
            {currentComments.map((comment, index) => (
              <Comment key={index}>
                <CommenterLink
                  href={
                    comment.snippet.topLevelComment.snippet.authorChannelUrl
                  }
                  target={"_blank"}
                  rel={"noopener noreferrer"}
                >
                  <CommenterAvatar
                    src={
                      comment.snippet.topLevelComment.snippet
                        .authorProfileImageUrl
                    }
                    alt={`${comment.snippet.topLevelComment.snippet.authorDisplayName}'s avatar`}
                    height={20}
                    width={20}
                  />
                  <strong>
                    {comment.snippet.topLevelComment.snippet.authorDisplayName}
                  </strong>
                </CommenterLink>
                {": "}
                {comment.snippet.topLevelComment.snippet.textOriginal}

                {comment.replies &&
                  comment.replies.comments.map((reply, replyIndex) => (
                    <Reply key={replyIndex} index={replyIndex}>
                      <CommenterLink
                        href={reply.snippet.authorChannelUrl}
                        target={"_blank"}
                        rel={"noopener noreferrer"}
                      >
                        <CommenterAvatar
                          src={reply.snippet.authorProfileImageUrl}
                          alt={`${reply.snippet.authorDisplayName}'s avatar`}
                          height={20}
                          width={20}
                        />
                        <strong>{reply.snippet.authorDisplayName}</strong>
                      </CommenterLink>
                      {": "}
                      {reply.snippet.textOriginal}
                    </Reply>
                  ))}
              </Comment>
            ))}
            {currentNextPageToken && (
              <Button onClick={loadMoreComments}>{"See More Comments"}</Button>
            )}
          </CommentsContainer>
        )}
      </DetailsContainer>
    </PageWrapper>
  );
};

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

const CommentsContainer = styled.div`
  margin-top: 20px;
`;

const Comment = styled.div`
  margin-bottom: 10px;
`;

const Reply = styled.div<{ index: number }>`
  position: relative;
  margin-left: 20px;
  margin-top: 10px;

  &::before {
    content: "";
    display: block;
    width: 10px;
    height: ${({ index }) => (index === 0 ? "21px" : "41px")};
    position: absolute;
    left: -11px;
    top: -${({ index }) => (index === 0 ? "10px" : "30px")};
    border-left: 2px solid #30302b;
    border-bottom: 2px solid #30302b;
    border-bottom-left-radius: 5px;
    z-index: -1;
  }
`;

const CommenterLink = styled.a``;

const CommenterAvatar = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 8px;
  vertical-align: middle;
`;

export default VideoDetails;
