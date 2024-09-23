import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import './Adminlogin.css';
import { loginUser } from "../services/http";

class Studentlogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classroomname: "",
      classroompassword: "",
      flag: false,
      loginError: false,
      empty: false,
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
  
    const { classroomname, classroompassword } = this.state;
  
    // Call loginUser function for login
    const loginResponse = await loginUser({ username: classroomname, password: classroompassword });
  
    if (loginResponse && loginResponse.token) {
      console.log("Received token:", loginResponse.token);
      localStorage.setItem('token', loginResponse.token);
  
      // Delay to ensure the token is stored before retrieval
      setTimeout(() => {
        // Reset the form and hide it after successful login
        this.setState({
          classroomname: "",
          classroompassword: "",
          flag: true,
          loginError: false,
          empty: false,
        });
  
        console.log("Classroom login successful!");
      }, 100); // You can adjust the delay time as needed
    } else if (!classroomname || !classroompassword) {
      this.setState({ empty: true, loginError: false });
      console.log("Please enter all fields");
    } else {
      this.setState({ loginError: true, empty: false });
      console.log("Classroom login failed. Incorrect username or password.");
    }
  };

  render() {
    const { classroomname, classroompassword, loginError, empty } = this.state;

    return (
      <>
        {this.state.flag && <Navigate to="./Studentview" replace={true} />}
        <div className="login-page-container">
          <div className="additional-links">
            <a href="./Adminlogin">
              <button className="admin-login-btn" type="submit">
                Admin Login
              </button>
            </a>
            <a href="./NewAccount">
              <button className="accback-btn" type="submit">
                New Account
              </button>
            </a>
          </div>
          <div className="login-container">
            <h1 style={{ fontSize: 30 }} className="login-container-title">
              Classroom Login
            </h1>
            <div>
              <form
                className="login-form-container"
                onSubmit={this.handleSubmit}
              >
                <label className="login-form-item login-form-label">
                  Classroom Username:
                </label>
                <input
                  className="login-form-item login-form-input"
                  type="text"
                  name="classroomname"
                  value={classroomname}
                  onChange={this.handleInputChange}
                />
                <label className="login-form-item login-form-label">
                  Classroom Password:
                </label>
                <input
                  className="login-form-item login-form-input"
                  type="password"
                  name="classroompassword"
                  value={classroompassword}
                  onChange={this.handleInputChange}
                />
                <button className="btn btn-danger" type="submit">
                  Submit
                </button>
                {loginError && (
                  <p style={{ color: "red" }}>
                    Incorrect username or password. Please try again.
                  </p>
                )}
                {empty && (
                  <p style={{ color: "red" }}>
                    Please Enter Classroom Username/Password
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Studentlogin;
