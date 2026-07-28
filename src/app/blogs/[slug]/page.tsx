import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CustomCursor from "@/components/ui/CustomCursor";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import ShareButton from "@/components/ShareButton";

// ✅ REQUIRED for static export
export async function generateStaticParams() {
  return [{ slug: "sample-blog" }];
}

export default async function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  // ✅ STATIC BLOG DATA (temporary)
  const blog = {
    id: "1",
    title: "Welcome to VAI SPACE Blog",
    content:
      "This is a sample blog page. Your dynamic blog system is temporarily disabled for static hosting. You can later connect it back using Vercel or API-based approach.",
    cover_image: "",
    category: "general",
    slug: slug,
  };

  const views = 0;

  return (
    <>
      <ScrollProgress />
      <SmoothScroll />
      <CustomCursor />
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 lg:px-10 pt-36 pb-20">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 rounded-full
          border border-white/10 bg-white/5 backdrop-blur-md
          hover:bg-white/10 hover:border-violet-500
          transition-all duration-300 group"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">
            ←
          </span>
          <span className="font-medium">Back to Blogs</span>
        </Link>

        {/* COVER IMAGE */}
        {blog.cover_image && (
          <div className="relative w-full h-[400px] rounded-3xl overflow-hidden mb-8">
            <Image
              src={blog.cover_image}
              alt={blog.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        )}

        {/* TITLE */}
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          {blog.title}
        </h1>

        {/* VIEWS */}
        <div className="flex items-center gap-6 mt-5 text-sm text-gray-400">
          <span>👁 {views} Views</span>
        </div>

        {/* CONTENT */}
        <article className="mt-8 whitespace-pre-wrap leading-8 text-gray-300">
          {blog.content}
        </article>

        {/* SHARE ONLY (safe) */}
        <div className="flex items-center gap-4 mt-10">
          <ShareButton slug={blog.slug} />
        </div>
      </main>

      <Footer />
    </>
  );
}