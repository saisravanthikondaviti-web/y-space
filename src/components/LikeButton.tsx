"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LikeButton({
  blogId,
}: {
  blogId: string;
}) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    loadLikes();
  }, [blogId]);

  async function loadLikes() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: likes } = await supabase
      .from("blog_likes")
      .select("*")
      .eq("blog_id", blogId);

    setCount(likes?.length || 0);

    const userLike = likes?.find(
      (like) => like.user_id === user?.id
    );

    setLiked(!!userLike);
  }

  async function toggleLike() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login to like blogs");
      return;
    }

    if (liked) {
      await supabase
        .from("blog_likes")
        .delete()
        .eq("blog_id", blogId)
        .eq("user_id", user.id);

      setLiked(false);
      setCount((prev) => prev - 1);
    } else {
      await supabase
        .from("blog_likes")
        .insert({
          blog_id: blogId,
          user_id: user.id,
        });

      setLiked(true);
      setCount((prev) => prev + 1);
    }
  }

  return (
    <button
      onClick={toggleLike}
      className="mt-6 rounded-lg border px-4 py-2"
    >
      ❤️ {count}
    </button>
  );
}