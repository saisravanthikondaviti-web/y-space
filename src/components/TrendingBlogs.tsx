import TrendingBlogsClient from "./TrendingBlogsClient";
import type { Blog } from "@/types/blog";

interface TrendingBlogsProps {
  blogs: Blog[];
}

export default function TrendingBlogs({
  blogs,
}: TrendingBlogsProps) {
  const trendingBlogs = [...blogs]
    .sort((a, b) => b.views - a.views)
    .slice(0, 3);

  return <TrendingBlogsClient blogs={trendingBlogs} />;
}