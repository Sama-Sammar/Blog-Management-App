import { redirect } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import AddEditBlog from "./pages/AddEditBlog";

import store from "./store/config/store";
import { startLoading, stopLoading } from "./store/loaderSlice";

import {
  getBlogsPage,
  addBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "./services/blogsService";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function homeLoader({ request }) {
  const url = new URL(request.url);
  const pageParam = url.searchParams.get("page");
  const currentPage = pageParam ? Number(pageParam) : 1;

  const pageSize = 6;
  const safePage =
    Number.isNaN(currentPage) || currentPage < 1 ? 1 : currentPage;

  const { blogs, totalCount } = await getBlogsPage({
    page: safePage,
    limit: pageSize,
  });

  const totalPages = Math.max(1, Math.ceil((totalCount || 0) / pageSize));
  const finalPage = safePage > totalPages ? totalPages : safePage;

  if (finalPage !== safePage) {
    return redirect(`/?page=${finalPage}`);
  }

  return {
    blogs,
    pagination: {
      currentPage: finalPage,
      totalPages,
    },
  };
}

export async function addBlogAction({ request }) {
  store.dispatch(startLoading());
  try {
    await delay(200);

    const formData = await request.formData();
    const title = String(formData.get("title") || "").trim();
    const description = String(formData.get("description") || "").trim();

    await addBlog({ title, description });

    return redirect("/?page=1");
  } finally {
    store.dispatch(stopLoading());
  }
}

export async function editBlogLoader({ params, request }) {
  store.dispatch(startLoading());
  try {
    await delay(150);

    const blog = await getBlogById(params.id);
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
    await delay(200);

    const url = new URL(request.url);
    const page = url.searchParams.get("page") || "1";

    const formData = await request.formData();
    const title = String(formData.get("title") || "").trim();
    const description = String(formData.get("description") || "").trim();

    await updateBlog(params.id, { title, description });

    return redirect(`/?page=${page}`);
  } finally {
    store.dispatch(stopLoading());
  }
}

export async function deleteBlogAction({ request, params }) {
  store.dispatch(startLoading());
  try {
    await delay(180);

    const url = new URL(request.url);
    const page = url.searchParams.get("page") || "1";

    await deleteBlog(params.id);

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
      {
        index: true,
        element: <Home />,
        loader: homeLoader,
        shouldRevalidate: () => true,
      },

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
