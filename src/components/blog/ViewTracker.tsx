"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ViewTracker({
  slug,
}: {
  slug: string;
}) {
  const [views, setViews] = useState(0);

  useEffect(() => {
    async function trackView() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        await supabase.from("blog_views").upsert(
  {
    user_id: user.id,
    blog_slug: slug,
  },
  {
    onConflict: "user_id,blog_slug",
  }
);

      const { count } = await supabase
        .from("blog_views")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("blog_slug", slug);

      setViews(count || 0);
    }

    trackView();
  }, [slug]);

  return (
    <div className="flex items-center gap-2">
      <Eye size={18} />
      <span>{views}</span>
    </div>
  );
}