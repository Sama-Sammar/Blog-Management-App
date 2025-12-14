import styles from "./Footer.module.css";

function Footer() {
    return (
        <footer className={styles.footer}>
            <p>
                &copy; 2025 — <a href="#">LinkedIn</a>
            </p>
        </footer>
    );
}

export default Footer;
