import { useLoaderData, useSearchParams } from "react-router-dom";
import styles from "./Home.module.css";
import BlogCard from "../../components/Home/BlogCard";
import Pagination from "../../components/Home/Pagination";

function Home() {
  const { blogs = [], totalCount = 0, pageSize = 6 } = useLoaderData();
  const [searchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page") || 1);
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return (
    <main className={styles.container}>
      <section className={styles.cards}>
        {blogs.length === 0 ? (
          <p>No blogs found.</p>
        ) : (
          blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              title={blog.title}
              description={blog.description}
            />
          ))
        )}
      </section>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </main>
  );
}

export default Home;
