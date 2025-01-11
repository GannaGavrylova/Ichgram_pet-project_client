import link_icon from "../../assets/link_icon.svg";
import { useState, useEffect } from "react";
import PhotoProfile from "../../assets/images/PhotoProfile.png";
import { useParams } from "react-router-dom";
import API from "../../utils/app.js";
import styles from "./myProfile.module.css";
import NavMenu from "../navMenu/index.jsx";

function MyProfile() {
  const [userData, setUserData] = useState(null); //Данные пользователя
  const [posts, setPosts] = useState([]); // Посты пользователя
  const { id } = useParams();
  console.log("user id from route params:", id);
  useEffect(() => {
    if (!id) {
      console.error("User ID is not available.");
      return;
    }
    // Получение данных пользователя
    API.get(`/users/${id}`)
      .then((response) => {
        if (
          response.data &&
          response.data.data &&
          response.data.data.length > 0
        ) {
          setUserData(response.data.data[0]);
          console.log(response.data.data[0]);
        }
      })
      .catch((error) => {
        console.error("Ошибка при загрузке данных пользователя:", error);
      });

    // Получение данных пользователя
    API.get(`/users/${id}/posts`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке постов:", error);
      });
  }, [id]);

  if (!id) {
    return <p>Error: User ID is not available</p>;
  }

  return (
    <div style={{ display: "flex" }}>
      <NavMenu />
      <div className={styles.profileMainContainer} style={{ padding: "20px" }}>
        <div className={styles.avatar}>
          <img
            src={userData?.profileImage || PhotoProfile}
            alt={userData?.username || "Profile"}
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />

          <div className={styles.dataUserAndPostsContainer}>
            {/* 1 */}
            <div className={styles.nameButtonContainer}>
              <h3>{userData?.fullname || "No name provided"}</h3>
              <button>Edit profile</button>
            </div>
            {/* 2 */}
            <div
              className={styles.postFollowContainer}
              // style={{
              //   display: "flex",
              //   justifyContent: "space-between",
              //   marginBottom: "20px",
              // }}
            >
              <p className={styles.posts}>
                <strong>{userData?.post_count || 129} posts</strong>
              </p>
              <p className={styles.followers}>
                <strong>{userData?.followers_count || 9993} followers</strong>
              </p>
              <p className={styles.following}>
                <strong>{userData?.following_count || 59} following</strong>
              </p>
            </div>
            {/* 3 */}
            <div
              className={styles.bioContainer}
              style={{ marginBottom: "20px" }}
            >
              <p className={styles.bio}>{userData?.bio || "No bio provided"}</p>
            </div>
            <div>
              <a href="#" className={styles.link}>
                <img src={link_icon} alt="Link_Icon" />
                bit.ly/3rpiIbh
              </a>
            </div>
          </div>
        </div>
        {/* POST */}
        <div className={styles.postMainContainer}>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                className={styles.posts}
                key={post._id}
                style={{
                  position: "relative",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={post.images[0]}
                  alt={post.caption}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "10px",
                    color: "white",
                    backgroundColor: "rdba(0,0,0, 0.5",
                    padding: " 5px",
                    borderRadius: "5px",
                  }}
                ></div>
              </div>
            ))
          ) : (
            <p>No posts available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
