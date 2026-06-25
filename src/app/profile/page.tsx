"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CustomCursor from "@/components/ui/CustomCursor";
import { supabase } from "@/lib/supabase";
import { Heart, Eye, BookOpen, Bookmark } from "lucide-react";
import ProfileLikedBlogs from "@/components/ProfileLikedBlogs";
import ProfileRecentlyViewed from "@/components/ProfileRecentlyViewed";

export default function ProfilePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  const [stats, setStats] = useState({
    likes: 0,
    views: 0,
    read: 0,
    saved: 0,
  });

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/auth");
        return;
      }

      setUser(user);
      const { count: likes } = await supabase
        .from("blog_likes")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);

      const { count: views } = await supabase
        .from("blog_views")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);

      const { count: read } = await supabase
        .from("user_blog_interactions")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("interaction_type", "view");

      setStats({
        likes: likes ?? 0,
        views: views ?? 0,
        read: read ?? 0,
        saved: 0,
      });
      setLoading(false);
    }

    loadUser();
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading Profile...
      </div>
    );
  }

  const username =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "User";

  return (
    <>
      <ScrollProgress />
      <SmoothScroll />
      <CustomCursor />
      <Navbar />

      <main className="max-w-6xl mx-auto pt-36 px-8">
        <h1 className="text-5xl font-bold mb-10">My Profile</h1>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-semibold">{username}</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
              <Heart className="mx-auto mb-3 text-pink-500" size={28} />
              <p className="text-3xl font-bold">{stats.likes}</p>
              <p className="text-gray-400 mt-2">Likes</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
              <Eye className="mx-auto mb-3 text-cyan-400" size={28} />
              <p className="text-3xl font-bold">{stats.views}</p>
              <p className="text-gray-400 mt-2">Views</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
              <BookOpen className="mx-auto mb-3 text-yellow-400" size={28} />
              <p className="text-3xl font-bold">{stats.read}</p>
              <p className="text-gray-400 mt-2">Blogs Read</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
              <Bookmark className="mx-auto mb-3 text-green-400" size={28} />
              <p className="text-3xl font-bold">{stats.saved}</p>
              <p className="text-gray-400 mt-2">Saved</p>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-bold">❤️ Liked Blogs</h2>

            <ProfileLikedBlogs />
          </div>

          <div className="mt-20">
            <h2 className="text-3xl font-bold">👁 Recently Viewed</h2>

            <ProfileRecentlyViewed />
          </div>

          <p className="text-gray-400 mt-2">{user.email}</p>
        </div>
      </main>

      <Footer />
    </>
  );
}
