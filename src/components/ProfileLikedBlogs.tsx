"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import BlogCard from "./BlogCard";

export default function ProfileLikedBlogs() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLikedBlogs();
  }, []);

  async function loadLikedBlogs() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    // Get liked blog IDs
    const { data: likes } = await supabase
      .from("blog_likes")
      .select("blog_id")
      .eq("user_id", user.id);

    const ids = likes?.map((item) => item.blog_id) || [];

    if (ids.length === 0) {
      setLoading(false);
      return;
    }

    // Get blogs
    const { data: blogsData } = await supabase
      .from("blogs")
      .select("*")
      .in("id", ids);

    setBlogs(blogsData || []);
    setLoading(false);
  }

  if (loading) {
    return (
      <p className="text-gray-400 mt-8">
        Loading liked blogs...
      </p>
    );
  }

  if (blogs.length === 0) {
    return (
      <p className="text-gray-400 mt-8">
        You haven't liked any blogs yet.
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