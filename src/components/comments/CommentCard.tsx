
"use client";

import { Comment } from "@/types/comment";
import { MessageCircle } from "lucide-react";

interface Props {
  comment: Comment;
}

function getRelativeTime(date: string) {
  const now = new Date();
  const created = new Date(date);

  const seconds = Math.floor(
    (now.getTime() - created.getTime()) / 1000
  );

  if (seconds < 60) return "Just now";

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 7) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }

  return created.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function CommentCard({ comment }: Props) {
  const initials = comment.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const formattedDate = getRelativeTime(comment.created_at);

  return (
    <div
      className="
        rounded-3xl
        border
        border-white/10
        bg-white/[0.03]
        p-6
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-[#616CFA]/30
      "
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div
          className="
            flex
            h-12
            w-12
            flex-shrink-0
            items-center
            justify-center
            rounded-full
            bg-gradient-to-r
            from-[#616CFA]
            to-[#E46ECC]
            font-semibold
            text-white
          "
        >
          {initials}
        </div>

        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-wrap items-center gap-3">
            <h4 className="font-semibold text-white">
              {comment.name}
            </h4>

            <span className="text-xs text-white/40">
              {formattedDate}
            </span>
          </div>

          {/* Comment */}
          <p className="mt-3 whitespace-pre-wrap leading-7 text-white/70">
            {comment.comment}
          </p>

          {/* Footer */}
          <div className="mt-5 flex items-center gap-2 text-sm text-white/40">
            <MessageCircle size={16} />
            Comment
          </div>
        </div>
      </div>
    </div>
  );
}

