import styles from "./likePost.module.css";
import { useState } from "react";
import API from "../../utils/app/js";

function LikePost({ postId }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const handleLike = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.log("Please log in to like the post ");
        return;
      }
      const response = await API.post(`/api/likes/${postId}/like/${userId}`);
      if (response.status === 201) {
        setLiked(true);
        setLikesCount(likesCount + 1);
      }
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };
  return (
    <div>
      <button onClick={handleLike} disabled={liked}>
        {liked ? "Liked" : "Like"}
      </button>
      <span>{likesCount} Likes</span>
    </div>
  );
}

export default LikePost;
