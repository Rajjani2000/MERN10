import React from "react";
import "./StudentView.css";

import { DummyData } from "../tests/DummyData";
import { getPosts } from "../services/http";
import PostItem from "./PostItem";
import PostButton from "./PostButton";
import BackgroundImg from "../assets/img/bg.png";
import LogoutImg from "../assets/img/exit-man.png";
import { Navigate } from "react-router-dom";
import { Link, Redirect } from "react-router-dom"; // Import Link and Redirect

export default class StudentView extends React.Component {
  constructor(props) {
    super();
    this.state = {
      redirect: false,
      posts: DummyData.posts,
    };
  }

  async componentDidMount() {
    await this.fetchPosts();

    this.refreshInterval = setInterval(() => {
      this.fetchPosts();
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  async fetchPosts() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.setState({ redirect: true });
    }
    const posts = await getPosts(JSON.parse(localStorage.getItem("userInfo")));
    this.setState({ posts: posts || [] });
  }

  handleLogout = () => {
    console.log("Logging out...");

    const token = localStorage.getItem("token");
    console.log("Token before logout:", token);

    localStorage.removeItem("token");

    const updatedToken = localStorage.getItem("token");
    console.log("Token after logout:", updatedToken);

    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) return <Navigate to="/" />;
    else if (JSON.parse(localStorage.getItem("userInfo")).role === "admin") {
      return (
        <div className="main-page-container">
          <img
            className="background"
            alt="background"
            src={BackgroundImg}
          ></img>
          <button className="logout-btn" onClick={this.handleLogout}>
            <img className="logout-icon" src={LogoutImg} alt="logout"></img>
            Logout
          </button>
          <ol className="post-list">
            {this.state.posts.map((post, index) => {
              return (
                <Link
                  to={`/AdminView/${post.classname}`} // Navigate to a dynamic post detail route
                  className="post-item-container"
                  key={index}
                >
                  <div className="post-item">
                    <div className="post-item-content">{post.classname}</div>
                  </div>
                </Link>
              );
            })}
          </ol>
        </div>
      );
    } else
      return (
        <div className="main-page-container">
          <img
            className="background"
            alt="background"
            src={BackgroundImg}
          ></img>
          <button className="logout-btn" onClick={this.handleLogout}>
            <img className="logout-icon" src={LogoutImg} alt="logout"></img>
            Logout
          </button>
          <ol className="post-list">
            {this.state.posts.map((post, index) => (
              <PostItem
                className="post-item"
                key={index}
                postId={post.postId}
                content={post.content}
                author={post.title}
                likes={post.likes}
                role={post.role}
              />
            ))}
            <PostButton
              className="post-button"
              cname={JSON.parse(localStorage.getItem("userInfo")).className}
            />
          </ol>
        </div>
      );
  }
}
