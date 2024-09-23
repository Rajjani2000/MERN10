import React from 'react';
import './PostButton.css';
import { createPost } from '../services/http'; // Update the import

class PostButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      title: '',
      content: '',
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    // Check if the user is logged in (token available)
    const token = localStorage.getItem('token');

    if (!token) {
      // Handle case where user is not logged in
      console.log('User is not logged in. Redirect to login page or show an alert.');
      return;
    }

    // Decode the token to get user information
    const decodedToken = JSON.parse(atob(token.split('.')[1]));

    // Create post using the provided function and user information
    if (await createPost({
      title: this.state.title,
      content: this.state.content,
      createdBy: decodedToken.username, // Use the user ID from the token
    })) {
      // Reset form state after successful post creation
      this.setState({ showForm: false, title: '', content: '' });
    }
  };

  render() {
    const { showForm, title, content } = this.state;

    return (
      <div className="button-container card-body">
        <button className="btn btn-dark" onClick={() => this.setState({ showForm: !showForm })}>
          New Post
        </button>
        {showForm && (
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="title" className="form-label">
              Title:
            </label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={title}
              onChange={this.handleInputChange}
            />

            <label htmlFor="content" className="form-label">
              Content:
            </label>
            <input
              type="text"
              name="content"
              className="form-control"
              value={content}
              onChange={this.handleInputChange}
            />

            <button type="submit" className="btn btn-primary mt-2">
              Create Post
            </button>
          </form>
        )}
      </div>
    );
  }
}

export default PostButton;
