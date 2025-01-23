import styles from "./postActions.module.css";
import API from "../../utils/app.js";
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

function PostActions({ onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const { postId } = useParams();
  const id = useSelector((state) => state.user.userId);
  // const userId = useSelector();
  console.log("PostId UserId", id);
  const navigate = useNavigate();

  const handlePostDelete = () => {
    setIsLoading(true);
    API.delete(`/post/${postId}`)
      .then((response) => {
        console.log("Post was succesfully delete", response.data);
        navigate(`/users/${id}`);
      })
      .catch((error) => {
        console.log("Ошибка при удалении поста: ", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div onClick={onClose} className={styles.modalContainer}>
      <div onClick={(e) => e.stopPropagation()}>
        <ul className={styles.listModalContainer}>
          <li className={styles.list}>
            <button
              className={styles.buttonList}
              onClick={() => {
                console.log("Delete");
                onClose();
                handlePostDelete();
              }}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </button>
          </li>
          <li>
            <button
              className={styles.buttonList}
              onClick={() => {
                console.log("Edit");
                onClose();
              }}
            >
              Edit
            </button>
          </li>
          <li>
            <button
              className={styles.buttonList}
              onClick={() => {
                console.log("Go to post");
                onClose();
              }}
            >
              Go to post
            </button>
          </li>
          <li>
            <button
              className={styles.buttonList}
              onClick={() => {
                console.log("Copy link");
                onClose();
              }}
            >
              Copy link
            </button>
          </li>
          <li>
            <Link to={`/users/${id}`}>
              <button
                className={styles.buttonList}
                onClick={() => {
                  console.log("Cancel");
                  onClose();
                }}
              >
                Cancel
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default PostActions;
