import styles from "./Home.module.css";
import BlogCard from "../../components/BlogCard";

function Home() {
    const blogs = [
        {
            id: 1,
            imgId: 1,
            title: "10 Tips to Improve Your Frontend Skills",
            description:
                "Learn simple techniques to write cleaner CSS and structure your HTML correctly.",
        },
        {
            id: 2,
            imgId: 2,
            title: "How to Stay Productive While Studying",
            description:
                "Planning your tasks and taking small breaks can boost your focus and efficiency.",
        },
        {
            id: 3,
            imgId: 3,
            title: "AI Tools Changing the Future",
            description:
                "New AI models are helping developers write code faster with improved accuracy.",
        },
        {
            id: 4,
            imgId: 4,
            title: "Minimalist UI Designs You Should Try",
            description:
                "Explore clean layouts and balanced spacing for a professional modern look.",
        },
        {
            id: 5,
            imgId: 5,
            title: "Why Responsive Design Matters",
            description:
                "A responsive website improves user experience and adapts to any screen size.",
        },
        {
            id: 6,
            imgId: 6,
            title: "5 Healthy Habits for a Better Day",
            description:
                "Walking daily and drinking enough water can greatly improve your energy.",
        },
    ];

    return (
        <main className={styles.container}>
            <h1 className={styles.pageTitle}>BLOG</h1>

            <section className={styles.cards}>
                {blogs.map((blog) => (
                    <BlogCard
                        key={blog.id}
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
