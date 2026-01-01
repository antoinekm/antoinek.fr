import BlogPostPage from "@screens/Blog/Post";
import { NextPageContext } from "next";

import { getPostBySlug } from "../../lib/blog";

BlogPostPage.getInitialProps = async (ctx: NextPageContext) => {
  const { slug } = ctx.query;

  if (typeof slug !== "string") {
    return { post: null };
  }

  try {
    const post = await getPostBySlug(slug);
    return { post };
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return { post: null };
  }
};

export default BlogPostPage;
