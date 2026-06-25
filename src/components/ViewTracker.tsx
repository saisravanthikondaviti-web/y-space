"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function ViewTracker({ blogId }: { blogId: string }) {
  useEffect(() => {
    async function trackView() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // Store view
      await supabase.from("blog_views").insert({
        blog_id: blogId,
        user_id: user?.id ?? null,
      });

      // Store interaction for recently viewed
      if (user) {
        const { error } = await supabase.from("user_blog_interactions").insert({
          blog_id: blogId,
          user_id: user.id,
          interaction_type: "view",
        });

        console.log("Interaction Error:", error);
      }
    }

    trackView();
  }, [blogId]);

  return null;
}
