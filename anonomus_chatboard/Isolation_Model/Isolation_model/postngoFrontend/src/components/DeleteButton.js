import React from 'react';
import { deletePost } from '../services/http'; // Update the import

class DeleteButton extends React.Component{
    constructor(props){
        super(props);
        this.state={
           showForm: false,
           title:"",
           content:"",
           comments:"",
           reports:"",
           commentCount: "",
           reportCount: ""
        };
    }

    handleInputChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]:value});
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        if(await deletePost({
           
        }))
        this.setState({showForm: false, title:"", content:"", 
            comments:"", reports:"", commentCount: "", reportCount:""});
    }

    render() {
        return (
          <div className="button-container card-body">
            <button className="btn btn-dark" onClick={() => this.setState({ showForm: !this.state.showForm })}>
              Delete Post
            </button>
            {this.state.showForm && (
              <form onSubmit={this.handleDelete}>
                
                
                <label htmlFor='title' className='form-label'>title:</label>
                <input
                  type="title"
                  name="string"
                  className='form-control'
                  value={this.state.title}
                  onChange={this.handleInputChange}
                
                />
                <label htmlFor='content' className='form-label'>content:</label>
                <input
                  type="text"
                  name="content"
                  className='form-control'
                  value={this.state.content}
                  onChange={this.handleInputChange} 
                
                />
                <label htmlFor='lab' className='form-label'>Lab (true/false):</label>
                <input
                  type="text"
                  name="lab"
                  className='form-control'
                  value={this.state.lab}
                  onChange={this.handleInputChange}
             
                />
                {this.state.showForm && (
                  <button className='btn btn-danger' onClick={this.handleDelete}>Confirm Delete</button>
                )}
              </form>
            )}
          </div>
        );

                }
}

export default DeleteButton
