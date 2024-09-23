import React from 'react';
import { addCommentToPost } from '../services/http';
import "./CommentButton.css"

class CommentButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showForm: false,
			comment: ""
		};
	}

	handleInputChange = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	}

	handleSubmit = async (event) => {
		event.preventDefault();

		const { postId } = this.props; // Get postId from props

		if (await addCommentToPost({
			postId, // Include postId when calling addCommentToPost
			comment: this.state.comment
		})) {
			this.setState({ showForm: false, comment: "" });
		}
	}

	render() {
		return (

<div className="button-container">
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

	);}
}

export default CommentButton;


// how to pass in the comment button in all other codes if needed 

//<CommentButton postId={post.postId} />