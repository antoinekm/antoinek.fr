import PageWrapper from "@components/PageWrapper";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

import type { BlogPostMetadata } from "../../types/blog";

export type BlogProps = {
  posts: BlogPostMetadata[];
};

const BlogPage: NextPage<BlogProps> = ({ posts }: BlogProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <PageWrapper>
      <Head>
        <title>{"Blog - Thoughts & Articles"}</title>
        <meta
          name={"description"}
          content={
            "Read my latest articles about web development, technology, and software engineering."
          }
        />
      </Head>
      <h1>{"📝 blog"}</h1>
      <p>{"Thoughts, tutorials, and experiences from my journey in tech."}</p>
      {posts.length === 0 ? (
        <NoPosts>
          <p>{"No blog posts yet. Check back soon!"}</p>
        </NoPosts>
      ) : (
        <PostsList>
          {posts.map((post) => (
            <PostCard key={post.slug} href={`/blog/${post.slug}`}>
              <PostTitle>{post.title}</PostTitle>
              <PostMeta>
                <PostDate>{formatDate(post.date)}</PostDate>
                {post.tags.length > 0 && (
                  <PostTags>
                    {post.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </PostTags>
                )}
              </PostMeta>
              <PostDescription>{post.description}</PostDescription>
            </PostCard>
          ))}
        </PostsList>
      )}
    </PageWrapper>
  );
};

const PostsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
`;

const PostCard = styled(Link)`
  text-decoration: none;
  color: inherit;
  border: 1px solid #30302b;
  border-radius: 10px;
  padding: 1.5rem;
  transition: all 0.2s ease;
  will-change: transform;

  &:hover {
    background-color: #30302b;
    transform: translateY(-2px);
    text-decoration: none !important;
  }
`;

const PostTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
  font-weight: 600;
`;

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
`;

const PostDate = styled.span`
  font-size: 0.9rem;
  opacity: 0.7;
`;

const PostTags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  font-size: 0.8rem;
  padding: 0.25rem 0.5rem;
  background-color: rgba(48, 48, 43, 0.5);
  border-radius: 4px;
`;

const PostDescription = styled.p`
  margin: 0;
  opacity: 0.8;
  line-height: 1.6;
`;

const NoPosts = styled.div`
  text-align: center;
  padding: 3rem 0;
  opacity: 0.7;
`;

export default BlogPage;
