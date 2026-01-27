import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        &copy; 2025 — <a href="#" aria-label="LinkedIn">LinkedIn</a>
      </p>
    </footer>
  );
}

export default Footer;
