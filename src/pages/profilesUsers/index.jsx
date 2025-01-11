import React, { useState, useEffect } from "react";
import like from "../../assets/like.svg";
import comment from "../../assets/comment.svg";
import styles from "./profile.module.css";
import PhotoProfile from "../../assets/images/PhotoProfile.png";
import BackgroundImages from "../../assets/images/BackgroundImages.png";
import refresh_site from "../../assets/images/refresh_site.png";
import NavMenu from "../navMenu";
import API from "../../utils/app.js";

function ProfilesUsers() {
  const [users, setUsers] = useState([]); // Список всех пользователей
  const [page, setPage] = useState(1); // Текущая страница
  const [isLoading, setIsLoading] = useState(false); // Состояние загрузки
  const [hasMore, setHasMore] = useState(true); // Есть ли ещё страницы для загрузки

  useEffect(() => {
    async function fetchUsers() {
      setIsLoading(true);
      try {
        const response = await API.get(`/users/home?page=${page}&limit=4`);
        const newUsers = response.data;

        if (newUsers.length === 0) {
          setHasMore(false); // Если данных больше нет, остановить пагинацию
        } else {
          setUsers((prevUsers) => {
            const uniqueUsers = [...prevUsers, ...newUsers].reduce(
              (acc, user) => {
                if (!acc.some((u) => u._id === user._id)) {
                  acc.push(user);
                }
                return acc;
              },
              []
            );
            return uniqueUsers; // Добавляем новых пользователей
          });
        }
      } catch (error) {
        console.error("Error fetching users data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUsers();
  }, [page]);

  const loadMoreUsers = () => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1); // Увеличить страницу
    }
  };

  if (users.length === 0 && !isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div style={{ display: "flex", border: "2px solid red" }}>
      <NavMenu />
      <div
        className={styles.gridContainer}
        style={{ border: "2px solid pink" }}
      >
        {users.map((user, index) => (
          <div className={styles.usersPages} key={`${user._id}-${index}`}>
            <header className={styles.header}>
              <img
                src={user.photo || PhotoProfile}
                alt="PhotoProfile"
                className={styles.profileImage}
                style={{
                  width: "50px",
                  height: "50px",
                }}
              />
              <h4>{user.username}</h4>
              <hr />
              <p>2 wek</p>
              <hr />
              <button>follow</button>
            </header>

            <main>
              <section>
                <img
                  src={(user.images && user.images[0]) || BackgroundImages}
                  alt="Post"
                />
              </section>
              <section>
                <div className={styles.likesIkon}>
                  <img src={like} alt="like" />
                  <img src={comment} alt="comment" />
                </div>
                <div className={styles.commentText}>
                  <p>{user.likes_count || 0} likes</p>
                  <p>
                    <strong>
                      {user.username}
                      {user.caption}
                    </strong>
                  </p>
                  <p>
                    <strong>
                      {user.username}
                      {user.comment}
                    </strong>
                  </p>
                  <p>View all comments {user.comments_count || 0}</p>
                </div>
              </section>
            </main>
          </div>
        ))}

        {hasMore && (
          <div className={styles.downloadMore}>
            <button onClick={loadMoreUsers} disabled={isLoading}>
              <img src={refresh_site} alt="Pagination" />
            </button>
            {/* <h3>You've seen all the updates</h3>
            <p>You have viewed all new publications</p> */}
          </div>
        )}

        {!hasMore && (
          <div className={styles.downloadMore}>
            <h3>You've seen all the updates</h3>
            <p>You have viewed all new publications</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilesUsers;
