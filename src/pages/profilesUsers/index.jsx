import React, { useState, useEffect } from "react";
import like from "../../assets/like.svg";
import comment from "../../assets/comment.svg";
import axios from "axios";
import styles from "./profile.module.css";
import PhotoProfile from "../../assets/images/PhotoProfile.png";
import BackgroundImages from "../../assets/images/BackgroundImages.png";
import refresh_site from "../../assets/images/refresh_site.png";

function ProfilesUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get("http://localhost:3000/users/home");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users data:", error);
      }
    }
    fetchUsers();
  }, [users]);

  if (!users) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <header>
        <img
          src={users.photo || PhotoProfile}
          alt="PhotoProfile"
          className={styles.profileImage}
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <h1>{users.username}</h1>
        <hr />
        <p>2 wek</p>
        <hr />
        <p>follow</p>
      </header>

      <main>
        <section>
          <img src={users.postImage || BackgroundImages} alt="Post" />
        </section>
        <section>
          <div>
            <img src={like} alt="like" />
            <img src={comment} alt="comment" />
          </div>
          <p>{users.likes} likes</p>
          <p>
            <strong>{users.username}</strong> {users.caption}
          </p>
          <p>View all {users.commentsCount}</p>
        </section>
      </main>
      <div>
        <button>
          <img src={refresh_site} alt="Pagination" />
        </button>
        <h3>You've seen all the updates</h3>
        <p>You have viewed all new publications</p>
      </div>
    </div>
  );
}

export default ProfilesUsers;
