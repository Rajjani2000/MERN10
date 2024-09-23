import React from "react";
import './PostItem.css'
import CommentButton from './CommentButton';
import ReportButton from './ReportButton';

export default class PostItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            postId: this.props.postId,
            comments: this.props.comments,
            reports: this.props.reports,
            hovered: false,
            showComment: false,
            showReport: false
        };
    }

    componentDidMount() {
        this.state = {
            postId: this.props.postId,
            comments: this.props.comments,
            reports: this.props.reports,
            hovered: false,
            showComment: false,
            showReport: false
        };
        console.log('this.state: ', this.state);
    }

    render() {
        return (
            <div className="post-item-container"
                onMouseEnter={() => this.setState({ ...this.state, hovered: true })}
                onMouseLeave={() => this.setState({ ...this.state, hovered: false })}
            >
                <div className="post-item-content">
                    {this.props.content}
                </div>
                <div className="post-item-footer">
                    <div className="post-item-author-container">
                        <label> {this.props.author} </label>
                    </div>
                    <div className="post-item-action-container">
                        {this.state.hovered || this.state.showComment ?
                            <button className="comment-btn"
                                onClick={() => this.setState({ ...this.state, showComment: !this.state.showComment, showReport: false })}>
                                {"Comment"}
                            </button> : null
                        }
                        {this.state.hovered || this.state.showReport ?
                            <button className="comment-btn"
                                onClick={() => this.setState({ ...this.state, showReport: !this.state.showReport, showComment: false })}>
                                {"Report"}
                            </button> : null
                        }
                        <label className="comment-btn" style={{ marginRight: 0 }}> {"Likes  " + this.props.likes} </label>
                    </div>
                </div>
                {this.state.showComment ? (
                    <div>
                        <div className="comment-container">
                            <CommentButton postId={this.state.postId} comments={this.state.comments}></CommentButton>
                        </div>
                    </div>) : null
                }
                {
                    this.state.showReport ?
                        <div className="comment-container">
                            <ReportButton postId={this.state.postId} reports={this.state.reports}></ReportButton>
                        </div> : null
                }
            </div >

        )
    }
}