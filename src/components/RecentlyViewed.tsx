"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
}

interface Interaction {
  blog_id: string;
}

export default function RecentlyViewed() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadRecentlyViewed = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          if (isMounted) {
            setLoading(false);
          }
          return;
        }

        const { data: interactions, error: interactionsError } = await supabase
          .from("user_blog_interactions")
          .select("blog_id")
          .eq("user_id", user.id)
          .eq("interaction_type", "view")
          .order("created_at", { ascending: false });

        if (interactionsError || !interactions?.length) {
          if (isMounted) {
            setLoading(false);
          }
          return;
        }

        // Remove duplicates while preserving newest first
        const blogIds = [
          ...new Set(
            (interactions as Interaction[]).map(
              (interaction) => interaction.blog_id
            )
          ),
        ].slice(0, 5);

        const { data: blogsData, error: blogsError } = await supabase
          .from("blogs")
          .select("id, slug, title, excerpt")
          .in("id", blogIds);

        if (blogsError || !blogsData) {
          if (isMounted) {
            setBlogs([]);
            setLoading(false);
          }
          return;
        }

        // Preserve original recently viewed order
        const orderedBlogs = blogIds
          .map((id) => blogsData.find((blog) => blog.id === id))
          .filter(Boolean) as Blog[];

        if (isMounted) {
          setBlogs(orderedBlogs);
        }
      } catch (error) {
        console.error("RecentlyViewed Error:", error);

        if (isMounted) {
          setBlogs([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadRecentlyViewed();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="mt-16">
        <h2 className="mb-6 text-2xl font-bold">Recently Viewed</h2>
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="mt-16">
        <h2 className="mb-6 text-2xl font-bold">Recently Viewed</h2>
        <p className="text-gray-500">No recently viewed blogs yet.</p>
      </div>
    );
  }

  return (
    <div className="mt-16">
      <h2 className="mb-6 text-2xl font-bold">Recently Viewed</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {blogs.map((blog) => (
          <Link key={blog.id} href={`/blogs/${blog.slug}`}>
            <div className="flex h-64 flex-col rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-white/20 hover:shadow-lg">
              <h3 className="line-clamp-2 text-xl font-semibold">
                {blog.title}
              </h3>

              <p className="mt-3 flex-1 line-clamp-3 text-sm text-gray-400">
                {blog.excerpt ?? "No description available."}
              </p>

              <div className="mt-4">
                <span className="text-sm font-medium text-violet-400">
                  Read More →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}