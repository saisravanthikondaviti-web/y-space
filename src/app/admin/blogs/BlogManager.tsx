"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Check,
  ChevronDown,
  Clock3,
  Edit3,
  Eye,
  FileText,
  Loader2,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  X,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";

import { supabase } from "@/lib/supabase";

type BlogStatus = "draft" | "published";

type StatusFilter = "all" | BlogStatus;

type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  category: string | null;
  status: BlogStatus;
  created_at: string | null;
  updated_at: string | null;
};

type FilterOption = readonly [string, string];

function formatDate(date: string | null) {
  if (!date) return "—";

  const value = new Date(date);

  if (Number.isNaN(value.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(value);
}

function relativeDate(date: string | null) {
  if (!date) return "—";

  const timestamp = new Date(date).getTime();

  if (Number.isNaN(timestamp)) {
    return "—";
  }

  const difference = Math.max(0, Date.now() - timestamp);

  const minutes = Math.floor(difference / 60000);

  const hours = Math.floor(difference / 3600000);

  const days = Math.floor(difference / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return formatDate(date);
}

export default function BlogManager() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [statusOpen, setStatusOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const statusRef = useRef<HTMLDivElement>(null);

  const categoryRef = useRef<HTMLDivElement>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  async function loadBlogs() {
    setLoading(true);
    setError("");

    try {
      const { data, error: fetchError } = await supabase
        .from("blogs")
        .select(
          "id,title,slug,excerpt,cover_image,category,status,created_at,updated_at",
        )
        .order("updated_at", {
          ascending: false,
        });

      if (fetchError) {
        throw fetchError;
      }

      setBlogs((data ?? []) as Blog[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load blogs.");
    } finally {
      setLoading(false);
    }
  }

useEffect(() => {
  const timer = window.setTimeout(() => {
    void loadBlogs();
  }, 0);

  return () => {
    window.clearTimeout(timer);
  };
}, []);

  /*
   * One global outside-click handler for:
   * - Status dropdown
   * - Category dropdown
   * - Article action menu
   */
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      const target = event.target as Node;

      if (statusRef.current && !statusRef.current.contains(target)) {
        setStatusOpen(false);
      }

      if (categoryRef.current && !categoryRef.current.contains(target)) {
        setCategoryOpen(false);
      }

      if (menuRef.current && !menuRef.current.contains(target)) {
        setActiveMenu(null);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const categories = useMemo(() => {
    const values = blogs
      .map((blog) => blog.category?.trim())
      .filter((category): category is string => Boolean(category));

    return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return blogs.filter((blog) => {
      const matchesSearch =
        !query ||
        blog.title.toLowerCase().includes(query) ||
        blog.slug.toLowerCase().includes(query) ||
        (blog.category ?? "").toLowerCase().includes(query) ||
        (blog.excerpt ?? "").toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "all" || blog.status === statusFilter;

      const matchesCategory =
        categoryFilter === "all" || blog.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [blogs, search, statusFilter, categoryFilter]);

  const stats = useMemo(() => {
    return {
      total: blogs.length,

      published: blogs.filter((blog) => blog.status === "published").length,

      drafts: blogs.filter((blog) => blog.status === "draft").length,

      categories: categories.length,
    };
  }, [blogs, categories.length]);

  const statusOptions: FilterOption[] = [
    ["all", "All status"],
    ["published", "Published"],
    ["draft", "Drafts"],
  ];

  const categoryOptions: FilterOption[] = [
    ["all", "All categories"],
    ...categories.map((category): FilterOption => [category, category]),
  ];

  const hasFilters =
    search.trim().length > 0 ||
    statusFilter !== "all" ||
    categoryFilter !== "all";

  async function toggleStatus(blog: Blog) {
    const nextStatus: BlogStatus =
      blog.status === "published" ? "draft" : "published";

    setActionLoading(blog.id);
    setActiveMenu(null);
    setError("");
    setSuccess("");

    try {
      const { error: updateError } = await supabase
        .from("blogs")
        .update({
          status: nextStatus,
        })
        .eq("id", blog.id);

      if (updateError) {
        throw updateError;
      }

      setBlogs((current) =>
        current.map((item) =>
          item.id === blog.id
            ? {
                ...item,
                status: nextStatus,
                updated_at: new Date().toISOString(),
              }
            : item,
        ),
      );

      setSuccess(
        nextStatus === "published"
          ? `"${blog.title}" is now published.`
          : `"${blog.title}" moved to drafts.`,
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to update article.",
      );
    } finally {
      setActionLoading(null);
    }
  }

  async function deleteBlog(blog: Blog) {
    const confirmed = window.confirm(
      `Delete "${blog.title}"?\n\nThis permanently removes the article and related data.`,
    );

    if (!confirmed) return;

    setActionLoading(blog.id);
    setActiveMenu(null);
    setError("");
    setSuccess("");

    try {
      const { error: deleteError } = await supabase
        .from("blogs")
        .delete()
        .eq("id", blog.id);

      if (deleteError) {
        throw deleteError;
      }

      setBlogs((current) => current.filter((item) => item.id !== blog.id));

      setSuccess(`"${blog.title}" was deleted.`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to delete article.",
      );
    } finally {
      setActionLoading(null);
    }
  }

  function clearFilters() {
    setSearch("");
    setStatusFilter("all");
    setCategoryFilter("all");

    setStatusOpen(false);
    setCategoryOpen(false);
  }

  return (
    <section className="relative min-h-[calc(100vh-78px)] overflow-hidden bg-[var(--admin-bg)] px-4 py-5 sm:px-6 lg:px-8">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-[var(--admin-primary)]/[0.035] blur-[120px]" />

        <div className="absolute -bottom-40 -left-40 h-[360px] w-[360px] rounded-full bg-[#e46ecc]/[0.025] blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-[1240px]">
        {/* Header */}
        <header className="mb-6 flex flex-col gap-4 border-b border-[var(--admin-border)] pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--admin-primary)]" />

              <span className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[var(--admin-muted)]">
                Content workspace
              </span>
            </div>

            <h1 className="font-[var(--font-space-grotesk)] text-[24px] font-semibold leading-none tracking-[-0.04em] text-[var(--admin-text)]">
              Blogs
            </h1>

            <p className="mt-2 max-w-md text-[10px] leading-5 text-[var(--admin-muted)]">
              Create, organize and publish the content behind your public blog.
            </p>
          </div>

          <Link
            href="/admin/blogs/new"
            className="
    inline-flex h-10
    items-center justify-center
    gap-2
    self-start
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
    sm:self-auto
  "
          >
            <Plus size={15} strokeWidth={1.8} />
            New article
          </Link>
        </header>

        {/* Notifications */}
        {error && (
          <Notice type="error" message={error} onClose={() => setError("")} />
        )}

        {success && (
          <Notice
            type="success"
            message={success}
            onClose={() => setSuccess("")}
          />
        )}

        {/* Statistics */}
        <div className="mb-5 grid grid-cols-2 border-y border-[var(--admin-border)] sm:grid-cols-4">
          <MiniStat label="Articles" value={stats.total} />

          <MiniStat label="Published" value={stats.published} border />

          <MiniStat label="Drafts" value={stats.drafts} border />

          <MiniStat label="Topics" value={stats.categories} border />
        </div>

        {/* Toolbar */}
        <div className="mb-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            {/* Search */}
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--admin-muted)]" />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search articles..."
                className="h-9 w-full rounded-md border border-[var(--admin-border)] bg-[var(--admin-card)] pl-9 pr-3 text-[10px] text-[var(--admin-text)] outline-none transition placeholder:text-[var(--admin-muted)] focus:border-[var(--admin-primary)]/30"
              />
            </div>

            <div className="flex gap-1.5">
              {/* Status dropdown */}
              <div ref={statusRef} className="relative">
                <FilterButton
                  label={
                    statusFilter === "all"
                      ? "Status"
                      : statusFilter === "published"
                        ? "Published"
                        : "Drafts"
                  }
                  active={statusFilter !== "all"}
                  open={statusOpen}
                  onClick={() => {
                    setStatusOpen((current) => !current);
                    setCategoryOpen(false);
                  }}
                />

                {statusOpen && (
                  <CompactDropdown
                    options={statusOptions}
                    value={statusFilter}
                    onSelect={(value) => {
                      setStatusFilter(value as StatusFilter);
                      setStatusOpen(false);
                    }}
                  />
                )}
              </div>

              {/* Category dropdown */}
              <div ref={categoryRef} className="relative">
                <FilterButton
                  label={categoryFilter === "all" ? "Category" : categoryFilter}
                  active={categoryFilter !== "all"}
                  open={categoryOpen}
                  onClick={() => {
                    setCategoryOpen((current) => !current);
                    setStatusOpen(false);
                  }}
                />

                {categoryOpen && (
                  <CompactDropdown
                    options={categoryOptions}
                    value={categoryFilter}
                    onSelect={(value) => {
                      setCategoryFilter(value);
                      setCategoryOpen(false);
                    }}
                  />
                )}
              </div>

              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex h-9 items-center gap-1 rounded-md px-2 text-[9px] font-medium text-[var(--admin-muted)] transition hover:bg-[var(--admin-card)] hover:text-[var(--admin-text)]"
                >
                  <X className="h-3 w-3" />
                  Clear
                </button>
              )}

              <button
                type="button"
                disabled={loading}
                onClick={() => void loadBlogs()}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--admin-border)] bg-[var(--admin-card)] text-[var(--admin-muted)] transition hover:text-[var(--admin-text)] disabled:opacity-50"
                aria-label="Refresh articles"
              >
                <RefreshCw
                  className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Section heading */}
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[var(--admin-muted)]">
              All articles
            </span>

            <span className="rounded-full bg-[var(--admin-card)] px-1.5 py-0.5 text-[8px] text-[var(--admin-muted)]">
              {filteredBlogs.length}
            </span>
          </div>

          {hasFilters && (
            <span className="text-[8px] text-[var(--admin-muted)]">
              Filtered results
            </span>
          )}
        </div>

        {/* Article list */}
        <div className="overflow-visible rounded-lg border border-[var(--admin-border)] bg-[var(--admin-card)]">
          {loading ? (
            <LoadingState />
          ) : filteredBlogs.length === 0 ? (
            <EmptyState filtered={hasFilters} onReset={clearFilters} />
          ) : (
            <div>
              {filteredBlogs.map((blog, index) => (
                <ArticleCard
                  key={blog.id}
                  blog={blog}
                  first={index === 0}
                  busy={actionLoading === blog.id}
                  menuOpen={activeMenu === blog.id}
                  menuRef={activeMenu === blog.id ? menuRef : undefined}
                  onMenu={() =>
                    setActiveMenu((current) =>
                      current === blog.id ? null : blog.id,
                    )
                  }
                  onClose={() => setActiveMenu(null)}
                  onToggle={() => void toggleStatus(blog)}
                  onDelete={() => void deleteBlog(blog)}
                />
              ))}
            </div>
          )}
        </div>

        {!loading && filteredBlogs.length > 0 && (
          <div className="mt-3 flex items-center justify-between px-1">
            <span className="text-[8px] text-[var(--admin-muted)]">
              Showing {filteredBlogs.length} of {blogs.length} articles
            </span>

            <span className="text-[8px] text-[var(--admin-muted)]">
              Updated content appears first
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Statistics                                                                 */
/* -------------------------------------------------------------------------- */

function MiniStat({
  label,
  value,
  border = false,
}: {
  label: string;
  value: number;
  border?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between px-3 py-3 ${
        border ? "border-l border-[var(--admin-border)]" : ""
      }`}
    >
      <span className="text-[8px] font-medium uppercase tracking-[0.14em] text-[var(--admin-muted)]">
        {label}
      </span>

      <span className="font-[var(--font-space-grotesk)] text-[16px] font-semibold tracking-[-0.03em] text-[var(--admin-text)]">
        {value}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Filter button                                                              */
/* -------------------------------------------------------------------------- */

function FilterButton({
  label,
  active,
  open,
  onClick,
}: {
  label: string;
  active: boolean;
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-9 max-w-[135px] items-center gap-1.5 rounded-md border px-2.5 !text-[10px] font-medium transition ${
        active
          ? "border-[var(--admin-primary)]/25 bg-[var(--admin-primary)]/[0.06] !text-[var(--admin-text)]"
          : "border-[var(--admin-border)] bg-[var(--admin-card)] !text-[var(--admin-muted)] hover:!text-[var(--admin-text)]"
      }`}
    >
      <span className="truncate">{label}</span>

      <ChevronDown
        className={`h-3 w-3 shrink-0 transition-transform ${
          open ? "rotate-180" : ""
        }`}
      />
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Universal compact dropdown                                                 */
/* -------------------------------------------------------------------------- */

function CompactDropdown({
  options,
  value,
  onSelect,
}: {
  options: readonly FilterOption[];
  value: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="absolute right-0 top-[42px] z-[100] w-[155px] overflow-hidden rounded-lg border border-[var(--admin-border)] bg-[#0b0b0d] p-1 shadow-[0_18px_50px_rgba(0,0,0,0.55)]">
      {options.map(([optionValue, label]) => (
        <button
          key={optionValue}
          type="button"
          onClick={() => onSelect(optionValue)}
          className={`flex h-8 w-full items-center justify-between rounded-md px-2.5 !text-[10px] font-medium transition ${
            value === optionValue
              ? "bg-[var(--admin-primary)]/[0.08] !text-[var(--admin-text)]"
              : "!text-[var(--admin-muted)] hover:bg-white/[0.035] hover:!text-[var(--admin-text)]"
          }`}
        >
          <span className="min-w-0 truncate">{label}</span>

          {value === optionValue && (
            <Check className="ml-2 h-3 w-3 shrink-0 text-[var(--admin-primary)]" />
          )}
        </button>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Article card                                                               */
/* -------------------------------------------------------------------------- */

function ArticleCard({
  blog,
  first,
  busy,
  menuOpen,
  menuRef,
  onMenu,
  onClose,
  onToggle,
  onDelete,
}: {
  blog: Blog;
  first: boolean;
  busy: boolean;
  menuOpen: boolean;
  menuRef?: RefObject<HTMLDivElement | null>;
  onMenu: () => void;
  onClose: () => void;
  onToggle: () => void;
  onDelete: () => void;
}) {
  return (
    <article
      className={`group relative transition-colors hover:bg-white/[0.012] ${
        first ? "" : "border-t border-[var(--admin-border)]"
      }`}
    >
      <div className="flex min-h-[84px] items-center gap-3 px-3 py-3 sm:px-4">
        {/* Image */}
        <div className="relative h-11 w-16 shrink-0 overflow-hidden rounded-md border border-[var(--admin-border)] bg-[var(--admin-bg)] sm:h-14 sm:w-20">
          {blog.cover_image ? (
            <Image
              src={blog.cover_image}
              alt=""
              fill
              sizes="80px"
              className="object-cover transition duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <FileText className="h-4 w-4 text-[var(--admin-muted)]" />
            </div>
          )}
        </div>

        {/* Main content */}
        <Link href={`/admin/blogs/${blog.id}/edit`} className="min-w-0 flex-1">
          <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
            <StatusBadge status={blog.status} />

            {blog.category && (
              <>
                <span className="text-[8px] text-[var(--admin-muted)]">/</span>

                <span className="max-w-[150px] truncate text-[8px] text-[var(--admin-muted)]">
                  {blog.category}
                </span>
              </>
            )}
          </div>

          <h2 className="truncate text-[11px] font-semibold leading-4 text-[var(--admin-text)] transition-colors group-hover:text-[var(--admin-primary)] sm:text-[12px]">
            {blog.title}
          </h2>

          <div className="mt-1 flex items-center gap-2">
            <span className="max-w-[220px] truncate text-[8px] text-[var(--admin-muted)] sm:max-w-[380px]">
              /blogs/{blog.slug}
            </span>

            <span className="hidden text-[8px] text-[var(--admin-muted)] sm:inline">
              ·
            </span>

            <span className="hidden text-[8px] text-[var(--admin-muted)] sm:inline">
              Updated {relativeDate(blog.updated_at)}
            </span>
          </div>
        </Link>

        {/* Excerpt */}
        <div className="hidden w-[210px] shrink-0 lg:block">
          <p className="line-clamp-2 text-[9px] leading-4 text-[var(--admin-muted)]">
            {blog.excerpt || "No article description added yet."}
          </p>
        </div>

        {/* Updated */}
        <div className="hidden w-[70px] shrink-0 text-right xl:block">
          <span className="text-[8px] text-[var(--admin-muted)]">
            {relativeDate(blog.updated_at)}
          </span>
        </div>

        {/* Actions */}
        <div ref={menuRef} className="relative shrink-0">
          <button
            type="button"
            onClick={onMenu}
            disabled={busy}
            aria-label="Article actions"
            className={`flex h-7 w-7 items-center justify-center rounded-md border transition ${
              menuOpen
                ? "border-[var(--admin-primary)]/30 bg-[var(--admin-primary)]/[0.06] text-[var(--admin-text)]"
                : "border-transparent text-[var(--admin-muted)] hover:border-[var(--admin-border)] hover:text-[var(--admin-text)]"
            }`}
          >
            {busy ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <MoreHorizontal className="h-3.5 w-3.5" />
            )}
          </button>

          {menuOpen && (
            <ArticleMenu
              blog={blog}
              busy={busy}
              onClose={onClose}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          )}
        </div>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/* Article menu                                                               */
/* -------------------------------------------------------------------------- */

function ArticleMenu({
  blog,
  busy,
  onClose,
  onToggle,
  onDelete,
}: {
  blog: Blog;
  busy: boolean;
  onClose: () => void;
  onToggle: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="absolute right-0 top-9 z-[110] w-[170px] overflow-hidden rounded-lg border border-[var(--admin-border)] bg-[#0b0b0d] p-1 shadow-[0_18px_50px_rgba(0,0,0,0.55)]">
      <Link
        href={`/admin/blogs/${blog.id}/edit`}
        onClick={onClose}
        className="flex h-8 items-center gap-2 rounded-md px-2.5 !text-[9px] text-[var(--admin-text)] transition hover:bg-white/[0.035]"
      >
        <Edit3 className="h-3 w-3 text-[var(--admin-muted)]" />
        Edit article
      </Link>

      <Link
        href={`/blogs/${blog.slug}`}
        target="_blank"
        onClick={onClose}
        className="flex h-8 items-center gap-2 rounded-md px-2.5 !text-[9px] text-[var(--admin-text)] transition hover:bg-white/[0.035]"
      >
        <Eye className="h-3 w-3 text-[var(--admin-muted)]" />
        Preview article
      </Link>

      <button
        type="button"
        disabled={busy}
        onClick={onToggle}
        className="flex h-8 w-full items-center gap-2 rounded-md px-2.5 !text-[9px] text-left text-[var(--admin-text)] transition hover:bg-white/[0.035] disabled:opacity-50"
      >
        {blog.status === "published" ? (
          <Clock3 className="h-3 w-3 text-[var(--admin-muted)]" />
        ) : (
          <Check className="h-3 w-3 text-[var(--admin-muted)]" />
        )}

        {blog.status === "published" ? "Move to draft" : "Publish article"}
      </button>

      <div className="my-1 border-t border-[var(--admin-border)]" />

      <button
        type="button"
        disabled={busy}
        onClick={onDelete}
        className="flex h-8 w-full items-center gap-2 rounded-md px-2.5 !text-[9px] text-left text-red-400 transition hover:bg-red-500/[0.06] disabled:opacity-50"
      >
        <Trash2 className="h-3 w-3" />
        Delete article
      </button>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Status                                                                     */
/* -------------------------------------------------------------------------- */

function StatusBadge({ status }: { status: BlogStatus }) {
  const published = status === "published";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-1.5 py-[2px] !text-[7px] font-semibold uppercase tracking-[0.06em] ${
        published
          ? "border-emerald-500/15 bg-emerald-500/[0.05] text-emerald-400"
          : "border-amber-500/15 bg-amber-500/[0.05] text-amber-400"
      }`}
    >
      <span
        className={`h-1 w-1 rounded-full ${
          published ? "bg-emerald-400" : "bg-amber-400"
        }`}
      />

      {published ? "Published" : "Draft"}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Notifications                                                              */
/* -------------------------------------------------------------------------- */

function Notice({
  type,
  message,
  onClose,
}: {
  type: "error" | "success";
  message: string;
  onClose: () => void;
}) {
  const isError = type === "error";

  return (
    <div
      className={`mb-4 flex items-center justify-between gap-3 rounded-md border px-3 py-2.5 !text-[9px] ${
        isError
          ? "border-red-500/15 bg-red-500/[0.04] text-red-400"
          : "border-emerald-500/15 bg-emerald-500/[0.04] text-emerald-400"
      }`}
    >
      <div className="flex min-w-0 items-center gap-2">
        {isError ? (
          <X className="h-3 w-3 shrink-0" />
        ) : (
          <Check className="h-3 w-3 shrink-0" />
        )}

        <span className="truncate">{message}</span>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="shrink-0 opacity-60 transition hover:opacity-100"
        aria-label="Close notification"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Loading                                                                    */
/* -------------------------------------------------------------------------- */

function LoadingState() {
  return (
    <div className="flex min-h-[280px] items-center justify-center">
      <div className="flex items-center gap-2 !text-[9px] text-[var(--admin-muted)]">
        <Loader2 className="h-3.5 w-3.5 animate-spin text-[var(--admin-primary)]" />
        Loading articles...
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Empty state                                                                */
/* -------------------------------------------------------------------------- */

function EmptyState({
  filtered,
  onReset,
}: {
  filtered: boolean;
  onReset: () => void;
}) {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center px-5 text-center">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md border border-[var(--admin-border)] bg-[var(--admin-bg)]">
        <FileText className="h-4 w-4 text-[var(--admin-muted)]" />
      </div>

      <h2 className="!text-[12px] font-semibold text-[var(--admin-text)]">
        {filtered ? "No articles found" : "No articles yet"}
      </h2>

      <p className="mt-1 max-w-xs !text-[9px] leading-5 text-[var(--admin-muted)]">
        {filtered
          ? "Try adjusting your search or filters."
          : "Create your first article to start building your content library."}
      </p>

      {filtered ? (
        <button
          type="button"
          onClick={onReset}
          className="mt-3 h-7 rounded-md border border-[var(--admin-border)] px-2.5 !text-[9px] font-medium text-[var(--admin-text)] transition hover:bg-[var(--admin-bg)]"
        >
          Clear filters
        </button>
      ) : (
        <Link
          href="/admin/blogs/new"
          className="
    mt-3
    inline-flex h-9
    items-center justify-center
    gap-1.5
    rounded-lg
    bg-[var(--admin-purple)]
    px-3
    font-[Lexend]
    !text-[10px]
    font-medium
    text-white
    shadow-sm
    transition-all duration-200
    hover:-translate-y-px
    hover:opacity-95
  "
        >
          <Plus size={13} strokeWidth={1.8} />
          Create article
        </Link>
      )}
    </div>
  );
}
