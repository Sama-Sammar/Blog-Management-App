import presetBlogs from "../mocks/blogs";

const STORAGE_KEY = "blogs";

export function initBlogsStorage() {
  const existing = localStorage.getItem(STORAGE_KEY);

  if (!existing) {
    const withIds = presetBlogs.map((b, index) => ({
      ...b,
      id: `preset-${index + 1}`,
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(withIds));
    return;
  }

  try {
    const parsed = JSON.parse(existing);
    if (!Array.isArray(parsed)) return;

    const hasMissingIds = parsed.some((b) => !b?.id);
    if (hasMissingIds) {
      const migrated = parsed.map((b, index) => ({
        ...b,
        id: b.id || `migrated-${index + 1}`,
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
    }
  } catch {
    const withIds = presetBlogs.map((b, index) => ({
      ...b,
      id: `preset-${index + 1}`,
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(withIds));
  }
}

export function getBlogsFromStorage() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveBlogsToStorage(blogs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
}

function getNextImgId(blogs) {
  const maxImgId = blogs.reduce((max, b) => (b.imgId > max ? b.imgId : max), 0);
  const next = (maxImgId % 6) + 1;
  return next;
}

export function addBlogToStorage({ title, description }) {
  const blogs = getBlogsFromStorage();

  const newBlog = {
    id: String(Date.now()),
    imgId: getNextImgId(blogs),
    title,
    description,
  };

  const updated = [newBlog, ...blogs];
  saveBlogsToStorage(updated);

  return newBlog;
}

export function getBlogByIdFromStorage(id) {
  const blogs = getBlogsFromStorage();
  return blogs.find((b) => b.id === id) || null;
}

export function updateBlogInStorage(id, { title, description }) {
  const blogs = getBlogsFromStorage();

  const updated = blogs.map((b) =>
    b.id === id ? { ...b, title, description } : b
  );

  saveBlogsToStorage(updated);
}

export function deleteBlogFromStorage(id) {
  const blogs = getBlogsFromStorage();
  const updated = blogs.filter((b) => b.id !== id);
  saveBlogsToStorage(updated);
}

export function resetBlogsStorage() {
  const withIds = presetBlogs.map((b, index) => ({
    ...b,
    id: `preset-${index + 1}`,
  }));
  localStorage.setItem("blogs", JSON.stringify(withIds));
}
