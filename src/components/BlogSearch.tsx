"use client";

import { useMemo, useState } from "react";
import BlogCard from "@/components/BlogCard";

export default function BlogSearch({
  blogs,
}: {
  blogs: any[];
}) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const categories = useMemo(() => {
    const cats = blogs
      .map((blog) => blog.category)
      .filter(Boolean);

    return ["All", ...new Set(cats)];
  }, [blogs]);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      `${blog.title} ${blog.excerpt} ${blog.content}`
        .toLowerCase()
        .includes(query.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      blog.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search blogs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() =>
              setSelectedCategory(category)
            }
            className={`px-4 py-2 rounded-full border transition ${
              selectedCategory === category
                ? "bg-white text-black"
                : "bg-transparent"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
          />
        ))}
      </div>
    </>
  );
}