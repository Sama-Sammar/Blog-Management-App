import Layout from "./pages/Layout";
import Home from "./pages/Home";
import AddEditBlog from "./pages/AddEditBlog";

import { homeLoader } from "./loaders/blogsLoader";

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

      { path: "blog/new", element: <AddEditBlog /> },
      { path: "blog/:id/edit", element: <AddEditBlog /> },
    ],
  },
];

export default routes;
