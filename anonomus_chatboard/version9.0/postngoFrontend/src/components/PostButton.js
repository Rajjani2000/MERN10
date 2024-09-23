import React from 'react';
import { createPost } from '../functions/http'; // Update the import

class PostButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      title: "",
      content: ""
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    // Create post using the provided function
    if (await createPost({
      title: this.state.title,
      content: this.state.content
    })) {
      // Reset form state after successful post creation
      this.setState({ showForm: false, title: "", content: "" });
    }
  }

  render() {
    return (
      <div className="button-containercard-body">
        <button className="btn btn-dark" onClick={() => this.setState({ showForm: !this.state.showForm })}>
          New Post
        </button>
        {this.state.showForm && (
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="title" className='form-label'>
              Title:
            </label>
            <input
              type="text"
              name="title"
              className='form-control'
              value={this.state.title}
              onChange={this.handleInputChange}
            />
  
            <label htmlFor="content" className='form-label'>
              Content:
            </label>
            <input
              type="text"
              name="content"
              className='form-control'
              value={this.state.content}
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