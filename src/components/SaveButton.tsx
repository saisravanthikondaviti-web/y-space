"use client";

import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface SaveButtonProps {
  blogId: string;
}

export default function SaveButton({ blogId }: SaveButtonProps) {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const loadSavedStatus = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          if (!ignore) setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from("blog_saved")
          .select("id")
          .eq("blog_id", blogId)
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) {
          console.error(error);
        }

        if (!ignore) {
          setSaved(Boolean(data));
          setLoading(false);
        }
      } catch (error) {
        console.error(error);

        if (!ignore) {
          setLoading(false);
        }
      }
    };
  loadSavedStatus();

    return () => {
      ignore = true;
    };
  }, [blogId]);

  async function toggleSave() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    try {
      if (saved) {
        const { error } = await supabase
          .from("blog_saved")
          .delete()
          .eq("blog_id", blogId)
          .eq("user_id", user.id);

        if (error) throw error;

        setSaved(false);
      } else {
        const { error } = await supabase.from("blog_saved").insert({
          blog_id: blogId,
          user_id: user.id,
        });

        if (error) throw error;

        setSaved(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={toggleSave}
      className={`flex h-12 items-center justify-center gap-2 rounded-full border px-6 transition-all duration-300 ${
        saved
          ? "border-yellow-500 bg-yellow-500 text-black"
          : "border-white/20 bg-transparent text-white hover:bg-white/10"
      }`}
    >
      <Bookmark
        size={18}
        fill={saved ? "currentColor" : "none"}
      />
      <span className="font-medium">
        {saved ? "Saved" : "Save"}
      </span>
    </button>
  );
}