"use client";

import { useEffect, useState } from "react";
import { Eye, Heart } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function BlogStats({
  slug,
}: {
  slug: string;
}) {
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    async function loadStats() {
      const { count: viewCount } = await supabase
        .from("blog_views")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("blog_slug", slug);

      const { count: likeCount } = await supabase
        .from("blog_likes")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("blog_slug", slug);

      setViews(viewCount || 0);
      setLikes(likeCount || 0);
    }

    loadStats();

    const channel = supabase
      .channel(`blog-${slug}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "blog_likes",
        },
        () => loadStats()
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "blog_views",
        },
        () => loadStats()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [slug]);

  return (
    <>
      <span className="flex items-center gap-2">
        <Heart size={16} />
        {likes}
      </span>

      <span className="flex items-center gap-2">
        <Eye size={16} />
        {views}
      </span>
    </>
  );
}