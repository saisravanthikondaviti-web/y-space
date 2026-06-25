import { supabase } from "@/lib/supabase";
import LikeButton from "@/components/LikeButton";
import ViewTracker from "@/components/ViewTracker";
import { getBlogViews, getBlogLikes } from "@/lib/blog";
import RecentlyViewed from "@/components/RecentlyViewed";
import Image from "next/image";
import RelatedBlogs from "@/components/RelatedBlogs";

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
  const likes = blog ? await getBlogLikes(blog.id) : 0;

  console.log("SLUG:", slug);
  console.log("BLOG:", blog);
  console.log("ERROR:", error);

  if (!blog) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-xl font-bold">Blog not found</h1>
        <p className="text-gray-500">Check your slug or Supabase data</p>
      </div>
    );
  }

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <ViewTracker blogId={blog.id} />

      <>
        {blog.cover_image && (
          <div className="relative w-full h-[400px] rounded-3xl overflow-hidden mb-8">
            <Image
              src={blog.cover_image}
              alt={blog.title}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        )}

        <h1 className="text-4xl font-bold">{blog.title}</h1>
      </>

      <div className="flex gap-6 mt-4 text-sm text-gray-500">
        <span>👁 {views} Views</span>
        <span>❤️ {likes} Likes</span>
      </div>

      <div className="mt-8">{blog.content}</div>

      <LikeButton blogId={blog.id} />

      <RecentlyViewed />

      <RelatedBlogs category={blog.category} currentBlogId={blog.id} />
    </div>
  );
}
