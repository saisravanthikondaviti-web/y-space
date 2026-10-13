"use client";

import { useMemo, useState } from "react";
import BlogCard from "@/components/BlogCard";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  category: string | null;
  cover_image: string | null;
  views: number;
  likes: number;
  created_at?: string;
}

interface BlogSearchProps {
  blogs: Blog[];
}

export default function BlogSearch({ blogs }: BlogSearchProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = blogs
      .map((blog) => blog.category)
      .filter((category): category is string => Boolean(category));

    return ["All", ...new Set(cats)];
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        `${blog.title} ${blog.excerpt ?? ""} ${blog.content ?? ""}`
          .toLowerCase()
          .includes(query.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || blog.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [blogs, query, selectedCategory]);

  return (
    <>
      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search blogs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-10 py-4 outline-none"
        />
      </div>

      {/* Categories */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full border px-3 py-1.5 text-sm transition-all duration-300 ${
              selectedCategory === category
                ? "border-white bg-white text-black"
                : "border-white/20 bg-transparent text-white hover:border-white/40 hover:bg-white/5"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
        {filteredBlogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={{
              ...blog,
              excerpt: blog.excerpt ?? "",
            }}
          />
        ))}
      </div>
    </>
  );
}
