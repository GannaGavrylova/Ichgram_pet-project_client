import styles from "./postDetails.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import like from "../../assets/like.svg";
import likeRed from "../../assets/likeRed.svg";
import comments from "../../assets/comment.svg";
import smail from "../../assets/smail.svg";
import API from "../../utils/app.js";
import ellipsis from "../../assets/ellipsis.svg";
import PostActions from "../postActions/index.jsx";
import PhotoProfile from "../../assets/images/PhotoProfile.png";
import { likePost, unLikePost } from "../../utils/likePost.js";
import { useSelector } from "react-redux";

function PostDetails() {
  const { postId } = useParams();
  const [comment, setComment] = useState("");
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const currentUserId = useSelector((state) => state.user.userId);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleInputChang = (event) => {
    setComment(event.target.value);
  };

  const handleSendClick = () => {
    if (comment.trim()) {
      setComment("");
    }
  };
  useEffect(() => {
    //Получение данных поста по id
    API.get(`post/single/${postId}`)
      .then((response) => {
        if (response.data && response.data.data) {
          setPost(response.data.data);
        }
      })
      .catch((error) => {
        console.log("Ошибка при загрузки данных поста: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [postId]);

  const handleLike = async (postId, currentUserId) => {
    if (!postId || !currentUserId) {
      console.error("Post ID and User ID are required");
      return;
    }

    try {
      if (!isLiked) {
        const response = await likePost(postId, currentUserId);
        if (response.success) {
          setIsLiked(true);
          setPost((prevPost) => ({
            ...prevPost,
            lekes_count: prevPost.likes_count + 1,
            likes: [...prevPost.likes, currentUserId],
          }));
        }
      } else {
        const response = await unLikePost(postId, currentUserId);
        console.log("Post unliked succesfully");
        if (response.success) {
          setIsLiked(false);

          setPost((prevPost) => ({
            ...prevPost,
            likes_count: prevPost.likes_count - 1,
            likes: prevPost.likes.filter((like) => like !== currentUserId),
          }));
        }
      }
    } catch (error) {
      console.error("Failed to like/unlike:", error.message);
    }
  };

  // const handleUnlike = async () => {
  //   try {
  //     await unLikePost(postId, currentUserId);
  //     console.log("Post unliked succesfully");

  //     setPost((prevPost) => ({
  //       ...prevPost,
  //       likes_count: prevPost.likes_count - 1,
  //       likes: prevPost.likes.filter((like) => like !== currentUserId),
  //     }));
  //   } catch (error) {
  //     console.error("Failed to unlike: ", error.message);
  //   }
  // };
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
              src={post.user_id.profileImage || PhotoProfile}
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
              src={post.user_id.profileImage || PhotoProfile}
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
                    src={post.user_id.profileImage || "default-image.png"}
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
              <button onClick={() => handleLike(postId, currentUserId)}>
                <img src={isLiked ? likeRed : like} alt="like" />
              </button>
              {/* <img src={like} alt="like" /> */}
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
