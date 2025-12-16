import styles from "./BlogCard.module.css";

function BlogCard({ title, description, imgId }) {
    return (
        <div className={styles.card}>
            <div
                className={styles.img}
                style={{
                    backgroundImage: `url('https://picsum.photos/400/300?${imgId}')`,
                }}
            ></div>

            <h3 className={styles.title}>{title}</h3>
            <p className={styles.desc}>{description}</p>
        </div>
    );
}

export default BlogCard;