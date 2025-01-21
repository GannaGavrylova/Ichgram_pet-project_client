import NavMenu from "../navMenu";
import styles from "./editProfile.module.css";
import profile from "../../assets/profile.svg";
import { Button } from "antd";
import { useEffect, useRef, useState } from "react";
import API from "../../utils/app.js";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const id = useSelector((state) => state.user.userId);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userData, setUserData] = useState(null);
  const [saved, setSaved] = useState(null);
  const { register, handleSubmit } = useForm();
  const [formData, setFormData] = useState({ profileImage: null });
  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  useEffect(() => {
    // Получение данных пользователя
    API.get(`/users/${id}`)
      .then((response) => {
        if (response.data && response.data.data) {
          setUserData(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Ошибка при загрузке данных пользователя:", error);
      });
  }, [id]);

  const onSubmit = async (data) => {
    console.log("Form submitted", data);

    setIsSubmitting(true);
    setSaved(false);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("username", data.username);
      formDataToSend.append("bio", data.bio);
      if (formData.profileImage) {
        formDataToSend.append("profileImage", formData.profileImage);
      }
      // Изменение данных пользователя
      const response = await API.put(`/users/${id}/profile`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Ptofile updated successfully: ", response.data);
      //Устанавливаем состояние кнопки в "Saved" после успешного обновления
      setSaved(true);
      // Перенаправляем на страницу профиля с задержкой
      setTimeout(() => {
        navigate(`/users/${id}`);
      }, 5000);
    } catch (error) {
      console.error("Error updating profile: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  // открытие диалог. для выбора файла
  const handleNewPhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      profileImage: file,
    }));
    console.log(file);
    // const objectUrl = URL.createObjectURL(file);
    // setUserData((prev) => ({
    //   ...prev,
    //   profileImage: objectUrl,
    // }));
    // console.log("Imag URL: ", userData?.profileImage);
    // console.log("Selected file: ", formData.profileImage);
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

          <Button
            className={styles.button}
            type="default"
            onClick={handleNewPhotoClick}
          >
            New photo
          </Button>
        </div>
        <form className={styles.formEdit} onSubmit={handleSubmit(onSubmit)}>
          <label>Username</label>
          <input
            {...register("username")}
            type="text"
            placeholder={userData?.username}
          />

          <label>Website</label>
          <input
            {...register("website")}
            type="url"
            placeholder="bit.ly/3rpiIbh"
          />

          <label>About</label>
          <textarea
            {...register("bio")}
            placeholder={userData?.bio}
            rows="4"
            cols="50"
          />

          <Button
            className={styles.formButton}
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
          >
            {isSubmitting ? "Saving..." : saved ? "Saved" : "Save"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;

// КОД для управления данными инпут-файл через хук useForm
// import { useForm, Controller } from 'react-hook-form';

// const EditProfile = () => {
//   const { control, handleSubmit, register, setValue } = useForm();

//   const handleFileChange = (e) => {
//     // Устанавливаем файл в форму
//     setValue('profileImage', e.target.files[0]);
//   };

//   const onSubmit = async (data) => {
//     console.log('Form submitted', data);
//     // Логика для отправки данных, например, через API
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <label>Profile Image</label>
//       <Controller
//         name="profileImage"
//         control={control}
//         render={({ field }) => (
//           <input
//             type="file"
//             {...field}
//             onChange={(e) => {
//               field.onChange(e); // Устанавливаем значение через контроллер
//               handleFileChange(e); // Вызываем функцию для обработки файла
//             }}
//           />
//         )}
//       />

//       <Button type="primary" htmlType="submit">
//         Save
//       </Button>
//     </form>
//   );
// };
