import PageWrapper from "@components/PageWrapper";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

import type { BlogPost } from "../../types/blog";

export type BlogPostProps = {
  post: BlogPost | null;
};

const BlogPostPage: NextPage<BlogPostProps> = ({ post }: BlogPostProps) => {
  if (!post) {
    return (
      <PageWrapper>
        <Head>
          <title>{"Post Not Found"}</title>
        </Head>
        <h1>{"Post Not Found"}</h1>
        <p>{"The blog post you're looking for doesn't exist."}</p>
        <BackLink href={"/blog"}>{"← Back to Blog"}</BackLink>
      </PageWrapper>
    );
  }

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
        <title>{`${post.title} - Blog`}</title>
        <meta name={"description"} content={post.description} />
      </Head>
      <BackLink href={"/blog"}>{"← Back to Blog"}</BackLink>
      <Article>
        <ArticleHeader>
          <ArticleTitle>{post.title}</ArticleTitle>
          <ArticleMeta>
            <MetaItem>
              <strong>{"Published:"}</strong> {formatDate(post.date)}
            </MetaItem>
            <MetaItem>
              <strong>{"Author:"}</strong> {post.author}
            </MetaItem>
            {post.tags.length > 0 && (
              <TagsContainer>
                {post.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </TagsContainer>
            )}
          </ArticleMeta>
        </ArticleHeader>
        <ArticleContent dangerouslySetInnerHTML={{ __html: post.content }} />
      </Article>
    </PageWrapper>
  );
};

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 2rem;
  text-decoration: none;
  color: inherit;
  opacity: 0.8;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
    text-decoration: none !important;
  }
`;

const Article = styled.article`
  max-width: 100%;
`;

const ArticleHeader = styled.header`
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #30302b;
`;

const ArticleTitle = styled.h1`
  font-size: 2.5rem;
  margin: 0 0 1rem 0;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ArticleMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  opacity: 0.8;
  font-size: 0.9rem;
`;

const MetaItem = styled.div`
  strong {
    margin-right: 0.5rem;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
`;

const Tag = styled.span`
  font-size: 0.8rem;
  padding: 0.25rem 0.5rem;
  background-color: rgba(48, 48, 43, 0.5);
  border-radius: 4px;
`;

const ArticleContent = styled.div`
  line-height: 1.8;
  font-size: 1.05rem;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 2rem;
    margin-bottom: 1rem;
    line-height: 1.3;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.6rem;
  }

  h3 {
    font-size: 1.3rem;
  }

  p {
    margin-bottom: 1.5rem;
  }

  ul,
  ol {
    margin-bottom: 1.5rem;
    padding-left: 2rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  code {
    background-color: rgba(48, 48, 43, 0.5);
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-size: 0.9em;
    font-family: "Courier New", monospace;
  }

  pre {
    background-color: rgba(48, 48, 43, 0.5);
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
    margin-bottom: 1.5rem;

    code {
      background-color: transparent;
      padding: 0;
    }
  }

  blockquote {
    border-left: 4px solid #30302b;
    padding-left: 1rem;
    margin-left: 0;
    margin-bottom: 1.5rem;
    opacity: 0.8;
  }

  a {
    color: inherit;
    text-decoration: underline;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.7;
    }
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 1.5rem 0;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export default BlogPostPage;
