"use client";

import { useState } from "react";
import BlogCard from "@/components/BlogCard";

export default function TrendingBlogsClient({
  blogs,
}: {
  blogs: any[];
}) {
  const [showTrending, setShowTrending] = useState(false);

  if (!blogs.length) return null;

  return (
    <div className="mt-12">
      <button
        onClick={() => setShowTrending(!showTrending)}
        className="px-6 py-3 rounded-xl border border-white/10 hover:border-white/30 transition"
      >
        {showTrending
          ? "Hide Trending Blogs"
          : "🔥 Show Trending Blogs"}
      </button>

      {showTrending && (
        <div className="mt-8">
          <h2 className="text-3xl font-bold mb-6">
            Trending Blogs
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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