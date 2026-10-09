"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  Check,
  ChevronDown,
  Eye,
  FileText,
  Globe,
  ImagePlus,
  Loader2,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { supabase } from "@/lib/supabase";

type BlogStatus = "draft" | "published";

type BlogRecord = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string | null;
  cover_image: string | null;
  status: BlogStatus;
};

type BlogEditorProps = {
  blogId?: string;
};

type NoticeType = "success" | "error" | "info";

type NoticeState = {
  type: NoticeType;
  message: string;
} | null;

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const inputClass = `
  h-11 w-full
  rounded-xl
  border border-[var(--admin-border)]
  bg-[var(--admin-surface)]
  px-3.5
  font-[Lexend]
  text-[13px]
  text-[var(--admin-text)]
  outline-none
  transition-all duration-200
  placeholder:text-[var(--admin-text-muted)]
  hover:border-[var(--admin-border-strong)]
  focus:border-[var(--admin-purple)]
  focus:ring-2
  focus:ring-[var(--admin-purple)]/10
`;

const textareaClass = `
  w-full
  rounded-xl
  border border-[var(--admin-border)]
  bg-[var(--admin-surface)]
  px-3.5 py-3
  font-[Lexend]
  text-[13px]
  leading-6
  text-[var(--admin-text)]
  outline-none
  transition-all duration-200
  placeholder:text-[var(--admin-text-muted)]
  hover:border-[var(--admin-border-strong)]
  focus:border-[var(--admin-purple)]
  focus:ring-2
  focus:ring-[var(--admin-purple)]/10
`;

