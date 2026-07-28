"use client";

import { useState } from "react";
import BlogCard from "@/components/BlogCard";
import type { Blog } from "@/types/blog";
interface TrendingBlogsClientProps {
  blogs: Blog[];
}

export default function TrendingBlogsClient({
  blogs,
}: TrendingBlogsClientProps) {
  const [showTrending, setShowTrending] = useState(false);

  if (blogs.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <button
        type="button"
        onClick={() => setShowTrending((prev) => !prev)}
        className="rounded-xl border border-white/10 px-6 py-3 transition hover:border-white/30"
      >
        {showTrending
          ? "Hide Trending Blogs"
          : "🔥 Show Trending Blogs"}
      </button>

      {showTrending && (
        <div className="mt-8">
          <h2 className="mb-6 text-3xl font-bold">
            Trending Blogs
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}