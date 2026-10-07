import { supabase } from "@/lib/supabase";
import LikeButton from "@/components/LikeButton";
import ViewTracker from "@/components/ViewTracker";
import { getBlogViews } from "@/lib/blog";
import RecentlyViewed from "@/components/RecentlyViewed";
import Image from "next/image";
import RelatedBlogs from "@/components/RelatedBlogs";
import Navbar from "@/components/layout/Navbar";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CustomCursor from "@/components/ui/CustomCursor";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import ShareButton from "@/components/ShareButton";
import Comments from "@/components/comments/Comments";

export const dynamic = "force-dynamic";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: blog, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error("Failed to load blog:", error);
  }

  console.log("BLOG SLUG:", slug);
  console.log("BLOG DATA:", blog);
  console.log("BLOG ERROR:", error);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-xl font-bold">Blog not found</h1>
          <p className="mt-2 text-gray-500">
            Check the blog slug or Supabase data.
          </p>

          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300"
          >
            ← Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  const views = await getBlogViews(blog.id);

  return (
    <>
      <ScrollProgress />
      <SmoothScroll />
      <CustomCursor />

      <Navbar />

      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20">
        {/* Back Button */}
        <Link
          href="/blogs"
          className="
            inline-flex items-center gap-2
            mb-6 sm:mb-8
            px-4 sm:px-5 py-2 sm:py-2.5
            rounded-full
            border border-white/10
            bg-white/5
            backdrop-blur-md
            hover:bg-white/10
            hover:border-violet-500
            transition-all duration-300
            group
            text-sm sm:text-base
          "
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">
            ←
          </span>

          <span className="font-medium">Back to Blogs</span>
        </Link>

        <ViewTracker blogId={blog.id} />

        {/* Cover Image */}
        {blog.cover_image && (
          <div className="relative w-full aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden mb-7 sm:mb-8">
            <Image
              src={blog.cover_image}
              alt={blog.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 896px"
            />
          </div>
        )}

        {/* Category */}
        {blog.category && (
          <div className="mb-4">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[#8E96FF]">
              {blog.category}
            </span>
          </div>
        )}

        {/* Title */}
        <h1
          className="
            text-[2rem] leading-[1.15]
            sm:text-4xl sm:leading-[1.15]
            md:text-5xl md:leading-[1.1]
            font-bold
            tracking-tight
            break-words
          "
        >
          {blog.title}
        </h1>

        {/* Views */}
        <div className="flex items-center gap-6 mt-4 sm:mt-5 text-xs sm:text-sm text-gray-400">
          <span>👁 {views} Views</span>
        </div>

        {/* Excerpt */}
        {blog.excerpt && (
          <p
            className="
              mt-5 sm:mt-6
              text-base sm:text-lg
              leading-7 sm:leading-8
              text-gray-400
              break-words
            "
          >
            {blog.excerpt}
          </p>
        )}

        {/* Blog Content */}
        <article
          className="
            mt-7 sm:mt-8
            text-[1rem] leading-7
            sm:text-[1.05rem] sm:leading-7
            md:text-[1.125rem] md:leading-8
            text-gray-300
            whitespace-pre-wrap
            break-words
          "
        >
          {blog.content}
        </article>

        {/* Actions */}
        <div className="flex items-center gap-3 sm:gap-4 mt-8 sm:mt-10">
          <LikeButton />
          <ShareButton slug={blog.slug} />
        </div>

        {/* Comments */}
        <div className="mt-12 sm:mt-16">
          <Comments blogId={blog.id} />
        </div>

        {/* Related Blogs */}
        <div className="mt-16 sm:mt-20">
          <RelatedBlogs
            category={blog.category}
            currentBlogId={blog.id}
          />
        </div>

        {/* Recently Viewed */}
        <div className="mt-16 sm:mt-20">
          <RecentlyViewed />
        </div>
      </main>

      <Footer />
    </>
  );
}