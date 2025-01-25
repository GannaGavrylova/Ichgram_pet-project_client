import styles from "./otherProfile.module.css";
import { useState, useEffect } from "react";

import NavMenu from "../navMenu";
import FollowButton from "../../components/followButton";
import API from "../../utils/app.js";
import PhotoProfile from "../../assets/images/PhotoProfile.png";
import { Link, useParams } from "react-router-dom";

function OtherProfile() {
  const { id: targetUserId } = useParams();
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!targetUserId) {
      console.error("Target user ID is not available.");
      return;
    }
    API.get(`/users/${targetUserId}`)

      .then((response) => {
        if (response.data && response.data.data) {
          setUserData(response.data.data);
          setPosts(response.data.data.posts);
        }
      })
      .catch((error) => {
        console.error("Error loading user data", error);
      });
  }, [targetUserId]);
  if (!targetUserId) {
    return <p>Error: Target user ID is not available </p>;
  }

  return (
    <div style={{ display: "flex" }}>
      <NavMenu />

      <div
        className={styles.profileMainContainer}
        style={{ padding: "20px 90px" }}
      >
        <div className={styles.avater} style={{ display: "flex" }}>
          <img
            src={userData?.profileImage || PhotoProfile}
            alt={userData?.username || "Profile"}
            className={styles.imageAvatar}
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              objectFit: "cover",
              marginRight: "20px",
            }}
          />

          <div className={styles.dataUserAndPostsContainer}>
            {/* {1} */}
            {/* {users.map((user) => (
              <div>
                <Link to={`/users/${user._id}`}>
                  <h3 className={styles.userNameHeader}>
                    {userData?.username}
                  </h3>
                </Link>
              </div>
            ))} */}

            <div>
              <h3
                className={styles.userNameHeader}
                style={{ cursor: "pointer" }}
              >
                {userData?.username}
              </h3>
            </div>

            <div className={styles.nameButtonContainer}>
              <h3 style={{ cursor: "pointer" }}>
                {userData?.fullname || "No name provided"}
              </h3>

              <FollowButton
                isInitiallyFollowing={userData?.isFollowing || false}
                targetUserId={targetUserId}
              />
            </div>
            {/* {2} */}

            <div className={styles.postFollowContainer}>
              <p className={styles.post}>
                <strong>{userData?.post_count || 0} posts</strong>
              </p>
              <p className={styles.followers}>
                <strong>{userData?.followers_count || 0} followers</strong>
              </p>
              <p className={styles.following}>
                <strong>{userData?.following_count || 0} following</strong>
              </p>
            </div>
            {/* {3} */}
            <div
              className={styles.bioContainer}
              style={{ marginBottom: "20px" }}
            >
              <p className={styles.bio}>{userData?.bio || "No bio provided"}</p>
            </div>
          </div>
        </div>
        {/* POST */}

        <div className={styles.postMainContainer}>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div className={styles.posts} key={post._id}>
                <Link to={`/post/${post._id}`}>
                  <img
                    className={styles.postImage}
                    src={post.images?.[0]}
                    alt={post.caption || "No caption"}
                  />
                </Link>
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

export default OtherProfile;
