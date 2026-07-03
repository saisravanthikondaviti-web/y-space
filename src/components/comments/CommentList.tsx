"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

import { Comment } from "@/types/comment";
import { getComments } from "@/lib/comment";
import CommentCard from "./CommentCard";

interface Props {
  blogId: string;
  refreshKey: number;
}

export default function CommentList({
  blogId,
  refreshKey,
}: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadComments() {
    try {
      setLoading(true);

      const data = await getComments(blogId);

      setComments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadComments();
  }, [blogId, refreshKey]);

  if (loading) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur-xl">
        <p className="text-white/60">
          Loading comments...
        </p>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-10 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/[0.05]">
          <MessageCircle className="h-8 w-8 text-white/40" />
        </div>

        <h3 className="text-xl font-semibold text-white">
          No comments yet
        </h3>

        <p className="mt-2 text-white/50">
          Be the first to share your thoughts.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
        />
      ))}
    </div>
  );
}