import styles from "./createPost.module.css";
import React, { useState, useRef } from "react";
import API from "../../utils/app";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import added from "../../assets/added.svg";

function CreatePost({ onClose }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const id = useSelector((state) => state.user.userId);
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    images: null,
    caption: "",
  });

  const fileInputRef = useRef(null);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPostData({ images: null, caption: "" });
    console.log("PostData", postData);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostData((prev) => ({ ...prev, images: file }));
      console.log("Image uploaded successfully");
    }
  };

  const handleDescriptionChange = (e) => {
    setPostData((prev) => ({ ...prev, caption: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!postData.images || !postData.caption) {
      console.log("Please fill in all fields!");
      return;
    }

    try {
      const newPost = new FormData();

      newPost.append("images", postData.images);

      newPost.append("caption", postData.caption);

      for (let pair of newPost.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      const response = await API.post("/post", newPost, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Create new Post", response.data, newPost);

      handleCloseModal();
      setTimeout(() => {
        onClose();
      }, 5000);
    } catch (error) {
      console.error("Error with create post", error);
    }
  };

  return (
    <>
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h3>Create new post</h3>
          </div>
          <form className={styles.modalForm} onSubmit={handleSubmit}>
            <div className={styles.fileInputContainer}>
              <button type="submit">Share</button>
              <label htmlFor="file-input" className={styles.fileLabel}>
                <img
                  src={added}
                  alt="addedImage"
                  className={styles.addedImage}
                />
                <input
                  type="file"
                  id="file-input"
                  className={styles.fileInput}
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <div className={styles.textAreaContainer}>
              <textarea
                placeholder="Write a discription post..."
                rows={4}
                value={postData.caption}
                onChange={handleDescriptionChange}
                className={styles.textArea}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
