import styles from "./footer.module.css";

function Footer() {
  return (
    <div>
      <footer className={styles.footer_container}>
        <div className={styles.list}>
          <h3>Home</h3>
          <h3>Search</h3>
          <h3>Explore</h3>
          <h3>Messages</h3>
          <h3>Notifications</h3>
          <h3>Creale</h3>
        </div>

        <div className={styles.year}>
          <p>@ 2024 ICHgram</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
