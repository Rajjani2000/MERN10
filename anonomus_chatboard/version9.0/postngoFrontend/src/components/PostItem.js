import React from "react";
import PropTypes from "prop-types";
import './PostItem.css'

export default class PostItem extends React.Component {
    static propTypes = {
        postId: PropTypes.string,
        content: PropTypes.string,
        author: PropTypes.string,
        likes: PropTypes.number,
    };

    constructor() { 
        super(); 
        this.state = {
            hovered: ""
        };
    }

    render() { return (

<div className="post-item-container">
    <div className="post-item-content">
        {this.props.content}
    </div>
    <div className="post-item-footer">
        <div className="post-item-author-container">
            <label> {this.props.author} </label>
        </div>
        <div className="post-item-action-container">
            <button className="comment-btn"> {"Comment"} </button>
            <label className="comment-btn"> {"Likes  " + this.props.likes} </label>
        </div>
    </div>
</div>

    ) }
}