export default function BlogEditor({ blogId }: BlogEditorProps) {
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const isEditing = Boolean(blogId);

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [coverImage, setCoverImage] = useState("");

  const [status, setStatus] = useState<BlogStatus>("draft");

  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [slugChecking, setSlugChecking] = useState(false);
  const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);

  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadedImagePath, setUploadedImagePath] = useState<string | null>(
    null,
  );

  const [notice, setNotice] = useState<NoticeState>(null);

  const [loaded, setLoaded] = useState(false);
  const [initialSnapshot, setInitialSnapshot] = useState("");

  const currentSnapshot = useMemo(
    () =>
      JSON.stringify({
        title,
        slug,
        excerpt,
        content,
        category,
        coverImage,
        status,
      }),
    [title, slug, excerpt, content, category, coverImage, status],
  );

  const hasUnsavedChanges =
    loaded && currentSnapshot !== initialSnapshot && !saving;

  useEffect(() => {
    let cancelled = false;

    async function loadBlog() {
      if (!blogId) {
        setLoading(false);
        setLoaded(true);

        setInitialSnapshot(
          JSON.stringify({
            title: "",
            slug: "",
            excerpt: "",
            content: "",
            category: "",
            coverImage: "",
            status: "draft",
          }),
        );

        return;
      }

      setLoading(true);
      setNotice(null);

      const { data, error } = await supabase
        .from("blogs")
        .select("id,title,slug,excerpt,content,category,cover_image,status")
        .eq("id", blogId)
        .maybeSingle();

      if (cancelled) return;

      if (error) {
        setNotice({
          type: "error",
          message: error.message,
        });

        setLoading(false);
        return;
      }

      if (!data) {
        setNotice({
          type: "error",
          message: "The requested blog could not be found.",
        });

        setLoading(false);
        return;
      }

      const blog = data as BlogRecord;

      const nextTitle = blog.title ?? "";
      const nextSlug = blog.slug ?? "";
      const nextExcerpt = blog.excerpt ?? "";
      const nextContent = blog.content ?? "";
      const nextCategory = blog.category ?? "";
      const nextCoverImage = blog.cover_image ?? "";
      const nextStatus =
        blog.status === "published" ? "published" : "draft";

      setTitle(nextTitle);
      setSlug(nextSlug);
      setExcerpt(nextExcerpt);
      setContent(nextContent);
      setCategory(nextCategory);
      setCoverImage(nextCoverImage);
      setStatus(nextStatus);

      setSlugManuallyEdited(true);
      setSlugAvailable(true);

      setInitialSnapshot(
        JSON.stringify({
          title: nextTitle,
          slug: nextSlug,
          excerpt: nextExcerpt,
          content: nextContent,
          category: nextCategory,
          coverImage: nextCoverImage,
          status: nextStatus,
        }),
      );

      setLoaded(true);
      setLoading(false);
    }

    loadBlog();

    return () => {
      cancelled = true;
    };
  }, [blogId]);

  useEffect(() => {
    function handleBeforeUnload(event: BeforeUnloadEvent) {
      if (!hasUnsavedChanges) return;

      event.preventDefault();
      event.returnValue = "";
    }

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  function showNotice(type: NoticeType, message: string) {
    setNotice({
      type,
      message,
    });
  }

  function slugify(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/['"]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function handleTitleChange(value: string) {
    setTitle(value);

    if (!slugManuallyEdited) {
      setSlug(slugify(value));
      setSlugAvailable(null);
    }
  }

  function handleSlugChange(value: string) {
    const normalized = slugify(value);

    setSlug(normalized);
    setSlugManuallyEdited(true);
    setSlugAvailable(null);
  }

  async function checkSlugAvailability(value: string) {
    const normalized = slugify(value);

    if (!normalized) {
      setSlugAvailable(null);
      return false;
    }

    setSlugChecking(true);

    try {
      let query = supabase
        .from("blogs")
        .select("id")
        .eq("slug", normalized);

      if (blogId) {
        query = query.neq("id", blogId);
      }

      const { data, error } = await query.maybeSingle();

      if (error) {
        console.error("Slug check error:", error);

        setSlugAvailable(null);
        return false;
      }

      const available = !data;

      setSlugAvailable(available);

      return available;
    } finally {
      setSlugChecking(false);
    }
  }

  async function handleSlugBlur() {
    if (!slug.trim()) {
      setSlugAvailable(null);
      return;
    }

    await checkSlugAvailability(slug);
  }

  function validateForm() {
    const cleanTitle = title.trim();
    const cleanSlug = slugify(slug);
    const cleanContent = content.trim();

    if (!cleanTitle) {
      showNotice("error", "Please enter a blog title.");
      return false;
    }

    if (!cleanSlug) {
      showNotice("error", "Please enter a valid blog URL slug.");
      return false;
    }

    if (!cleanContent) {
      showNotice("error", "Please add some article content.");
      return false;
    }

    if (slugAvailable === false) {
      showNotice(
        "error",
        "This blog URL is already being used. Please choose another slug.",
      );

      return false;
    }

    return true;
  }

  async function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    setNotice(null);

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      showNotice(
        "error",
        "Please upload a JPG, PNG, or WebP image.",
      );

      event.target.value = "";

      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      showNotice(
        "error",
        "The cover image must be smaller than 5 MB.",
      );

      event.target.value = "";

      return;
    }

    setUploadingImage(true);

    try {
      const extension =
        file.type === "image/jpeg"
          ? "jpg"
          : file.type === "image/png"
            ? "png"
            : "webp";

      const fileName = `${crypto.randomUUID()}.${extension}`;

      const filePath = `blog-covers/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: publicUrlData } = supabase.storage
        .from("blog-images")
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;

      setCoverImage(publicUrl);
      setUploadedImagePath(filePath);

      showNotice(
        "success",
        "Cover image uploaded. Save the blog to keep it.",
      );
    } catch (error) {
      console.error("Image upload error:", error);

      showNotice(
        "error",
        error instanceof Error
          ? error.message
          : "Unable to upload the cover image.",
      );
    } finally {
      setUploadingImage(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  async function removeCoverImage() {
    if (uploadedImagePath) {
      const { error } = await supabase.storage
        .from("blog-images")
        .remove([uploadedImagePath]);

      if (error) {
        console.warn(
          "Unable to remove newly uploaded image:",
          error,
        );
      }

      setUploadedImagePath(null);
    }

    setCoverImage("");

    showNotice(
      "info",
      "Cover image removed. Save to apply the change.",
    );
  }

  async function getAuthenticatedUser() {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      throw new Error(
        `Unable to read the Supabase session: ${error.message}`,
      );
    }

    if (!session?.user) {
      throw new Error(
        "Your admin session is missing or expired. Please sign in again at /admin/login.",
      );
    }

    const { data: isAdmin, error: adminError } =
      await supabase.rpc("is_admin");

    if (adminError) {
      throw new Error(
        `Unable to verify admin access: ${adminError.message}`,
      );
    }

    if (!isAdmin) {
      throw new Error(
        "This account is not authorized to manage blogs.",
      );
    }

    return session.user;
  }

  async function saveBlog(
    event?: FormEvent,
    forcedStatus?: BlogStatus,
  ) {
    event?.preventDefault();

    if (saving) return;

    setNotice(null);

    if (!validateForm()) return;

    const normalizedSlug = slugify(slug);

    setSaving(true);

    try {
      const user = await getAuthenticatedUser();

      const available =
        await checkSlugAvailability(normalizedSlug);

      if (!available) {
        showNotice(
          "error",
          "This blog URL is already in use. Please choose another slug.",
        );

        return;
      }

      /*
       * If forcedStatus is supplied, it takes priority.
       *
       * Save changes:
       *   keeps the current status.
       *
       * Save as draft:
       *   always changes the blog to draft.
       */
      const nextStatus = forcedStatus ?? status;

      const payload = {
        title: title.trim(),
        slug: normalizedSlug,
        excerpt: excerpt.trim() || null,
        content: content.trim(),
        category: category.trim() || null,
        cover_image: coverImage.trim() || null,
        status: nextStatus,
      };

      if (blogId) {
        const { data: updatedBlog, error: updateError } =
          await supabase
            .from("blogs")
            .update(payload)
            .eq("id", blogId)
            .select(
              "id,title,slug,excerpt,content,category,cover_image,status,updated_at",
            )
            .single();

        if (updateError) {
          console.error(
            "Blog update error message:",
            updateError.message,
          );

          console.error(
            "Blog update error code:",
            updateError.code,
          );

          console.error(
            "Blog update error details:",
            updateError.details,
          );

          console.error(
            "Blog update error hint:",
            updateError.hint,
          );

          throw new Error(
            updateError.message ||
              "The blog could not be updated.",
          );
        }

        if (!updatedBlog) {
          throw new Error(
            "The blog update returned no row. Please verify that this account has admin access.",
          );
        }

        console.log(
          "BLOG UPDATED SUCCESSFULLY:",
          updatedBlog,
        );

        const savedStatus =
          updatedBlog.status === "published"
            ? "published"
            : "draft";

        const savedTitle = updatedBlog.title ?? "";
        const savedSlug =
          updatedBlog.slug ?? normalizedSlug;
        const savedExcerpt =
          updatedBlog.excerpt ?? "";
        const savedContent =
          updatedBlog.content ?? "";
        const savedCategory =
          updatedBlog.category ?? "";
        const savedCoverImage =
          updatedBlog.cover_image ?? "";

        setTitle(savedTitle);
        setSlug(savedSlug);
        setExcerpt(savedExcerpt);
        setContent(savedContent);
        setCategory(savedCategory);
        setCoverImage(savedCoverImage);
        setStatus(savedStatus);
        setSlugAvailable(true);

        setInitialSnapshot(
          JSON.stringify({
            title: savedTitle,
            slug: savedSlug,
            excerpt: savedExcerpt,
            content: savedContent,
            category: savedCategory,
            coverImage: savedCoverImage,
            status: savedStatus,
          }),
        );

        showNotice(
          "success",
          savedStatus === "draft"
            ? "Blog saved as draft. It will not be published until you publish it."
            : "Blog updated successfully. Your changes are now saved.",
        );

        router.refresh();

        return;
      }

      const { data, error: insertError } =
        await supabase
          .from("blogs")
          .insert({
            ...payload,
            author_id: user.id,
          })
          .select("id")
          .single();

      if (insertError) {
        console.error(
          "Blog create error message:",
          insertError.message,
        );

        console.error(
          "Blog create error code:",
          insertError.code,
        );

        console.error(
          "Blog create error details:",
          insertError.details,
        );

        console.error(
          "Blog create error hint:",
          insertError.hint,
        );

        throw new Error(
          insertError.message ||
            "The blog could not be created.",
        );
      }

      if (!data?.id) {
        throw new Error(
          "The blog was created but no ID was returned.",
        );
      }

      setUploadedImagePath(null);

      showNotice(
        "success",
        nextStatus === "draft"
          ? "Blog saved as draft successfully."
          : "Blog created and published successfully.",
      );

      router.push("/admin/blogs");
      router.refresh();
    } catch (error) {
      console.error("Blog save error:", error);

      showNotice(
        "error",
        error instanceof Error
          ? error.message
          : "Unable to save the blog.",
      );
    } finally {
      setSaving(false);
    }
  }

  function handleBack() {
    if (hasUnsavedChanges) {
      const confirmed = window.confirm(
        "You have unsaved changes. Are you sure you want to leave?",
      );

      if (!confirmed) return;
    }

    router.push("/admin/blogs");
  }

  function handlePreview() {
    if (!slug.trim()) {
      showNotice(
        "error",
        "Add a blog slug before previewing.",
      );

      return;
    }

    if (status !== "published") {
      showNotice(
        "info",
        "Save and publish the blog before opening the public preview.",
      );

      return;
    }

    window.open(
      `/blogs/${slugify(slug)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  const wordCount = useMemo(() => {
    const value = content.trim();

    if (!value) return 0;

    return value
      .split(/\s+/)
      .filter(Boolean)
      .length;
  }, [content]);

  const characterCount = content.length;

  if (loading) {
    return (
      <main
        className="
          min-h-[calc(100vh-78px)]
          bg-[var(--admin-bg)]
          px-5 py-6
          text-[var(--admin-text)]
          lg:px-7
        "
      >
        <div
          className="
            flex min-h-[420px]
            items-center justify-center
            rounded-2xl
            border border-[var(--admin-border)]
            bg-[var(--admin-surface)]
          "
        >
          <div className="flex flex-col items-center">
            <Loader2
              size={22}
              className="animate-spin text-[var(--admin-purple)]"
            />

            <p className="mt-3 font-[Lexend] text-xs text-[var(--admin-text-muted)]">
              Loading blog...
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      className="
        min-h-[calc(100vh-78px)]
        bg-[var(--admin-bg)]
        px-5 py-6
        text-[var(--admin-text)]
        transition-colors duration-300
        lg:px-7 lg:py-7
      "
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Header */}

        <div className="mb-6">
          <button
            type="button"
            onClick={handleBack}
            className="
              mb-4
              inline-flex items-center gap-2
              rounded-lg
              px-1.5 py-1
              font-[Lexend]
              text-[11px]
              text-[var(--admin-text-muted)]
              transition-colors
              hover:text-[var(--admin-text)]
            "
          >
            <ArrowLeft size={14} strokeWidth={1.8} />
            Back to blogs
          </button>

          <div
            className="
              flex flex-col gap-4
              lg:flex-row lg:items-end lg:justify-between
            "
          >
            <div>
              <div className="flex items-center gap-2">
                <p
                  className="
                    font-[Lexend]
                    text-[9px]
                    font-medium
                    uppercase
                    tracking-[0.18em]
                    text-[var(--admin-purple)]
                  "
                >
                  VAI SPACE CMS
                </p>

                <StatusBadge status={status} />
              </div>

              <h1
                className="
                  mt-2
                  font-[Space_Grotesk]
                  text-[25px]
                  font-semibold
                  tracking-tight
                  text-[var(--admin-text)]
                "
              >
                {isEditing ? "Edit blog" : "Create blog"}
              </h1>

              <p
                className="
                  mt-1
                  max-w-xl
                  font-[Lexend]
                  text-[11px]
                  leading-5
                  text-[var(--admin-text-muted)]
                "
              >
                {isEditing
                  ? "Update your article content, presentation and publishing settings."
                  : "Create and publish a new article directly from the VAI SPACE CMS."}
              </p>
            </div>

            {/* Desktop actions */}

            <div className="hidden items-center gap-2 sm:flex">
              {isEditing &&
                status === "published" &&
                slug && (
                  <button
                    type="button"
                    onClick={handlePreview}
                    className="
                      inline-flex h-10
                      items-center gap-2
                      rounded-xl
                      border border-[var(--admin-border)]
                      bg-[var(--admin-surface)]
                      px-4
                      font-[Lexend]
                      text-[11px]
                      font-medium
                      text-[var(--admin-text)]
                      shadow-sm
                      transition-all duration-200
                      hover:border-[var(--admin-border-strong)]
                      hover:bg-[var(--admin-surface-3)]
                    "
                  >
                    <Eye size={15} strokeWidth={1.8} />
                    Preview
                  </button>
                )}

              {/* Save as draft */}

              <button
                type="button"
                onClick={() =>
                  saveBlog(undefined, "draft")
                }
                disabled={saving}
                className="
                  inline-flex h-10
                  items-center gap-2
                  rounded-xl
                  border border-[var(--admin-border)]
                  bg-[var(--admin-surface)]
                  px-4
                  font-[Lexend]
                  text-[11px]
                  font-medium
                  text-[var(--admin-text)]
                  shadow-sm
                  transition-all duration-200
                  hover:border-[var(--admin-border-strong)]
                  hover:bg-[var(--admin-surface-2)]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {saving ? (
                  <Loader2
                    size={15}
                    className="animate-spin"
                  />
                ) : (
                  <FileText
                    size={15}
                    strokeWidth={1.8}
                  />
                )}

                Save as draft
              </button>

              {/* Normal save */}

              <button
                type="button"
                onClick={() => saveBlog()}
                disabled={saving}
                className="
                  inline-flex h-10
                  items-center gap-2
                  rounded-xl
                  bg-[var(--admin-purple)]
                  px-4
                  font-[Lexend]
                  text-[11px]
                  font-medium
                  text-white
                  shadow-sm
                  transition-all duration-200
                  hover:-translate-y-px
                  hover:opacity-95
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {saving ? (
                  <Loader2
                    size={15}
                    className="animate-spin"
                  />
                ) : (
                  <Save
                    size={15}
                    strokeWidth={1.8}
                  />
                )}

                {saving
                  ? "Saving..."
                  : isEditing
                    ? "Save changes"
                    : "Create blog"}
              </button>
            </div>
          </div>
        </div>

        {notice && (
          <Notice
            type={notice.type}
            message={notice.message}
            onClose={() => setNotice(null)}
          />
        )}

        <form onSubmit={saveBlog}>
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_310px]">
            {/* Main editor */}

            <div className="min-w-0 space-y-5">
              {/* Article details */}

              <section
                className="
                  rounded-2xl
                  border border-[var(--admin-border)]
                  bg-[var(--admin-surface)]
                  p-5
                  shadow-sm
                  sm:p-6
                "
              >
                <SectionHeader
                  icon={
                    <FileText
                      size={16}
                      strokeWidth={1.8}
                    />
                  }
                  title="Article details"
                  description="The basic information visitors will see."
                />

                <div className="mt-5 space-y-5">
                  {/* Title */}

                  <div>
                    <FieldLabel
                      htmlFor="blog-title"
                      label="Title"
                      required
                    />

                    <input
                      id="blog-title"
                      type="text"
                      value={title}
                      onChange={(event) =>
                        handleTitleChange(
                          event.target.value,
                        )
                      }
                      placeholder="Enter your blog title..."
                      maxLength={80}
                      className="
                        h-14 w-full
                        rounded-xl
                        border border-[var(--admin-border)]
                        bg-[var(--admin-surface)]
                        px-4
                        font-[Space_Grotesk]
                        text-lg
                        font-medium
                        text-[var(--admin-text)]
                        outline-none
                        transition-all duration-200
                        placeholder:text-[var(--admin-text-muted)]
                        hover:border-[var(--admin-border-strong)]
                        focus:border-[var(--admin-purple)]
                        focus:ring-2
                        focus:ring-[var(--admin-purple)]/10
                      "
                    />

                    <div className="mt-1.5 flex justify-end">
                      <span className="font-[Lexend] text-[9px] text-[var(--admin-text-muted)]">
                        {title.length}/80
                      </span>
                    </div>
                  </div>

                  {/* Slug + Category */}

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <FieldLabel
                        htmlFor="blog-slug"
                        label="Public URL"
                        required
                      />

                      <div className="relative">
                        <span
                          className="
                            pointer-events-none
                            absolute left-3.5 top-1/2
                            -translate-y-1/2
                            font-[Lexend]
                            text-[11px]
                            text-[var(--admin-text-muted)]
                          "
                        >
                          /blogs/
                        </span>

                        <input
                          id="blog-slug"
                          type="text"
                          value={slug}
                          onChange={(event) =>
                            handleSlugChange(
                              event.target.value,
                            )
                          }
                          onBlur={handleSlugBlur}
                          placeholder="your-blog-url"
                          className={`${inputClass} pl-[62px] pr-10`}
                        />

                        <div
                          className="
                            pointer-events-none
                            absolute right-3.5 top-1/2
                            -translate-y-1/2
                          "
                        >
                          {slugChecking ? (
                            <Loader2
                              size={14}
                              className="
                                animate-spin
                                text-[var(--admin-text-muted)]
                              "
                            />
                          ) : slugAvailable === true ? (
                            <Check
                              size={15}
                              className="text-emerald-500"
                            />
                          ) : slugAvailable === false ? (
                            <X
                              size={15}
                              className="text-red-500"
                            />
                          ) : null}
                        </div>
                      </div>

                      <p className="mt-1.5 font-[Lexend] text-[9px] text-[var(--admin-text-muted)]">
                        Lowercase letters, numbers and hyphens only.
                      </p>
                    </div>

                    <div>
                      <FieldLabel
                        htmlFor="blog-category"
                        label="Category"
                      />

                      <input
                        id="blog-category"
                        type="text"
                        value={category}
                        onChange={(event) =>
                          setCategory(event.target.value)
                        }
                        placeholder="Digital Marketing"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Excerpt */}

                  <div>
                    <FieldLabel
                      htmlFor="blog-excerpt"
                      label="Excerpt"
                    />

                    <textarea
                      id="blog-excerpt"
                      value={excerpt}
                      onChange={(event) =>
                        setExcerpt(event.target.value)
                      }
                      placeholder="Write a short description that explains what this article is about..."
                      maxLength={65}
                      rows={3}
                      className={`${textareaClass} min-h-[100px] resize-y`}
                    />

                    <div className="mt-1.5 flex justify-end">
                      <span className="font-[Lexend] text-[9px] text-[var(--admin-text-muted)]">
                        {excerpt.length}/65
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Content */}

              <section
                className="
                  rounded-2xl
                  border border-[var(--admin-border)]
                  bg-[var(--admin-surface)]
                  p-5
                  shadow-sm
                  sm:p-6
                "
              >
                <SectionHeader
                  icon={
                    <FileText
                      size={16}
                      strokeWidth={1.8}
                    />
                  }
                  title="Article content"
                  description="Write the main content of your article."
                />

                <div className="mt-5">
                  <textarea
                    id="blog-content"
                    value={content}
                    onChange={(event) =>
                      setContent(event.target.value)
                    }
                    placeholder={
                      "Start writing your article...\n\nYou can use line breaks to structure your content. The public blog currently displays this content as plain text."
                    }
                    className={`${textareaClass} min-h-[460px] resize-y rounded-2xl leading-7`}
                  />

                  <div
                    className="
                      mt-2
                      flex flex-wrap
                      items-center justify-between
                      gap-2
                    "
                  >
                    <p className="font-[Lexend] text-[9px] text-[var(--admin-text-muted)]">
                      Plain text editor · Line breaks are preserved
                    </p>

                    <div className="flex items-center gap-3">
                      <span className="font-[Lexend] text-[9px] text-[var(--admin-text-muted)]">
                        {wordCount} words
                      </span>

                      <span className="h-3 w-px bg-[var(--admin-border)]" />

                      <span className="font-[Lexend] text-[9px] text-[var(--admin-text-muted)]">
                        {characterCount} characters
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}

            <aside className="space-y-5">
              {/* Publishing */}

              <SidebarCard
                title="Publishing"
                description="Control how the article appears publicly."
              >
                <div>
                  <FieldLabel label="Status" />

                  <div className="relative">
                    <select
                      value={status}
                      onChange={(event) =>
                        setStatus(
                          event.target
                            .value as BlogStatus,
                        )
                      }
                      className={`${inputClass} appearance-none pr-10`}
                    >
                      <option value="draft">
                        Draft
                      </option>

                      <option value="published">
                        Published
                      </option>
                    </select>

                    <ChevronDown
                      size={15}
                      className="
                        pointer-events-none
                        absolute right-3.5 top-1/2
                        -translate-y-1/2
                        text-[var(--admin-icon)]
                      "
                    />
                  </div>
                </div>

                <div
                  className="
                    mt-4
                    rounded-xl
                    border border-[var(--admin-border)]
                    bg-[var(--admin-surface-2)]
                    p-3.5
                  "
                >
                  <div className="flex items-start gap-3">
                    <StatusDot status={status} />

                    <div>
                      <p className="font-[Lexend] text-[11px] font-medium text-[var(--admin-text)]">
                        {status === "published"
                          ? "Visible publicly"
                          : "Saved as draft"}
                      </p>

                      <p className="mt-1 font-[Lexend] text-[9px] leading-4 text-[var(--admin-text-muted)]">
                        {status === "published"
                          ? "Visitors can access this article from the public blog."
                          : "This article will not appear on the public blog."}
                      </p>
                    </div>
                  </div>
                </div>
              </SidebarCard>

              {/* Cover image */}

              <SidebarCard
                title="Cover image"
                description="Recommended for the blog card and article header."
              >
                {coverImage ? (
                  <div className="overflow-hidden rounded-xl border border-[var(--admin-border)]">
                    <div className="relative aspect-[16/9] w-full bg-[var(--admin-surface-2)]">
                      <Image
                        src={coverImage}
                        alt={
                          title ||
                          "Blog cover image"
                        }
                        fill
                        sizes="310px"
                        className="object-cover"
                      />
                    </div>

                    <div
                      className="
                        flex items-center justify-between
                        gap-2
                        border-t border-[var(--admin-border)]
                        bg-[var(--admin-surface-2)]
                        p-2.5
                      "
                    >
                      <span className="min-w-0 truncate font-[Lexend] text-[9px] text-[var(--admin-text-muted)]">
                        {getImageName(coverImage)}
                      </span>

                      <button
                        type="button"
                        onClick={removeCoverImage}
                        className="
                          inline-flex h-8 w-8
                          shrink-0
                          items-center justify-center
                          rounded-lg
                          border border-[var(--admin-border)]
                          bg-[var(--admin-surface)]
                          text-[var(--admin-icon)]
                          transition-colors
                          hover:border-red-400/30
                          hover:bg-red-400/[0.06]
                          hover:text-red-500
                        "
                        title="Remove image"
                        aria-label="Remove image"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                    disabled={uploadingImage}
                    className="
                      flex min-h-[170px]
                      w-full
                      flex-col
                      items-center justify-center
                      rounded-xl
                      border
                      border-dashed
                      border-[var(--admin-border-strong)]
                      bg-[var(--admin-surface-2)]
                      px-5 py-6
                      text-center
                      transition-all duration-200
                      hover:border-[var(--admin-purple)]/50
                      hover:bg-[var(--admin-surface-3)]
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  >
                    <div
                      className="
                        flex h-10 w-10
                        items-center justify-center
                        rounded-xl
                        border border-[var(--admin-border)]
                        bg-[var(--admin-surface)]
                        text-[var(--admin-icon)]
                      "
                    >
                      {uploadingImage ? (
                        <Loader2
                          size={17}
                          className="animate-spin"
                        />
                      ) : (
                        <ImagePlus
                          size={17}
                          strokeWidth={1.7}
                        />
                      )}
                    </div>

                    <p className="mt-3 font-[Lexend] text-[11px] font-medium text-[var(--admin-text)]">
                      {uploadingImage
                        ? "Uploading..."
                        : "Upload cover image"}
                    </p>

                    <p className="mt-1 font-[Lexend] text-[9px] leading-4 text-[var(--admin-text-muted)]">
                      JPG, PNG or WebP
                      <br />
                      Maximum 5 MB
                      <br />
                      Recommended 1672x941 px
                    </p>
                  </button>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                />

                {coverImage && (
                  <button
                    type="button"
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                    disabled={uploadingImage}
                    className="
                      mt-2.5
                      flex h-9 w-full
                      items-center justify-center
                      gap-2
                      rounded-lg
                      border border-[var(--admin-border)]
                      bg-[var(--admin-surface)]
                      font-[Lexend]
                      text-[10px]
                      font-medium
                      text-[var(--admin-text)]
                      transition-colors
                      hover:border-[var(--admin-border-strong)]
                      hover:bg-[var(--admin-hover)]
                    "
                  >
                    <Upload size={13} />
                    Replace image
                  </button>
                )}
              </SidebarCard>

              {/* Summary */}

              <SidebarCard
                title="Article summary"
                description="Quick information about this article."
              >
                <div className="space-y-3">
                  <SummaryRow
                    label="Words"
                    value={String(wordCount)}
                  />

                  <SummaryRow
                    label="Characters"
                    value={String(characterCount)}
                  />

                  <SummaryRow
                    label="Category"
                    value={
                      category.trim() ||
                      "Uncategorized"
                    }
                  />

                  <SummaryRow
                    label="Status"
                    value={
                      status === "published"
                        ? "Published"
                        : "Draft"
                    }
                  />
                </div>
              </SidebarCard>

              {/* Public link */}

              {slug && (
                <SidebarCard
                  title="Public address"
                  description="The URL visitors will use."
                >
                  <div
                    className="
                      flex items-start gap-2
                      rounded-xl
                      border border-[var(--admin-border)]
                      bg-[var(--admin-surface-2)]
                      p-3
                    "
                  >
                    <Globe
                      size={14}
                      className="
                        mt-0.5
                        shrink-0
                        text-[var(--admin-icon)]
                      "
                    />

                    <p
                      className="
                        break-all
                        font-[Lexend]
                        text-[10px]
                        leading-5
                        text-[var(--admin-text-muted)]
                      "
                    >
                      /blogs/{slugify(slug)}
                    </p>
                  </div>

                  {status === "published" && (
                    <button
                      type="button"
                      onClick={handlePreview}
                      className="
                        mt-2.5
                        flex h-9 w-full
                        items-center justify-center
                        gap-2
                        rounded-lg
                        border border-[var(--admin-border)]
                        bg-[var(--admin-surface)]
                        font-[Lexend]
                        text-[10px]
                        font-medium
                        text-[var(--admin-text)]
                        transition-colors
                        hover:border-[var(--admin-border-strong)]
                        hover:bg-[var(--admin-hover)]
                      "
                    >
                      <Eye size={13} />
                      Open public page
                    </button>
                  )}
                </SidebarCard>
              )}
            </aside>
          </div>

          {/* Mobile actions */}

          <div
            className="
              mt-5
              flex
              flex-col gap-2
              sm:hidden
            "
          >
            {isEditing &&
              status === "published" &&
              slug && (
                <button
                  type="button"
                  onClick={handlePreview}
                  className="
                    flex h-11
                    items-center justify-center
                    gap-2
                    rounded-xl
                    border border-[var(--admin-border)]
                    bg-[var(--admin-surface)]
                    font-[Lexend]
                    text-[11px]
                    font-medium
                    text-[var(--admin-text)]
                  "
                >
                  <Eye size={15} />
                  Preview
                </button>
              )}

            {/* Mobile Save as draft */}

            <button
              type="button"
              onClick={() =>
                saveBlog(undefined, "draft")
              }
              disabled={saving}
              className="
                flex h-11
                items-center justify-center
                gap-2
                rounded-xl
                border border-[var(--admin-border)]
                bg-[var(--admin-surface)]
                font-[Lexend]
                text-[11px]
                font-medium
                text-[var(--admin-text)]
                transition-all duration-200
                hover:border-[var(--admin-border-strong)]
                hover:bg-[var(--admin-surface-2)]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {saving ? (
                <Loader2
                  size={15}
                  className="animate-spin"
                />
              ) : (
                <FileText size={15} />
              )}

              Save as draft
            </button>

            {/* Mobile normal save */}

            <button
              type="submit"
              disabled={saving}
              className="
                flex h-11
                items-center justify-center
                gap-2
                rounded-xl
                bg-[var(--admin-purple)]
                font-[Lexend]
                text-[11px]
                font-medium
                text-white
                transition-opacity
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {saving ? (
                <Loader2
                  size={15}
                  className="animate-spin"
                />
              ) : (
                <Save size={15} />
              )}

              {saving
                ? "Saving..."
                : isEditing
                  ? "Save changes"
                  : "Create blog"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* UI helpers                                                                 */
/* -------------------------------------------------------------------------- */

function SectionHeader({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className="
          flex h-9 w-9
          shrink-0
          items-center justify-center
          rounded-xl
          border border-[var(--admin-border)]
          bg-[var(--admin-surface-2)]
          text-[var(--admin-icon)]
        "
      >
        {icon}
      </div>

      <div>
        <h2
          className="
            font-[Space_Grotesk]
            text-[15px]
            font-semibold
            text-[var(--admin-text)]
          "
        >
          {title}
        </h2>

        <p
          className="
            mt-0.5
            font-[Lexend]
            text-[9px]
            leading-4
            text-[var(--admin-text-muted)]
          "
        >
          {description}
        </p>
      </div>
    </div>
  );
}

function FieldLabel({
  htmlFor,
  label,
  required = false,
}: {
  htmlFor?: string;
  label: string;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="
        mb-1.5 block
        font-[Lexend]
        text-[10px]
        font-medium
        text-[var(--admin-text-muted)]
      "
    >
      {label}

      {required && (
        <span className="ml-1 text-[var(--admin-purple)]">
          *
        </span>
      )}
    </label>
  );
}

function SidebarCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="
        rounded-2xl
        border border-[var(--admin-border)]
        bg-[var(--admin-surface)]
        p-4
        shadow-sm
      "
    >
      <div>
        <h2
          className="
            font-[Space_Grotesk]
            text-[13px]
            font-semibold
            text-[var(--admin-text)]
          "
        >
          {title}
        </h2>

        <p
          className="
            mt-0.5
            font-[Lexend]
            text-[9px]
            leading-4
            text-[var(--admin-text-muted)]
          "
        >
          {description}
        </p>
      </div>

      <div className="mt-4">{children}</div>
    </section>
  );
}

function StatusBadge({
  status,
}: {
  status: BlogStatus;
}) {
  const published = status === "published";

  return (
    <span
      className={`
        inline-flex
        items-center gap-1.5
        rounded-full
        border
        px-2 py-1
        font-[Lexend]
        text-[8px]
        font-medium
        uppercase
        tracking-[0.1em]
        ${
          published
            ? "border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-600 dark:text-emerald-400"
            : "border-[var(--admin-border)] bg-[var(--admin-surface-2)] text-[var(--admin-text-muted)]"
        }
      `}
    >
      <StatusDot status={status} />

      {published ? "Published" : "Draft"}
    </span>
  );
}

function StatusDot({
  status,
}: {
  status: BlogStatus;
}) {
  return (
    <span
      className={`
        h-1.5 w-1.5 rounded-full
        ${
          status === "published"
            ? "bg-emerald-500"
            : "bg-[var(--admin-text-muted)]"
        }
      `}
    />
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="font-[Lexend] text-[9px] text-[var(--admin-text-muted)]">
        {label}
      </span>

      <span
        className="
          max-w-[170px]
          truncate
          text-right
          font-[Lexend]
          text-[10px]
          font-medium
          text-[var(--admin-text)]
        "
      >
        {value}
      </span>
    </div>
  );
}

function Notice({
  type,
  message,
  onClose,
}: {
  type: NoticeType;
  message: string;
  onClose: () => void;
}) {
  const styles = {
    success: `
      border-emerald-500/20
      bg-emerald-500/[0.05]
      text-emerald-600
      dark:text-emerald-400
    `,

    error: `
      border-red-500/20
      bg-red-500/[0.05]
      text-red-600
      dark:text-red-400
    `,

    info: `
      border-[var(--admin-purple)]/20
      bg-[var(--admin-purple)]/[0.05]
      text-[var(--admin-purple)]
    `,
  };

  return (
    <div
      className={`
        mb-5
        flex items-start gap-3
        rounded-xl
        border
        px-4 py-3
        ${styles[type]}
      `}
    >
      <div className="min-w-0 flex-1">
        <p className="font-[Lexend] text-[11px] leading-5">
          {message}
        </p>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="
          flex h-6 w-6
          shrink-0
          items-center justify-center
          rounded-md
          opacity-60
          transition-opacity
          hover:opacity-100
        "
        aria-label="Close notification"
      >
        <X size={13} />
      </button>
    </div>
  );
}

function getImageName(url: string) {
  try {
    const pathname = new URL(url).pathname;
    const value = pathname.split("/").pop();

    return value
      ? decodeURIComponent(value)
      : "Cover image";
  } catch {
    return "Cover image";
  }
}