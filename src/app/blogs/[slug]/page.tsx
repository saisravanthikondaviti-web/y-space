import { blogs } from "@/data/blogs";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Heart, Eye } from "lucide-react";

import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";
import RecentBlogs from "@/components/blog/RecentBlogs";

export default async function BlogDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) notFound();

  const relatedBlogs = blogs
    .filter((item) => item.slug !== blog.slug)
    .slice(0, 3);

  return (
    <>
      <ScrollProgress />
      <SmoothScroll />
      <CustomCursor />
      <Navbar />

      <main className="min-h-screen bg-black text-white">
        <article className="mx-auto max-w-4xl px-8 py-24">
          {/* Back Button */}
          <Link
            href="/blogs"
            className="
              mb-10
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/10
              bg-white/5
              px-5
              py-3
              text-sm
              text-zinc-300
              transition-all
              hover:bg-white/10
              hover:text-white
            "
          >
            <ArrowLeft size={18} />
            Back to Blogs
          </Link>

          {/* Thumbnail */}
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="
              mb-10
              h-[500px]
              w-full
              rounded-3xl
              object-cover
            "
          />

          {/* Title */}
          <h1 className="text-5xl font-bold leading-tight">{blog.title}</h1>

          {/* Meta */}
          <div className="mt-5 flex flex-wrap items-center gap-6 text-zinc-400">
            <span>{blog.author}</span>

            <span>{blog.date}</span>

            <span className="flex items-center gap-2">
              <Heart size={18} />
              {blog.likes}
            </span>

            <span className="flex items-center gap-2">
              <Eye size={18} />
              {blog.views}
            </span>
          </div>

          {/* Content */}
          <div
            className="
              prose
              prose-invert
              mt-14
              max-w-none
              prose-p:text-zinc-300
              prose-headings:text-white
            "
          >
            {blog.content}
          </div>

          {/* Continue Reading */}
          <section className="mt-24 border-t border-white/10 pt-16">
            <h2 className="mb-10 text-3xl font-bold">Continue Reading</h2>

            <div className="grid gap-8 md:grid-cols-3">
              {relatedBlogs.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blogs/${item.slug}`}
                  className="
                    group
                    overflow-hidden
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    transition-all
                    hover:border-white/20
                    hover:-translate-y-1
                  "
                >
                  <div className="overflow-hidden">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="
                        h-52
                        w-full
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-105
                      "
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="font-semibold text-lg">{item.title}</h3>

                    <p className="mt-3 text-sm text-zinc-400">{item.excerpt}</p>

                    <div className="mt-4 flex gap-4 text-xs text-zinc-500">
                      <span className="flex items-center gap-1">
                        <Heart size={14} />
                        {item.likes}
                      </span>

                      <span className="flex items-center gap-1">
                        <Eye size={14} />
                        {item.views}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </article>

        <div className="mx-auto max-w-6xl px-8 pb-20">
          <RecentBlogs />
        </div>
      </main>

      <Footer />
    </>
  );
}
