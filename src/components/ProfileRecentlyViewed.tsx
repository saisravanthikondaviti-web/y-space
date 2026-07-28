"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import BlogCard from "./BlogCard";
import { Blog } from "@/types/blog";

export default function ProfileRecentlyViewed() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadRecentlyViewed() {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          if (isMounted) setLoading(false);
          return;
        }

        const { data: interactions, error: interactionsError } =
          await supabase
            .from("user_blog_interactions")
            .select("blog_id")
            .eq("user_id", user.id)
            .eq("interaction_type", "view")
            .order("created_at", {
              ascending: false,
            });

        if (
          interactionsError ||
          !interactions ||
          interactions.length === 0
        ) {
          if (isMounted) setLoading(false);
          return;
        }

        const uniqueBlogIds = [
          ...new Set(
            interactions.map(
              (item) => item.blog_id,
            ),
          ),
        ].slice(0, 8);

        const { data: blogsData, error: blogsError } =
          await supabase
            .from("blogs")
            .select("*")
            .in("id", uniqueBlogIds);

        if (blogsError || !blogsData) {
          if (isMounted) {
            setBlogs([]);
            setLoading(false);
          }

          return;
        }

        const orderedBlogs: Blog[] = uniqueBlogIds.reduce<Blog[]>(
          (accumulator, id) => {
            const blog = blogsData.find(
              (item) => item.id === id,
            );

            if (!blog) {
              return accumulator;
            }

            accumulator.push({
              id: blog.id,
              title: blog.title,
              slug: blog.slug,
              excerpt: blog.excerpt ?? "",
              cover_image: blog.cover_image ?? null,
              views: blog.views ?? 0,
              likes: blog.likes ?? 0,
              content: blog.content ?? null,
              category: blog.category ?? null,
              created_at:
                blog.created_at ?? undefined,
            });

            return accumulator;
          },
          [],
        );

        if (isMounted) {
          setBlogs(orderedBlogs);
          setLoading(false);
        }
      } catch (error) {
        console.error(
          "Failed to load recently viewed blogs:",
          error,
        );

        if (isMounted) {
          setBlogs([]);
          setLoading(false);
        }
      }
    }

    void loadRecentlyViewed();

    return () => {
      isMounted = false;
    };
  }, []);

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
    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  );
}