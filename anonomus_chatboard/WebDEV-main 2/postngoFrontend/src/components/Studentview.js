import React from 'react';
import './StudentView.css'
import { DummyData } from "../tests/DummyData"
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
            posts: DummyData.posts
        };
    }

    async componentDidMount() {
        const posts = await getPosts();
        this.setState({ posts: posts });
    }

    handleLogout = () => {
		this.setState({ redirect: true });
	};

    render() {
        if(this.state.redirect)
		    return <Navigate to="/"/>;
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
                postId={post.postId}
                content={post.content}
                author={post.author}
                likes={post.likes}
            />
        ))}
        <PostButton className="post-button"/>
    
    </ol>
</div>

        )
    }
}