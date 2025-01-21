import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "antd";
import styles from "./styles.module.css";
import header from "../../assets/header.svg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import API from "../../utils/app";

function UserLoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      console.log("Form Submitted: ", data);
      const response = await API.post("/auth/login", data).then((response) => {
        const token = response.data.token;
        if (token) {
          localStorage.setItem("token", token);
          console.log("Token saved", token);
          setTimeout(() => {
            navigate(`/home`);
          }, 5000);
        } else {
          console.error("Token is missing in the response");
        }
      });
      // console.log("UserData: data ", data);
      // if (response.status === 200) {
      //   alert(`Welcome, ${response.data.username}!`);
      // }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        console.error("Error: Login", error.response);
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
          {/* <Link to={"/home"}> */}
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
          {/* </Link> */}
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
          Don't have an account?{" "}
          <Link to={"/auth/register"} style={{ color: "blue" }}>
            Sign up
          </Link>
        </h3>
      </div>
    </>
  );
}

export default UserLoginForm;
