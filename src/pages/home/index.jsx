import header from "../../assets/header.svg";
import ProfilesUsers from "../profilesUsers";

import styles from "./home.module.css";

function Home() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftContainer}>
        <header>
          <img className={styles.headerImg} src={header} alt="Ichgram" />
        </header>
        <nav>
          <ul className={styles.customList}>
            <li className={styles.home}>Home</li>
            <li className={styles.search}>Search</li>
            <li className={styles.explore}>Explore</li>
            <li className={styles.messages}>Messages</li>
            <li className={styles.notifications}>Notifications</li>
            <li className={styles.create}>Create</li>
            <li className={styles.profile}>Profile</li>
          </ul>
        </nav>
      </div>
      <div className={styles.rightContainer}>
        <ProfilesUsers />
      </div>
    </div>
  );
}

export default Home;
