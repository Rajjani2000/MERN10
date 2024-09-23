import React from 'react';
import PostButton from './PostButton'; // Update the import path if needed
import { Navigate } from 'react-router-dom';
class StudentView extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      redirect: false,
    };

  };
  handleLogout = () => {
    this.setState({redirect: true});
  };
  render() {
    if(this.state.redirect)
    {
      return <Navigate to="/"/>;
    }
    
    return (
      <div className="student-view-container">
  
        {/* Render the PostButton component */}
        <PostButton />

        {/* Logout button */}
        <button onClick={this.handleLogout}>Logout</button>


        {/* Add other content specific to the student view */}
        <div className="student-content">
          {/* Your student view content goes here */}
        </div>
      </div>
    );
  }
}

export default StudentView;


