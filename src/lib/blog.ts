import { supabase } from "@/lib/supabase";

export async function getBlogViews(blogId: string) {
  const { count } = await supabase
    .from("blog_views")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("blog_id", blogId);

  return count || 0;
}

export async function getBlogLikes(blogId: string) {
  const { count } = await supabase
    .from("blog_likes")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("blog_id", blogId);

  return count || 0;
}

export async function getTrendingBlogs() {
  const { data: blogs } = await supabase
    .from("blogs")
    .select("*");

  if (!blogs) return [];

  const blogsWithViews = await Promise.all(
    blogs.map(async (blog) => ({
      ...blog,
      views: await getBlogViews(blog.id),
      likes: await getBlogLikes(blog.id),
    }))
  );

  return blogsWithViews
    .sort((a, b) => b.views - a.views)
    .slice(0, 3);
}