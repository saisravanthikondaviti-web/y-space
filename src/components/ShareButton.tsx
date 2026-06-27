"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

interface Props {
  slug: string;
}

export default function ShareButton({ slug }: Props) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}/blogs/${slug}`;

    try {
      // 1. Native share (mobile)
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          text: "Check out this blog",
          url,
        });
        return;
      }

      // 2. Fallback: copy link
      await navigator.clipboard.writeText(url);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2 rounded-full
        border border-white/10 bg-white/5 backdrop-blur-md
        hover:bg-white/10 hover:border-violet-500
        transition-all duration-300"
    >
      {copied ? (
        <>
          <Check size={18} className="text-green-400" />
          <span className="text-sm">Copied!</span>
        </>
      ) : (
        <>
          <Share2 size={18} />
          <span className="text-sm">Share</span>
        </>
      )}
    </button>
  );
}