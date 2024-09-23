import React from 'react';
import './StudentView.css'
import { getPosts } from "../services/http"
import PostItem from "./PostItem"
import PostButton from "./PostButton"
import BackgroundImg from "../assets/img/bg.png"
import LogoutImg from "../assets/img/exit-man.png"
import { Navigate } from 'react-router-dom';

export default class StudentView extends React.Component {
    constructor(props) {
        super();
        this.state = {
            redirect: false,
            posts: []
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
        const posts = await getPosts();
        console.log('posts: ', posts);
        setTimeout(() => {
            this.setState({ posts: posts });
        }, 100)
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
        if (this.state.redirect)
            return <Navigate to="/" />;
        else
            return (

                <div className="main-page-container">
                    <img className="background" alt="background" src={BackgroundImg}></img>
                    <button className="logout-btn" onClick={this.handleLogout}>
                        <img className="logout-icon" src={LogoutImg} alt="logout"></img>
                        Logout
                    </button>
                    <ol className="post-list">
                        {this.state.posts.map((post, index) => (
                            <PostItem className="post-item"
                                key={index}
                                comments={post.comments}
                                reports={post.reports}
                                postId={post._id}
                                content={post.content}
                                author={post.author}
                                likes={post.likes}
                            />
                        ))}
                        <PostButton className="post-button" />

                    </ol>
                </div>

            )
    }
}