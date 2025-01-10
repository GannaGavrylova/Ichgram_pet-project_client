import link_icon from "../../assets/link_icon.svg";
import { useState, useEffect } from "react";
import axios from "axios";
// import { UserContext } from "../../context/UserContext";
import PhotoProfile from "../../assets/images/PhotoProfile.png";
import { useParams } from "react-router-dom";

// const URL = "http://localhost:3000/users/:id";

function MyProfile() {
  const [userData, setUserData] = useState(null); //Данные пользователя
  const [posts, setPosts] = useState([]); // Посты пользователя
  //   const { userId } = useContext(UserContext);
  // const { userId } = "677f993c76339da23959f584";
  const { id } = useParams();
  console.log("user id from route params:", id);
  useEffect(() => {
    if (!id) {
      console.error("User ID is not available.");
      return;
    }

    // Получение данных пользователя
    axios
      .get(`http://localhost:3000/users/${id}`)
      .then((response) => {
        setUserData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке данных пользователя:", error);
      });

    // Получение данных пользователя

    axios
      .get(`http://localhost:3000/users/${id}/posts`)
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
    <div style={{ padding: "20px" }}>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        <img
          src={userData?.profileImage || PhotoProfile}
          alt={`${userData?.username}`}
          style={{
            width: "100%",
            height: "100px",
            borderRadius: "50%",
            objectFit: "cover",
            marginRight: "20px",
          }}
        />
        <div>
          <h3>
            {userData?.fullname}
            name
          </h3>
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#0095f6",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Edit profile
          </button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <p>
            <strong>
              {" "}
              post
              {userData?.post_count}
            </strong>
          </p>
          <p>
            <strong>
              {" "}
              followers_count
              {userData?.followers_count}
            </strong>
          </p>
          <p>
            <strong>
              following_count
              {userData?.following_count}
            </strong>
          </p>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <p>
            bio
            {userData?.bio}
          </p>
          <div>
            <img
              src={link_icon}
              alt="Link_Icon"
              style={{ marginRight: "5px" }}
            />
            <a href="bit.ly/3rpiIbh">bit.ly/3rpiIbh</a>
          </div>
        </div>
        <div>
          {" "}
          Posts
          {posts.map((post) => (
            <div
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
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              {/* <div
                style={{
                  position: "absolute",
                  bottom: "10px",
                  left: "10px",
                  color: "white",
                  backgroundColor: "rdba(0,0,0, 0.5",
                  padding: " 5px",
                  borderRadius: "5px",
                }}
              ></div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
