const BASE_URL = "http://localhost:3001";
const BLOGS_URL = `${BASE_URL}/blogs`;

function normalizeLang(lng) {
  const v = (lng || "").toLowerCase();
  return v.startsWith("ar") ? "ar" : "en";
}

export async function getBlogsPage({ page = 1, limit = 6, lang } = {}) {
  const url = new URL(BLOGS_URL);

  url.searchParams.set("_page", String(page));
  url.searchParams.set("_per_page", String(limit));
  url.searchParams.set("_sort", "-createdAt");

  if (lang) {
    url.searchParams.set("lang", normalizeLang(lang));
  }

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Failed to fetch blogs: ${res.status}`);

  const data = await res.json();
  const blogs = Array.isArray(data) ? data : (data?.data ?? data?.items ?? []);
  const totalCount =
    typeof data?.items === "number"
      ? data.items
      : typeof data?.total === "number"
        ? data.total
        : Array.isArray(blogs)
          ? blogs.length
          : 0;

  return { blogs: Array.isArray(blogs) ? blogs : [], totalCount };
}

export async function getBlogById(id) {
  const res = await fetch(`${BLOGS_URL}/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to fetch blog: ${res.status}`);
  return await res.json();
}

export async function addBlog({ title, description, lang }) {
  const normalized = (lang || "").toLowerCase().startsWith("ar") ? "ar" : "en";

  const res = await fetch(BLOGS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      description,
      lang: normalized,
      createdAt: Date.now(),
    }),
  });

  if (!res.ok) throw new Error(`Failed to add blog: ${res.status}`);
  return await res.json();
}

export async function updateBlog(id, { title, description, lang }) {
  const res = await fetch(`${BLOGS_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      description,
      ...(lang ? { lang: normalizeLang(lang) } : {}),
    }),
  });

  if (!res.ok) throw new Error(`Failed to update blog: ${res.status}`);
  return await res.json();
}

export async function deleteBlog(id) {
  const res = await fetch(`${BLOGS_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Failed to delete blog: ${res.status}`);
  return true;
}
