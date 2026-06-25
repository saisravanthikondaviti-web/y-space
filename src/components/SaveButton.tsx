"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Bookmark } from "lucide-react";

export default function SaveButton({ blogId }: { blogId: string }) {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSaved();
  }, []);

  async function checkSaved() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("blog_saved")
      .select("id")
      .eq("blog_id", blogId)
      .eq("user_id", user.id)
      .maybeSingle();

    setSaved(!!data);
    setLoading(false);
  }

  async function toggleSave() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    if (saved) {
      await supabase
        .from("blog_saved")
        .delete()
        .eq("blog_id", blogId)
        .eq("user_id", user.id);

      setSaved(false);
    } else {
      await supabase.from("blog_saved").insert({
        blog_id: blogId,
        user_id: user.id,
      });

      setSaved(true);
    }
  }

  if (loading) return null;

  return (
    <button
      onClick={toggleSave}
      className={`flex h-12 items-center justify-center gap-2 rounded-full border px-6 transition-all duration-300 ${
        saved
          ? "border-yellow-500 bg-yellow-500 text-black"
          : "border-white/20 bg-transparent text-white hover:bg-white/10"
      }`}
    >
      <Bookmark size={18} fill={saved ? "currentColor" : "none"} />
      <span className="font-medium">{saved ? "Saved" : "Save"}</span>
    </button>
  );
}
