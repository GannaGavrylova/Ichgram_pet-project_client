import NavMenu from "../navMenu";
import styles from "./editProfile.module.css";
import profile from "../../assets/profile.svg";
import { Button } from "antd";
import { useEffect, useState } from "react";
import API from "../../utils/app.js";
import { useSelector } from "react-redux";

function EditProfile() {
  const id = useSelector((state) => state.user.userId);
  console.log(id);
  const [userData, setUserData] = useState(null);
  // const [updeteUserData, setUpdeteUserData] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    bio: "",
    profileImage: null,
  });

  useEffect(() => {
    // Получение данных пользователя
    API.get(`/users/${id}`)
      .then((response) => {
        if (
          response.data &&
          response.data.data &&
          response.data.data.length > 0
        ) {
          setUserData(response.data[0]);
        }
      })
      .catch((error) => {
        console.error("Ошибка при загрузке данных пользователя:", error);
      });
  }, [id]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      formDataToSend.append("bio", formData.bio);
      if (formData.profileImage) {
        formDataToSend.append("profileImage", formData.profileImage);
      }
      // Изменение данных пользователя
      const response = await API.put(`/users/${id}/profile`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Ptofile updated successfully: ", response.data);
      setUpdeteUserData(response.data);
    } catch (error) {
      console.error("Error updating profile: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      profileImage: e.target.files[0],
    }));
  };
  return (
    <div className={styles.mainContainer}>
      <div>
        <NavMenu />
      </div>
      <div className={styles.profileContainer}>
        <h1>Edit profile</h1>

        <div className={styles.profile}>
          <div className={styles.fileInputContainer}>
            <label htmlFor="file-input" className={styles.fileLabel}>
              <img
                src={userData?.profileImage || profile}
                alt="profile"
                className={styles.profileImage}
              />
              <input
                type="file"
                id="file-input"
                className={styles.fileInput}
                onChange={handleFileChange}
              />
            </label>
          </div>

          <div className={styles.name}>
            <h4>{userData?.username}</h4>
            <ul>
              <li> {userData?.bio}</li>
            </ul>
          </div>
          <Button className={styles.button} type="default">
            New photo
          </Button>
        </div>
        <form className={styles.formEdit} onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            placeholder={userData?.username}
            onChange={handleChange}
          />

          <label>Website</label>
          <input
            type="url"
            name="website"
            placeholder="bit.ly/3rpiIbh"
            onChange={handleChange}
          />

          <label>About</label>
          <textarea
            name="bio"
            value={formData.bio}
            placeholder={userData?.bio}
            rows="4"
            cols="50"
            onChange={handleChange}
          />

          <Button
            className={styles.formButton}
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
