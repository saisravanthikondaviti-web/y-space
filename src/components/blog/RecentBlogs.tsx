"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { blogs } from "@/data/blogs";
import { supabase } from "@/lib/supabase";

export default function RecentBlogs() {
  const [recentBlogs, setRecentBlogs] = useState<any[]>([]);

  useEffect(() => {
    async function loadRecentBlogs() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("blog_views")
        .select("blog_slug")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(6);

      if (!data) return;

      const uniqueSlugs = [
        ...new Set(data.map((item) => item.blog_slug)),
      ];

      const matchedBlogs = blogs.filter((blog) =>
        uniqueSlugs.includes(blog.slug)
      );

      setRecentBlogs(matchedBlogs);
    }

    loadRecentBlogs();
  }, []);

  if (recentBlogs.length === 0) return null;

  return (
    <section className="mt-24 border-t border-white/10 pt-16">
      <h2 className="mb-8 text-3xl font-bold">
        Recently Viewed
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recentBlogs.map((blog) => (
          <Link
            key={blog.slug}
            href={`/blogs/${blog.slug}`}
            className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
          >
            <img
              src={blog.thumbnail}
              alt={blog.title}
              className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
            />

            <div className="p-5">
              <h3 className="font-semibold text-lg">
                {blog.title}
              </h3>

              <p className="mt-2 text-sm text-zinc-400">
                {blog.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}