import React from "react";
import PropTypes from "prop-types";
import "./PostItem.css";
import CommentButton from "./CommentButton";
import ReportButton from "./ReportButton";

export default class PostItem extends React.Component {
  static propTypes = {
    user: PropTypes.string,
    postId: PropTypes.string,
    content: PropTypes.string,
    author: PropTypes.string,
    likes: PropTypes.number,
  };

  constructor() {
    super();
    this.state = {
      hovered: false,
      showComment: false,
      showReport: false,
    };
  }

  render() {
    return (
      <div
        className="post-item-container"
        onMouseEnter={() => this.setState({ hovered: true })}
        onMouseLeave={() => this.setState({ hovered: false })}
      >
        <div className="post-item-content">{this.props.user}</div>
        <div className="post-item-content">{this.props.content}</div>
        <div className="post-item-footer">
          <div className="post-item-author-container">
            <label> {this.props.author} </label>
          </div>
          <div className="post-item-action-container">
            {this.state.hovered || this.state.showComment ? (
              <button
                className="comment-btn"
                onClick={() =>
                  this.setState({
                    showComment: !this.state.showComment,
                    showReport: false,
                  })
                }
              >
                {"Comment"}
              </button>
            ) : null}
            {this.state.hovered || this.state.showReport ? (
              <button
                className="comment-btn"
                onClick={() =>
                  this.setState({
                    showReport: !this.state.showReport,
                    showComment: false,
                  })
                }
              >
                {"Report"}
              </button>
            ) : null}
            <label className="comment-btn" style={{ marginRight: 0 }}>
              {" "}
              {"Likes  " + this.props.likes}{" "}
            </label>
          </div>
        </div>
        {this.state.showComment ? (
          <div className="comment-container">
            <CommentButton></CommentButton>
          </div>
        ) : null}
        {this.state.showReport ? (
          <div className="comment-container">
            <ReportButton></ReportButton>
          </div>
        ) : null}
      </div>
    );
  }
}
