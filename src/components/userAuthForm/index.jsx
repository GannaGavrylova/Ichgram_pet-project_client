import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "antd";
import styles from "./styles.module.css";
import header from "../../assets/header.svg";
import axios from "axios";

function UserAuthForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log("Form Submitted: ", data);
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        data
      );
      if (response.status === 200) {
        alert(`Welcome, ${response.data.user}!`);
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        console.error("Error: Login", error);
        alert("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <>
      <div className={styles.containerLogForm}>
        <header>
          <img src={header} alt="header" />
        </header>
        <form className={styles.inputsForm} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              className={styles.input}
              type="text"
              placeholder="Username, or email"
              {...register("usernameOrEmail", {
                required: "Username or Email is required",
                // pattern: {
                //   value: /^[^@]+@[^@]+\.[^@]+|^[a-zA-Z0-9_]{3,}$/,
                //   message: "Invalid username or email format",
                // },
              })}
            />
            {errors.usernameOrEmail && (
              <p className={styles.error}>{errors.usernameOrEmail.message}</p>
            )}
          </div>

          <div>
            <input
              className={styles.input}
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}
          </div>

          <Button type="primary">Log in</Button>
        </form>

        <div className={styles.or}>
          <hr />
          <h3>OR</h3>
          <hr />
        </div>
        <div className={styles.forgotPassword}>
          <a>
            <p>Forgot password?</p>
          </a>
        </div>
      </div>

      <div className={styles.signUp}>
        <h3>
          Don't have an account? <a>Sign up</a>
        </h3>
      </div>
    </>
  );
}

export default UserAuthForm;
