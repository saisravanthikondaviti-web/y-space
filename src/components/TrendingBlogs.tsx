import { getTrendingBlogs } from "@/lib/blog";
import TrendingBlogsClient from "./TrendingBlogsClient";

export default async function TrendingBlogs() {
  const blogs = await getTrendingBlogs();

  return (
    <TrendingBlogsClient blogs={blogs} />
  );
}