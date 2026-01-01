import BlogPage from "@screens/Blog";
import { NextPageContext } from "next";

import { getAllPosts } from "../../lib/blog";

BlogPage.getInitialProps = async (_ctx: NextPageContext) => {
  try {
    const posts = await getAllPosts();
    return { posts };
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return { posts: [] };
  }
};

export default BlogPage;
