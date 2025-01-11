import { useState } from "react";
import styles from "./notification.module.css";

function Notifications() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "You have a new message!" },
    { id: 2, message: "Your profile was viewed." },
    { id: 3, message: "New friend request." },
  ]);
  return (
    <div className={styles.notificationContainer}>
      <div className={styles.contentNotifications}>
        <h2>Notifications</h2>
        <h4>New</h4>
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id} className={styles.notificationItem}>
              {notification.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Notifications;
