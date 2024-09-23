import React from "react";
import { Navigate } from "react-router-dom";

class LogoutButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  handleLogout = () => {
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to="/" />;
    }

    return (
      <button className="btn btn-primary mt-2" onClick={this.handleLogout}>
        Logout
      </button>
    );
  }
}

export default LogoutButton;
