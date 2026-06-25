import BlogCard from "@/components/BlogCard";
import { supabase } from "@/lib/supabase";
import { getBlogViews, getBlogLikes } from "@/lib/blog";

export default async function RelatedBlogs({
  category,
  currentBlogId,
}: {
  category: string;
  currentBlogId: string;
}) {
  const { data: blogs } = await supabase
    .from("blogs")
    .select("*")
    .eq("category", category)
    .neq("id", currentBlogId)
    .limit(3);

  if (!blogs || blogs.length === 0) {
    return null;
  }

  const blogsWithStats = await Promise.all(
    blogs.map(async (blog) => ({
      ...blog,
      views: await getBlogViews(blog.id),
      likes: await getBlogLikes(blog.id),
    }))
  );

  return (
    <section className="mt-20">
      <h2 className="text-3xl font-bold mb-8">
        Related Blogs
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogsWithStats.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
          />
        ))}
      </div>
    </section>
  );
}