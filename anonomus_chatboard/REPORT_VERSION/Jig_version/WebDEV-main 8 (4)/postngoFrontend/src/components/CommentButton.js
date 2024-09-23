import React from 'react';
import { addCommentToPost } from '../services/http';
import "./CommentButton.css"

class CommentButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			comments: props.comments,
			showForm: false,
			postId: props.postId,
			comment: ""
		};
	}


	componentDidMount() {
		this.setState({
			comments: this.props.comments,
			showForm: false,
			postId: this.props.postId,
			comment: ""
		});
	}

	handleInputChange = (event) => {
		const { name, value } = event.target;
		this.setState({ ...this.state, [name]: value });
	}

	handleSubmit = async (event) => {
		event.preventDefault();

		console.log(' this.state: ', this.state);
		const { postId } = this.state; // Get postId from props
		console.log('postId: ', postId);

		if (await addCommentToPost(postId, {
			// Include postId when calling addCommentToPost
			comment: this.state.comment
		})) {
			this.setState({ ...this.state, showForm: false, comment: "" });
		}
	}

	render() {
		return (
			<div className="button-container">
				{this.state.comments.map((data) => (
					<div>
						<p>
							{data.content ? data.content : ''}
						</p>
					</div>
				))}
				<form onSubmit={this.handleSubmit} className="comment-form">
					<input
						type="text"
						name="comment"
						placeholder="comment here..."
						className='form-control-comment'
						value={this.state.comment}
						onChange={this.handleInputChange}
					/>
					<button type="submit" className="submit-btn">
						Send
					</button>
				</form>
			</div>

		);
	}
}

export default CommentButton;


// how to pass in the comment button in all other codes if needed 

//<CommentButton postId={post.postId} />