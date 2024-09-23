import React from "react";
import "./CommentButton.css";
import { reportPost } from "../services/http"; // Update the import

class ReportButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      error: false,
      reportContent: "",
    };
  }
    


  
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();


    const report_post = await reportPost({
      reportContent: this.state.reportContent,
    });
    
    if(report_post)
   {
      this.setState({ showForm: false, reportContent: "" });
    }
  };

  render() {
    return (
      <div className="button-container">
        <form onSubmit={this.handleSubmit} className="comment-form">
          <input
            type="text"
            name="reportContent"
            placeholder="report reason..."
            className="form-control-comment"
            value={this.state.reportContent}
            onChange={this.handleInputChange}
            style={{ border: "2px solid var(--accent-color-red)" }}
          />
          <button
            type="submit"
            className="submit-btn"
            style={{ color: "var(--accent-color-red)", fontWeight: "700" }}
          >
            Report
          </button>
        </form>
      
      </div>
    );
  }
}

export default ReportButton;
