import { supabase } from "@/lib/supabase";
import BlogCard from "@/components/BlogCard";
import { getBlogViews, getBlogLikes } from "@/lib/blog";
import RecentlyViewed from "@/components/RecentlyViewed";
import TrendingBlogs from "@/components/TrendingBlogs";
import BlogSearch from "@/components/BlogSearch";


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
    <div className="p-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Blogs</h1>

      <BlogSearch blogs={blogsWithStats} />

      <TrendingBlogs />
      <RecentlyViewed />
    </div>
  );
}
