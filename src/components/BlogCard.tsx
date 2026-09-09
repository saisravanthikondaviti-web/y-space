import Link from "next/link";
import Image from "next/image";
import type { Blog } from "@/types/blog";

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link href={`/blogs/${blog.slug}`} className="block h-full">
      <article className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:shadow-2xl">

        {/* Blog Image — Always 16:9 */}
        {blog.cover_image && (
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
            <Image
              src={blog.cover_image}
              alt={blog.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">

          {/* Title — Full text visible */}
          <h2 className="text-xl font-bold leading-snug break-words">
            {blog.title}
          </h2>

          {/* Excerpt — Full text visible */}
          {blog.excerpt && (
            <p className="mt-3 text-sm leading-6 text-gray-400 break-words">
              {blog.excerpt}
            </p>
          )}

          {/* Views & Likes */}
          <div className="mt-auto pt-5 flex items-center gap-5 text-sm text-gray-400">
            <span>👁 {blog.views}</span>
            <span>❤️ {blog.likes}</span>
          </div>

        </div>
      </article>
    </Link>
  );
}