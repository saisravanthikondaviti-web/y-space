export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string | null;
  views: number;
  likes: number;
  content?: string | null;
  category?: string | null;
  created_at?: string;
}