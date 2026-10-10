import BlogEditor from "../../BlogEditor";

type EditBlogPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditBlogPage({
  params,
}: EditBlogPageProps) {
  const { id } = await params;

  return <BlogEditor blogId={id} />;
}