import styles from "./Home.module.css";
import BlogCard from "../../components/Home/BlogCard";
import blogs from "../../mocks/blogs";

function Home() {
    
    return (
        <main className={styles.container}>
            <h1 className={styles.pageTitle}>BLOG</h1>

            <section className={styles.cards}>
                {blogs.map((blog,index) => (
                    <BlogCard
                        key={index}
                        imgId={blog.imgId}
                        title={blog.title}
                        description={blog.description}
                    />
                ))}
            </section>
        </main>
    );
}

export default Home;
