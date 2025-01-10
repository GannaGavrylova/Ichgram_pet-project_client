import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button } from "antd";
import axios from "axios";
import styles from "./userFormRegister.module.css";
import header from "../../assets/header.svg";

const URL = "http://localhost:3000/auth/register";
function UserFormRegister() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(URL, data, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("User successfully registered", response.data);
      reset();
    } catch (error) {
      if (
        error.response &&
        error.response.data.message === "User with this name already exists"
      ) {
        setError("username", {
          type: "manual",
          message: error.response.data.message,
        });
      } else {
        console.error("Error registering user", error);
      }
    }
  };

  return (
    <>
      <div className={styles.userRegisterContainer}>
        <header className={styles.header}>
          <img src={header} alt="header" />
          <h3 className={styles.headerTitle}>
            Sign up to see photos and videos from your friends.
          </h3>
        </header>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.formContainer}
        >
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <p style={{ color: "red" }}>{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Full Name"
              {...register("fullname", {
                required: "Full Name is required",
                minLength: {
                  value: 2,
                  message: "Full Name must be at least 2 characters",
                },
              })}
            />
            {errors.fullname && (
              <p style={{ color: "red" }}>{errors.fullname.message}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="Username"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              })}
            />
            {errors.username && (
              <p style={{ color: "red" }}>{errors.username.message}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 3,
                  message: "Password must be at least 3 characters",
                },
              })}
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password.message}</p>
            )}
          </div>

          <div className={styles.cookie}>
            <p>
              People who use service may have uploaded your contact information
              to Instagram. <a href="#">Learn More</a>
            </p>
            <p>
              By signing up, you agree to our
              <a href="#"> Terms, Privacy Policy </a> and
              <a href="#"> Cookies Policy</a>
            </p>
          </div>
          <Button
            type="primary"
            htmlType="submit"
            block
            style={{ maxWidth: "75%", marginBottom: "30px" }}
          >
            Sign up
          </Button>
        </form>
      </div>
      <div className={styles.questionContainer}>
        <h3 className={styles.question}>
          Have an account?{" "}
          <Link to={"/auth/login"} style={{ color: "blue" }}>
            Log in
          </Link>
        </h3>
      </div>
    </>
  );
}

export default UserFormRegister;
