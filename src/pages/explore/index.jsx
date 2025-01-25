import styles from "./explore.module.css";
import { useEffect, useState } from "react";
import API from "../../utils/app.js";
import post_2 from "../../assets/images/post_2.png";
import NavMenu from "../navMenu/index.jsx";

function Explore() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchRandomUsers() {
      try {
        const response = await API.get("/users/explore");
        console.log(response.data.data);
        setUsers(response.data.data || []);
      } catch (error) {
        console.error("Error fetching random users: ", error);
      }
    }

    fetchRandomUsers();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div>
        <NavMenu />
      </div>
      <div className={styles.postsContainer}>
        {console.log("User.Images:", users.images)}

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
