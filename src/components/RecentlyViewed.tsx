"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function RecentlyViewed() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecentlyViewed();
  }, []);

  async function loadRecentlyViewed() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log("User:", user);

      if (!user) {
        console.log("No logged in user found");
        setLoading(false);
        return;
      }

      const { data: interactions, error: interactionsError } =
        await supabase
          .from("user_blog_interactions")
          .select("blog_id")
          .eq("user_id", user.id)
          .eq("interaction_type", "view")
          .order("created_at", { ascending: false })
          .limit(5);

      console.log("Interactions:", interactions);
      console.log("Interactions Error:", interactionsError);

      const blogIds =
        interactions?.map((item) => item.blog_id) || [];

      console.log("Blog IDs:", blogIds);

      if (blogIds.length === 0) {
        setLoading(false);
        return;
      }

      const { data: blogsData, error: blogsError } =
        await supabase
          .from("blogs")
          .select("*")
          .in("id", blogIds);

      console.log("Blogs:", blogsData);
      console.log("Blogs Error:", blogsError);

      setBlogs(blogsData || []);
    } catch (error) {
      console.error("RecentlyViewed Error:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">
          Recently Viewed
        </h2>
        <p className="text-gray-500">
          Loading...
        </p>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">
          Recently Viewed
        </h2>
        <p className="text-gray-500">
          No recently viewed blogs yet.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">
        Recently Viewed
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/blogs/${blog.slug}`}
          >
            <div className="border rounded-xl p-4 hover:shadow-lg transition">
              <h3 className="font-semibold">
                {blog.title}
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                {blog.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}