import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../store/loaderSlice";

import styles from "./Home.module.css";
import BlogCard from "../../components/Home/BlogCard";
import Pagination from "../../components/Home/Pagination";

function Home() {
  const { blogs, pagination } = useLoaderData();
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    dispatch(startLoading());
    setReady(false);

    const timer = setTimeout(() => {
      dispatch(stopLoading());
      setReady(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <main className={styles.container}>
      {ready && (
        <>
          <section className={styles.cards}>
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                imgId={blog.imgId}
                title={blog.title}
                description={blog.description}
                titleEn={blog.titleEn}
                descEn={blog.descEn}
                titleAr={blog.titleAr}
                descAr={blog.descAr}
              />
            ))}
          </section>

          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
          />
        </>
      )}
    </main>
  );
}

export default Home;
