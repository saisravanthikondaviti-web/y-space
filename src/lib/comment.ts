import { supabase } from "@/lib/supabase";
import { Comment } from "@/types/comment";

/**
 * Fetch all comments for a blog
 */
export async function getComments(blogId: string): Promise<Comment[]> {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("blog_id", blogId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching comments:", error);
    return [];
  }

  return data as Comment[];
}

/**
 * Add a new comment
 */
export async function addComment(
  blogId: string,
  name: string,
  comment: string
) {
  const { error } = await supabase.from("comments").insert([
    {
      blog_id: blogId,
      name,
      comment,
    },
  ]);

  if (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
}