"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import BlogCard from "./BlogCard";

export default function ProfileRecentlyViewed() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecentlyViewed();
  }, []);

  async function loadRecentlyViewed() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    // Get recently viewed blog ids
    const { data: interactions } = await supabase
      .from("user_blog_interactions")
      .select("blog_id")
      .eq("user_id", user.id)
      .eq("interaction_type", "view")
      .order("created_at", { ascending: false });

    if (!interactions || interactions.length === 0) {
      setLoading(false);
      return;
    }

    // Remove duplicate blog ids while keeping newest first
    const uniqueBlogIds = [
      ...new Set(interactions.map((item) => item.blog_id)),
    ];

    // Limit to 8
    const blogIds = uniqueBlogIds.slice(0, 8);

    const { data: blogsData } = await supabase
      .from("blogs")
      .select("*")
      .in("id", blogIds);

    setBlogs(blogsData || []);
    setLoading(false);
  }

  if (loading) {
    return (
      <p className="mt-8 text-gray-400">
        Loading recently viewed...
      </p>
    );
  }

  if (blogs.length === 0) {
    return (
      <p className="mt-8 text-gray-400">
        No recently viewed blogs yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  );
}