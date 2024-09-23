import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import "./Adminlogin.css"; // Uncomment this line if you have a CSS file
import { loginUser } from "../services/http";
// Replace this with your actual getUser function import
// const { getUser } = require('../services/http');

class Adminlogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adminusername: "",
      adminpassword: "",
      flag: false,
      loginError: false,
      empty: false,
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };


  //   const { adminusername, adminpassword } = this.state;

  //   // Assuming getUser returns a boolean indicating success
  //   const isLoggedIn = await getUser(adminusername, adminpassword);

  //   if (isLoggedIn) {
  //     // Reset the form and hide it after successful login
  //     this.setState({
  //       adminusername: "",
  //       adminpassword: "",
  //       flag: true,
  //       loginError: false,
  //       empty: false,

  //     });
  //     console.log("Adminlogin successful!");
  //   }
  //   else if(!adminpassword || !adminusername)
  //   {
  //     this.setState({empty: true, loginError: false});
  //     console.log("Please enter all fields")

  //   }

  //   else {
  //      this.setState({ loginError: true, empty: false });

  //   }
  // };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { adminusername, adminpassword } = this.state;

    const loginResponse = await loginUser({
      username: adminusername,
      password: adminpassword,
    });

    if (loginResponse && loginResponse.token) {
      console.log("Received token:", loginResponse.token);
      localStorage.setItem("token", loginResponse.token);

      setTimeout(() => {
        // Reset the form and hide it after successful login
        this.setState({
          adminusername: "",
          adminpassword: "",
          flag: true,
          loginError: false,
          empty: false,
        });

        console.log("Admin login successful!");
      }, 100);
    } else if (!adminusername || !adminpassword) {
      this.setState({ empty: true, loginError: false });
      console.log("Please enter all fields");
    } else {
      this.setState({ loginError: true, empty: false });
      console.log("Admin login failed. Incorrect username or password.");
    }
  };

  render() {
    const { adminusername, adminpassword, loginError, empty } = this.state;

    return (
      <>
        {this.state.flag && <Navigate to="/StudentView" replace={true} />}
        <div className="login-page-container">
          <div className="login-container">
            <h1 style={{ fontSize: 30 }} className="login-container-title">
              Admin Login
            </h1>

            <div>
              <form className="login-form-container">
                <label className="login-form-item login-form-label">
                  {" "}
                  Admin Username:{" "}
                </label>
                <input
                  className="login-form-item login-form-input"
                  type="text"
                  name="adminusername"
                  value={adminusername}
                  onChange={this.handleInputChange}
                />
                <label className="login-form-item login-form-label">
                  {" "}
                  Admin Password:
                </label>
                <input
                  className="login-form-item login-form-input"
                  type="password"
                  name="adminpassword"
                  value={adminpassword}
                  onChange={this.handleInputChange}
                />
                <button className="btn btn-danger" onClick={this.handleSubmit}>
                  Submit
                </button>
                {/* Display login error message if loginError is true */}
                {loginError && (
                  <p style={{ color: "red" }}>
                    Incorrect username or password. Please try again.
                  </p>
                )}
                {empty && (
                  <p style={{ color: "red" }}>
                    Please Enter admin Username/Password
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

export default Adminlogin;
