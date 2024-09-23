import React, { useEffect, useState } from "react";
import "./StudentView.css";
import { getPosts } from "../services/http";
import PostItem from "./PostItem";
import PostButton from "./PostButton";
import BackgroundImg from "../assets/img/bg.png";
import LogoutImg from "../assets/img/exit-man.png";
import { useLocation, useNavigate } from "react-router-dom";
const AdminPostView = () => {
  const search = useLocation();
  const [redirect, setRedirect] = useState(false);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("Logging out...");

    const token = localStorage.getItem("token");
    console.log("Token before logout:", token);

    localStorage.removeItem("token");

    const updatedToken = localStorage.getItem("token");
    console.log("Token after logout:", updatedToken);

    navigate("/adminlogin");
  };

  const fetcher = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setRedirect(true);
    }

    await getPosts({
      ...JSON.parse(localStorage.getItem("userInfo")),
      className: search.pathname.split("/").at(-1),
      createdBy: JSON.parse(localStorage.getItem("userInfo")).className,
      role: "user",
    }).then((response) => {
      setPosts(response || []);
    });
  };

  useEffect(() => {
    fetcher();
  }, []);
  return (
    <div className="main-page-container">
      <img className="background" alt="background" src={BackgroundImg}></img>
      <button className="logout-btn" onClick={handleLogout}>
        <img className="logout-icon" src={LogoutImg} alt="logout"></img>
        Logout
      </button>
      <ol className="post-list">
        {posts.map((post, index) => (
          <PostItem
            className="post-item"
            key={index}
            user={post.role}
            postId={post.postId}
            content={post.content}
            author={post.title}
            likes={post.likes}
          />
        ))}
        <PostButton
          className="post-button"
          cname={search.pathname.split("/").at(-1)}
        />
      </ol>
    </div>
  );
};

export default AdminPostView;
