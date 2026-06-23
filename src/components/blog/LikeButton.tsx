"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function LikeButton({
  slug,
}: {
  slug: string;
}) {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  async function loadLikes() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { count } = await supabase
      .from("blog_likes")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("blog_slug", slug);

    setLikes(count || 0);

    if (user) {
      const { data } = await supabase
        .from("blog_likes")
        .select("*")
        .eq("user_id", user.id)
        .eq("blog_slug", slug)
        .single();

      setLiked(!!data);
    }
  }

  async function toggleLike() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    if (liked) {
      await supabase
        .from("blog_likes")
        .delete()
        .eq("user_id", user.id)
        .eq("blog_slug", slug);
    } else {
      await supabase
        .from("blog_likes")
        .insert({
          user_id: user.id,
          blog_slug: slug,
        });
    }

    loadLikes();
  }

  useEffect(() => {
    loadLikes();
  }, []);

  return (
    <button
      onClick={toggleLike}
      className="flex items-center gap-2"
    >
      <Heart
        size={18}
        fill={liked ? "currentColor" : "none"}
      />
      <span>{likes}</span>
    </button>
  );
}