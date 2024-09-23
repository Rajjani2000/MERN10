import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  // set the flag values
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      localStorage.setItem("token", res.data.token);
      alert("Login successful");
      navigate('/displaybox');
      setErrorMessage(""); // Clear any previous error message
    } catch (error) {
      // Set the error message based on the response
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || "Invalid credentials");
      } else {
        setErrorMessage("An unexpected error occurred");
      }
      console.error(error.response.data);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default Login;
