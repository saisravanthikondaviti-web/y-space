"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import BlogCard from "./BlogCard";

interface Blog {
  id: string;
  title: string;
  slug: string;
  cover_image: string | null;
  excerpt: string;
  views: number;
  likes: number;
}

export default function ProfileLikedBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function fetchLikedBlogs() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          if (!ignore) {
            setLoading(false);
          }

          return;
        }

        const { data: likes, error: likesError } = await supabase
          .from("blog_likes")
          .select("blog_id")
          .eq("user_id", user.id);

        if (likesError) {
          throw likesError;
        }

        if (ignore) {
          return;
        }

        const ids = likes?.map((item) => item.blog_id) ?? [];

        if (ids.length === 0) {
          setBlogs([]);
          setLoading(false);
          return;
        }

        const { data: blogsData, error: blogsError } = await supabase
          .from("blogs")
          .select("*")
          .in("id", ids);

        if (blogsError) {
          throw blogsError;
        }

        if (ignore) {
          return;
        }

        const blogsWithStats: Blog[] = (blogsData ?? []).map((blog) => ({
          id: blog.id,
          title: blog.title,
          slug: blog.slug,
          cover_image: blog.cover_image ?? null,
          excerpt: blog.excerpt ?? "",
          views: blog.views ?? 0,
          likes: blog.likes ?? 0,
        }));

        setBlogs(blogsWithStats);
      } catch (error) {
        console.error("Failed to fetch liked blogs:", error);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    void fetchLikedBlogs();

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return <p className="mt-8 text-gray-400">Loading liked blogs...</p>;
  }

  if (blogs.length === 0) {
    return (
      <p className="mt-8 text-gray-400">
        You haven&apos;t liked any blogs yet.
      </p>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
