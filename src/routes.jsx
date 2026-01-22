import { redirect } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import AddEditBlog from "./pages/AddEditBlog";
import {
  getBlogsFromStorage,
  addBlogToStorage,
  getBlogByIdFromStorage,
  updateBlogInStorage,
  deleteBlogFromStorage,
} from "./utils/blogsStorage";
import store from "./store/store";
import { startLoading, stopLoading } from "./store/loaderSlice";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function homeLoader({ request }) {
  const url = new URL(request.url);
  const pageParam = url.searchParams.get("page");
  const currentPage = pageParam ? Number(pageParam) : 1;

  const blogs = getBlogsFromStorage();

  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(blogs.length / pageSize));

  const safePage =
    Number.isNaN(currentPage) || currentPage < 1
      ? 1
      : currentPage > totalPages
        ? totalPages
        : currentPage;

  const start = (safePage - 1) * pageSize;
  const paginatedBlogs = blogs.slice(start, start + pageSize);

  return {
    blogs: paginatedBlogs,
    pagination: {
      currentPage: safePage,
      totalPages,
    },
  };
}

export async function addBlogAction({ request }) {
  store.dispatch(startLoading());
  try {
    await delay(500);

    const formData = await request.formData();
    const title = String(formData.get("title") || "").trim();
    const description = String(formData.get("description") || "").trim();

    addBlogToStorage({ title, description });

    return redirect("/?page=1");
  } finally {
    store.dispatch(stopLoading());
  }
}

export async function editBlogLoader({ params, request }) {
  store.dispatch(startLoading());
  try {
    await delay(250);

    const blog = getBlogByIdFromStorage(params.id);
    if (!blog) {
      const url = new URL(request.url);
      const page = url.searchParams.get("page") || "1";
      return redirect(`/?page=${page}`);
    }

    return { blog };
  } finally {
    store.dispatch(stopLoading());
  }
}

export async function editBlogAction({ request, params }) {
  store.dispatch(startLoading());
  try {
    await delay(500);

    const url = new URL(request.url);
    const page = url.searchParams.get("page") || "1";

    const formData = await request.formData();
    const title = String(formData.get("title") || "").trim();
    const description = String(formData.get("description") || "").trim();

    updateBlogInStorage(params.id, { title, description });

    return redirect(`/?page=${page}`);
  } finally {
    store.dispatch(stopLoading());
  }
}

export async function deleteBlogAction({ request, params }) {
  store.dispatch(startLoading());
  try {
    await delay(450);

    const url = new URL(request.url);
    const page = url.searchParams.get("page") || "1";

    deleteBlogFromStorage(params.id);

    return redirect(`/?page=${page}`);
  } finally {
    store.dispatch(stopLoading());
  }
}

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home />, loader: homeLoader },

      { path: "blog/new", element: <AddEditBlog />, action: addBlogAction },

      {
        path: "blog/:id/edit",
        element: <AddEditBlog />,
        loader: editBlogLoader,
        action: editBlogAction,
      },

      { path: "blog/:id/delete", action: deleteBlogAction },
    ],
  },
];

export default routes;
