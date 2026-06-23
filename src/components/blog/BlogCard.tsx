"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Share2, Clock } from "lucide-react";

import BlogStats from "./BlogStats";

export default function BlogCard({ blog }: any) {
  const shareBlog = () => {
    navigator.share?.({
      title: blog.title,
      url: `/blogs/${blog.slug}`,
    });
  };

  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      className="
      overflow-hidden
      rounded-3xl
      border border-white/10
      bg-white/[0.03]
      backdrop-blur-xl
      "
    >
      <Link href={`/blogs/${blog.slug}`}>
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className="h-60 w-full object-cover"
        />
      </Link>

      <div className="p-6">
        <h3 className="text-2xl font-bold">{blog.title}</h3>

        <p className="mt-3 text-zinc-400">{blog.excerpt}</p>

        <div className="mt-5 flex items-center gap-4 text-sm text-zinc-500">
          <Clock size={16} />
          {blog.readTime}
        </div>

        <div
          className="
          mt-6
          flex
          items-center
          justify-between
          border-t
          border-white/10
          pt-4
          "
        >
          <div className="flex gap-5">
            <BlogStats slug={blog.slug} />
          </div>

          <button onClick={shareBlog}>
            <Share2 size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
