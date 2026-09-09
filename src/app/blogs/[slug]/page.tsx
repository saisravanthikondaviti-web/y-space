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
    .maybeSingle();

  const views = blog ? await getBlogViews(blog.id) : 0;

  console.log("SLUG:", slug);
  console.log("BLOG:", blog);
  console.log("ERROR:", error);

  if (!blog) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-xl font-bold">Blog not found</h1>
        <p className="text-gray-500">
          Check your slug or Supabase data
        </p>
      </div>
    );
  }

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
          className="inline-flex items-center gap-2 mb-6 sm:mb-8 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full
          border border-white/10 bg-white/5 backdrop-blur-md
          hover:bg-white/10 hover:border-violet-500
          transition-all duration-300 group text-sm sm:text-base"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">
            ←
          </span>

          <span className="font-medium">
            Back to Blogs
          </span>
        </Link>

        <ViewTracker blogId={blog.id} />

        {/* Cover Image */}
        {blog.cover_image && (
          <div className="relative w-full aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden mb-7 sm:mb-8">
            <Image
              src={blog.cover_image}
              alt={blog.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 896px"
              priority
            />
          </div>
        )}

        {/* Title */}
        <h1
          className="
            text-[2rem] leading-[1.15]
            sm:text-4xl sm:leading-[1.15]
            md:text-5xl md:leading-[1.1]
            font-bold tracking-tight
            break-words
          "
        >
          {blog.title}
        </h1>

        {/* Views */}
        <div className="flex items-center gap-6 mt-4 sm:mt-5 text-xs sm:text-sm text-gray-400">
          <span>👁 {views} Views</span>
        </div>

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