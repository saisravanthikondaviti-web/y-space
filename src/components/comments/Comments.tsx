"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";

import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

interface Props {
  blogId: string;
}

export default function Comments({ blogId }: Props) {
  const [refreshKey, setRefreshKey] = useState(0);

  async function handleCommentAdded() {
    setRefreshKey((prev) => prev + 1);
  }

  return (
    <section className="mt-20">
      {/* Heading */}
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#616CFA] to-[#E46ECC]">
          <MessageCircle className="h-6 w-6 text-white" />
        </div>

        <div>

          <p className="mt-1 text-white/50">
            Share your thoughts about this article.
          </p>
        </div>
      </div>

      {/* Comment Form */}
      <CommentForm
        blogId={blogId}
        onCommentAdded={handleCommentAdded}
      />

      {/* Comments */}
      <div className="mt-12">
        <CommentList
          blogId={blogId}
          refreshKey={refreshKey}
        />
      </div>
    </section>
  );
}