import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "antd";
import axios from "axios";

const URL = "http://localhost:3000/auth/register";
function UserFormRegister() {
  //   const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm();

  const [formData, setFormData] = useState({
    email: "",
    fullname: "",
    username: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  async function registerUser(event) {
    event.preventDefault();
    try {
      const response = await axios.post(URL, formData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("User successfully registered", response.data);
    } catch (error) {
      console.error("Error registered user", error);
    }
  }
  return (
    <div>
      <form onSubmit={registerUser}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={formData.fullname}
          onChange={handleChange}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <div>
          <p>
            People who use service may have uploaded your contact information to
            Instagram. <a href="#">Learn More</a>
          </p>
          <p>
            By signing up, you agree to our{" "}
            <a href="#">Terms, Privacy Policy</a> and{" "}
            <a href="#">Cookies Policy</a>
          </p>
        </div>
        <Button type="primary" htmlType="submit">
          Sign up
        </Button>
      </form>
    </div>
  );
}

export default UserFormRegister;
