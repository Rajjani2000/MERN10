import React, { useState } from "react";
import "./PostButton.css";
import { createPost } from "../services/http";
import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";

const PostButton = (props) => {
  const initialPostState = {
    title: "",
    content: "",
  };
  const search = useLocation();

  const [post, setPost] = useState(initialPostState);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form fields
    if (!post.title || !post.content) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      // Check if the user is logged in (token available)
      const token = localStorage.getItem("token");

      if (!token) {
        // Handle case where the user is not logged in
        setError("User is not logged in. Please log in to create a post.");
        return;
      }

      // Decode the token to get user information
      const decodedToken = jwtDecode(token);

      const createdPost = await createPost({
        ...post,
        createdBy: decodedToken.userId,
        userInfo: JSON.parse(localStorage.getItem("userInfo")),
        cname: props.cname,
      });

      if (createdPost) {
        // Reset form state and clear any errors
        setPost(initialPostState);
        console.log("Post created successfully:", createdPost, decodedToken);
        window.location.reload();
      }
    } catch (error) {
      console.error("button error:", error.message);
      setError("Failed to create post. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          value={post.title}
          onChange={handleInputChange}
          placeholder="Enter the title"
        />

        <label htmlFor="content">Content:</label>
        <textarea
          name="content"
          value={post.content}
          onChange={handleInputChange}
          placeholder="Enter the content"
        />

        <button type="submit">Create Post</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default PostButton;
