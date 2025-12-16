import styles from "./Header.module.css";

function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>BLOG</div>

            <input type="checkbox" id="menu-toggle" className={styles.toggle} />

            <label htmlFor="menu-toggle" className={styles.hamburger}>
                <span></span>
                <span></span>
                <span></span>
            </label>

            <nav className={styles.nav}>
                <a href="#">Home</a>
                <a href="#">Add New Blog</a>
            </nav>
        </header>
    );
}

export default Header;
