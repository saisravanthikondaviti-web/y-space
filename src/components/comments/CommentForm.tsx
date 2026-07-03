"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { addComment } from "@/lib/comment";

interface CommentFormProps {
  blogId: string;
  onCommentAdded: () => Promise<void>;
}

export default function CommentForm({
  blogId,
  onCommentAdded,
}: CommentFormProps) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim() || !comment.trim()) return;

    try {
      setLoading(true);

      await addComment(
        blogId,
        name.trim(),
        comment.trim()
      );

      setName("");
      setComment("");

      await onCommentAdded();
    } catch (err) {
      console.error(err);
      alert("Failed to post comment.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
    >
      <h3 className="mb-6 text-2xl font-semibold text-white">
        Leave a Comment
      </h3>

      {/* Name */}
      <div className="mb-5">
        <label className="mb-2 block text-sm text-white/60">
          Your Name
        </label>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="
            w-full
            rounded-xl
            border
            border-white/10
            bg-white/5
            px-4
            py-3
            text-white
            outline-none
            transition
            placeholder:text-white/30
            focus:border-[#616CFA]
          "
        />
      </div>

      {/* Comment */}
      <div>
        <label className="mb-2 block text-sm text-white/60">
          Comment
        </label>

        <textarea
          rows={5}
          placeholder="Share your thoughts..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="
            w-full
            resize-none
            rounded-xl
            border
            border-white/10
            bg-white/5
            px-4
            py-3
            text-white
            outline-none
            transition
            placeholder:text-white/30
            focus:border-[#616CFA]
          "
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="
          mt-6
          inline-flex
          items-center
          gap-2
          rounded-full
          bg-gradient-to-r
          from-[#616CFA]
          to-[#E46ECC]
          px-6
          py-3
          font-medium
          text-white
          transition-all
          duration-300
          hover:scale-105
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {loading ? (
          "Posting..."
        ) : (
          <>
            <Send size={18} />
            Post Comment
          </>
        )}
      </button>
    </form>
  );
}