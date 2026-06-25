import Link from "next/link";
import Image from "next/image";

export default function BlogCard({
  blog,
}: {
  blog: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    cover_image?: string;
    views: number;
    likes: number;
  };
}) {
  return (
    <Link href={`/blogs/${blog.slug}`}>
      <article className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:shadow-2xl cursor-pointer">
        {blog.cover_image && (
          <div className="relative h-60 w-full overflow-hidden">
            <Image
              src={blog.cover_image}
              alt={blog.title}
              fill
              sizes="(max-width:768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>
        )}

        <div className="p-6">
          <h2 className="text-xl font-bold line-clamp-2">
            {blog.title}
          </h2>

          <p className="mt-3 text-sm text-gray-400 line-clamp-3">
            {blog.excerpt}
          </p>

          <div className="mt-5 flex items-center gap-5 text-sm text-gray-400">
            <span>👁 {blog.views}</span>
            <span>❤️ {blog.likes}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}