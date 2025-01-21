import styles from "./postDetails.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import like from "../../assets/like.svg";
import comment from "../../assets/comment.svg";
import smail from "../../assets/smail.svg";
import API from "../../utils/app.js";

function PostDetails() {
  const { postId } = useParams();

  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Получение данных поста по id
    API.get(`post/single/${postId}`)
      .then((response) => {
        console.log("REsponse Data: ", response.data);
        if (response.data && response.data.data) {
          setPost(response.data.data);
          console.log("Data Post: ", response.data);
        }
      })
      .catch((error) => {
        console.log("Ошибка при загрузки данных поста: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [postId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!post) {
    return <p>Post is not found</p>;
  }

  return (
    <div className={styles.mainContainer}>
      <div style={{ display: "flex" }} className={styles.postContainer}>
        <div>
          <img
            src={post.images?.[0]}
            alt="Post"
            style={{ width: "550px", height: "100%" }}
          />
        </div>
        <div className={styles.postData}>
          <div className={styles.nameUser}>
            <img src={post.profileImage} alt="ProfileImage" />
            <p>{post.username}</p>
            <button>x</button>
          </div>
          <div>
            <img src={post.profileImage} alt="ProfileImage" />
            <p>
              <strong>Caption:</strong> {post.caption}
            </p>
          </div>
          <div>
            <h3>Comment:</h3>
            {post.comments?.length > 0 ? (
              post.comments.map((comment) => (
                <div key={comment.id}>
                  <img src={post.profileImage} alt="ProfileImage" />
                  <p>{post.profileImage}</p>
                  <p>{post.comments}</p>
                  <img src={like} alt="like" />
                </div>
              ))
            ) : (
              <p>There are no comments </p>
            )}
          </div>
          <div>
            <div>
              <img src={like} alt="like" />
              <p>{post.likes_count}</p>
            </div>
            <div>
              <img src={comment} alt="comment" />
              <p>{post.comments_count}</p>
            </div>
          </div>
          <div>
            <img src={smail} alt="smail" />
            <input type="text" name="text" placeholder="commentar" />
            <button>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetails;
