import styles from "./explore.module.css";
import { useEffect, useState } from "react";
import API from "../../utils/app.js";
import post_2 from "../../assets/images/post_2.png";
import NavMenu from "../navMenu/index.jsx";
import { useNavigate } from "react-router-dom";

function Explore() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRandomUsers() {
      try {
        const response = await API.get("/users/explore");

        setUsers(response.data.data || []);
      } catch (error) {
        console.error("Error fetching random users: ", error);
      }
    }

    fetchRandomUsers();
  }, []);

  const handleOpenPost = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <div style={{ display: "flex" }}>
      <div>
        <NavMenu />
      </div>
      <div className={styles.postsContainer}>
        {users.length > 0 ? (
          users.map((user, index) => (
            <div key={`${user._id}-${index}`} className={styles.imageContainer}>
              {Array.isArray(user.posts) ? (
                user.posts.map((post) => (
                  <section key={post._id}>
                    <img
                      src={
                        post.images && post.images.length > 0
                          ? post.images[0].url || post.images[0]
                          : post_2
                      }
                      alt="Post"
                      style={{
                        width: "100%",
                        height: "350px",
                      }}
                      onClick={() => handleOpenPost(post._id)}
                    />
                  </section>
                ))
              ) : (
                <p>No posts available</p>
              )}
            </div>
          ))
        ) : (
          <p>No users available</p>
        )}
      </div>
    </div>
  );
}

export default Explore;
