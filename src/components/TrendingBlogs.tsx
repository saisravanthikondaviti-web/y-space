import BlogCard from "@/components/BlogCard";
import { getTrendingBlogs } from "@/lib/blog";

export default async function TrendingBlogs() {
  const blogs = await getTrendingBlogs();

  if (blogs.length === 0) return null;

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8">
        🔥 Trending Blogs
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
          />
        ))}
      </div>
    </section>
  );
}