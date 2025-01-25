import { useState, useEffect } from "react";
import like from "../../assets/like.svg";
import comment from "../../assets/comment.svg";
import styles from "./profile.module.css";
import PhotoProfile from "../../assets/images/PhotoProfile.png";
import BackgroundImages from "../../assets/images/BackgroundImages.png";
import refresh_site from "../../assets/images/refresh_site.png";
import NavMenu from "../navMenu";
import API from "../../utils/app.js";
import FollowButton from "../../components/followButton/index.jsx";
import { Link, useNavigate } from "react-router-dom";
import getCurrentUserId from "../../utils/getCurrentUserId.js";

function ProfilesUsers() {
  const [users, setUsers] = useState([]); // Список всех пользователей
  const [page, setPage] = useState(1); // Текущая страница
  const [isLoading, setIsLoading] = useState(false); // Состояние загрузки
  const [hasMore, setHasMore] = useState(true); // Есть ли ещё страницы для загрузки
  // const { id: targetUserId } = useParams();
  const navigate = useNavigate();
  const currentUserId = getCurrentUserId();

  useEffect(() => {
    async function fetchUsers() {
      console.log("useEffect called with page:", page);
      setIsLoading(true);
      try {
        console.log("FetchUsers function called");
        const response = await API.get(`/users/home?page=${page}&limit=4`);
        const newUsers = response.data;
        console.log("NewUser :", newUsers);

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
    console.log("Calling fetchUsers...");
    fetchUsers();
  }, [page]);

  const loadMoreUsers = () => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1); // Увеличить страницу
    }
  };

  const handleOpenProfile = (userId) => {
    navigate(`/users/${userId}`);
  };
  const handleFollowChange = (userId, isFollowing) => {
    console.log("handleFolloeChange called with: ", userId, isFollowing);
    setUsers((prevUsers) => {
      console.log("Previous users: ", prevUsers);
      const updatedUsers = prevUsers.map((user) =>
        user._id === userId ? { ...user, isFollowing } : user
      );
      console.log("Updated state:", updatedUsers);
      return updatedUsers;
    });
  };
  // console.log("handleFollowChange:", handleFollowChange);
  console.log("Current users state: ", users);

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
        {console.log("Users in parent component:", users)}
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
              <button onClick={() => handleOpenProfile(user._id)}>
                <Link to={`/users/${user._id}`}>
                  <h4>{user.username}</h4>
                </Link>
              </button>
              <hr />
              <p>2 wek</p>
              <hr />
              <h3>{user.username}</h3>
              {console.log("onFollowChange in parent:", handleFollowChange)}
              <FollowButton
                isInitiallyFollowing={user.isFollowing || false}
                targetUserId={user._id}
                onFollowChange={handleFollowChange}
              />
              {/* <button type="button">follow</button> */}
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
