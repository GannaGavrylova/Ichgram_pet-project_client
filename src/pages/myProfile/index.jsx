import link_icon from "../../assets/link_icon.svg";
import { useState, useEffect } from "react";
import PhotoProfile from "../../assets/images/PhotoProfile.png";
import Seifekugel from "../../assets/images/Seifekugel.jpg";
import { Link, useParams, useLocation } from "react-router-dom";
import API from "../../utils/app.js";
import styles from "./myProfile.module.css";
import NavMenu from "../navMenu/index.jsx";
import { useSelector } from "react-redux";

function MyProfile() {
  const location = useLocation();
  const [userData, setUserData] = useState(null); //Данные пользователя
  const [posts, setPosts] = useState([]); // Посты пользователя
  const { id } = useParams();
  const userId = useSelector((state) => state.user.userId); // Получаем ID пользователя из Redux

  useEffect(() => {
    if (!id) {
      console.error("User ID is not available.");
      return;
    }
    if (location.state?.newPost) {
      setPosts((prevPosts) => [location.state.newPost, ...prevPosts]);
    }
    // Получение данных пользователя
    API.get(`/users/${id}`)
      .then((response) => {
        if (response.data && response.data.data) {
          setUserData(response.data.data);

          setPosts(response.data.data.posts);
        }
      })
      .catch((error) => {
        console.error("Ошибка при загрузке данных пользователя:", error);
      });
  }, [id, location.state]);

  if (!id) {
    return <p>Error: User ID is not available</p>;
  }

  return (
    <div style={{ display: "flex" }}>
      <NavMenu style={{ fontWeight: "900", color: "red" }} />
      <div className={styles.profileMainContainer} style={{ padding: "20px" }}>
        <div className={styles.avatar}>
          <img
            src={userData?.profileImage || Seifekugel}
            alt={userData?.username || "Profile"}
            style={{
              width: "350px",
              height: "150px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />

          <div className={styles.dataUserAndPostsContainer}>
            {/* 1 */}
            <h3 className={styles.userNameHeader}>{userData?.username}</h3>
            <div className={styles.nameButtonContainer}>
              <h3>{userData?.fullname || "No name provided"}</h3>
              <Link to={`/users/${userId}/edit-profile`}>
                <button className={styles.editProfileBtn}>Edit profile</button>
              </Link>
            </div>
            {/* 2 */}
            <div className={styles.postFollowContainer}>
              <p className={styles.post}>
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
                <Link to={`/post/${post._id}`}>
                  <img
                    className={styles.postImage}
                    src={post.images?.[0]}
                    alt={post.caption || "No caption"}
                    // style={{
                    //   width: "310px",
                    //   height: "310px",
                    //   objectFit: "cover",
                    //   cursor: "pointer",
                    // }}
                  />
                </Link>

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
