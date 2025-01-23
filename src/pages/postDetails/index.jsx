import styles from "./postDetails.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import like from "../../assets/like.svg";
import comments from "../../assets/comment.svg";
import smail from "../../assets/smail.svg";
import API from "../../utils/app.js";
import ellipsis from "../../assets/ellipsis.svg";
import PostActions from "../postActions/index.jsx";

function PostDetails() {
  const { postId } = useParams();
  const [comment, setComment] = useState("");
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleInputChang = (event) => {
    setComment(event.target.value);
  };

  const handleSendClick = () => {
    if (comment.trim()) {
      console.log("Senden comment: ", comment);
      setComment("");
    }
  };
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
            <img
              className={styles.profileImage}
              src={post.user_id.profileImage}
              alt="ProfileImage"
            />
            <p>{post.user_id.username}</p>
            <button type="button" onClick={toggleModal}>
              <img src={ellipsis} alt="Ellipsis" />
            </button>
            {isModalOpen && <PostActions onClose={toggleModal} />}
          </div>
          <div className={styles.captionPost}>
            <img
              className={styles.profileImage}
              src={post.user_id.profileImage}
              alt="ProfileImage"
            />
            <p>{post.user_id.username}</p>
            <p>{post.caption}</p>
          </div>
          <div className={styles.commentPost}>
            {post.comments?.length > 0 ? (
              post.comments.map((comment) => (
                <div key={comment.id} className={styles.commentContainer}>
                  <img
                    className={styles.profileImage}
                    src={post.user_id.profileImage}
                    alt="ProfileImage"
                  />
                  <p>{post.profileImage}</p>
                  <p>{post.comments}</p>
                  <img src={like} alt="like" />
                </div>
              ))
            ) : (
              <p className={styles.commentNo}>There are no comments </p>
            )}
          </div>
          <div className={styles.likesContainer}>
            <div>
              <img src={like} alt="like" />
              <p>{post.likes_count}</p>
            </div>
            <div>
              <img src={comments} alt="comment" />
              <p>{post.comments_count}</p>
            </div>
          </div>
          <div className={styles.inputComment}>
            <img src={smail} alt="smail" />
            <input
              type="text"
              name="text"
              placeholder="Add comment"
              value={comment}
              onChange={handleInputChang}
            />
            <button type="submit" onClick={handleSendClick}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetails;
