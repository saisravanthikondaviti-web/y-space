import BlogCard from "@/components/blog/BlogCard";
import RecentBlogs from "@/components/blog/RecentBlogs";
import { blogs } from "@/data/blogs";

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-7xl px-8 py-32">

        <h1
          className="
          text-center
          text-6xl
          font-bold
          "
        >
          Insights & Stories
        </h1>

        <p
          className="
          mt-6
          text-center
          text-zinc-400
          "
        >
          Ideas, innovation and growth.
        </p>

        <RecentBlogs allBlogs={blogs} />

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
            />
          ))}
        </div>
      </section>
    </main>
  );
}