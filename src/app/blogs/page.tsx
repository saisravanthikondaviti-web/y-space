import { supabase } from "@/lib/supabase";
import { getBlogViews, getBlogLikes } from "@/lib/blog";
import RecentlyViewed from "@/components/RecentlyViewed";
import TrendingBlogs from "@/components/TrendingBlogs";
import BlogSearch from "@/components/BlogSearch";
import Navbar from "@/components/layout/Navbar";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CustomCursor from "@/components/ui/CustomCursor";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VAI SPACE Blogs | Branding, Marketing & Web Tips",
  description:
    "Discover expert insights on branding, web development, AI, SEO, digital marketing, UI/UX, and business growth through practical guides and industry updates from the VAI SPACE team.",
};

export default async function BlogsPage() {
  const { data: blogs, error } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });

  const blogsWithStats = await Promise.all(
    (blogs || []).map(async (blog) => ({
      ...blog,
      views: await getBlogViews(blog.id),
      likes: await getBlogLikes(blog.id),
    })),
  );

  // 🔥 IMPORTANT: handle error OR empty state
  if (error) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-xl font-bold">Failed to load blogs</h1>
        <p className="text-gray-500">{error.message}</p>
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-xl font-bold">No blogs found</h1>
        <p className="text-gray-500">Add blogs in Supabase</p>
      </div>
    );
  }

  return (
    <>
      <ScrollProgress />
      <SmoothScroll />
      <CustomCursor />

      <Navbar />

      <main className="max-w-7xl mx-auto px-10 pt-32">
        <p className="my-6 text-xs uppercase tracking-[0.3em] text-[#8E96FF]">
          Blogs
        </p>

        <BlogSearch blogs={blogsWithStats} />

        <TrendingBlogs />

        <RecentlyViewed />
      </main>

      <Footer />
    </>
  );
}
