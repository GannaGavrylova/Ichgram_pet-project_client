import { useState } from "react";
import header from "../../assets/header.svg";
import Notifications from "../../components/notifications";
import styles from "./navMenu.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function NavMenu() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false); // Состояние видимости уведомлений
  const userId = useSelector((state) => state.user.userId); // Получаем ID пользователя из Redux

  const toggleNotifications = () => {
    setIsNotificationsOpen((prev) => !prev); // Переключение состояния
  };
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
            <li
              className={`${styles.notifications} ${
                isNotificationsOpen ? styles.active : ""
              }`}
              onClick={toggleNotifications}
            >
              Notifications
            </li>
            <li className={styles.create}>Create</li>
            <li className={styles.profile}>
              {userId && (
                <Link
                  to={`/users/${userId}`} // Динамическая ссылка
                  style={
                    window.location.pathname === `/users/${userId}` ||
                    window.location.pathname === `/users/${userId}/edit-profile`
                      ? {
                          fontWeight: "900",
                          color: "black",
                          textDecoration: "none",
                        }
                      : { color: "black", textDecoration: "none" }
                  }
                >
                  Profile
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.rightContainer}>
        {isNotificationsOpen && (
          <div className={styles.notificationsContainer}>
            <Notifications />
          </div>
        )}
      </div>
    </div>
  );
}

export default NavMenu;
