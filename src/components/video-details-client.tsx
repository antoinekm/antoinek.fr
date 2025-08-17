"use client";

import { env } from "env.mjs";
import React from "react";
import styled from "styled-components";

import { Button } from "@/components/Button";

interface VideoDetailsClientProps {
  videoId: string;
  initialComments: any[];
  initialNextPageToken: string | null;
  commentCount?: string;
}

export default function VideoDetailsClient({
  videoId,
  initialComments,
  initialNextPageToken,
  commentCount,
}: VideoDetailsClientProps) {
  const [currentNextPageToken, setCurrentNextPageToken] = React.useState<
    string | null
  >(initialNextPageToken || null);
  const [currentComments, setCurrentComments] = React.useState<any[]>(
    initialComments || [],
  );

  const loadMoreComments = async () => {
    if (currentNextPageToken) {
      const videoCommentsURL = `${env.NEXT_PUBLIC_APP_URL}/api/youtube/commentThreads?part=snippet,replies&videoId=${videoId}&pageToken=${currentNextPageToken}&order=relevance`;

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

  if (!currentComments || currentComments.length === 0) {
    return null;
  }

  return (
    <CommentsContainer>
      <h2>{`${commentCount} comments`}</h2>
      {currentComments.map((comment, index) => (
        <Comment key={index}>
          <CommenterLink
            href={comment.snippet.topLevelComment.snippet.authorChannelUrl}
            target={"_blank"}
            rel={"noopener noreferrer"}
          >
            <CommenterAvatar
              src={
                comment.snippet.topLevelComment.snippet.authorProfileImageUrl
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
  );
}

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
