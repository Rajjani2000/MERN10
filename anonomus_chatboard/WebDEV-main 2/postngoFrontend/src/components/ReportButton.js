import React from 'react';
import './CommentButton.css';
import { reportPost } from '../services/http'; // Update the import

class ReportButton extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showForm: false,
            reportCounter: "",
            reportContent: ""
        };
    }

    handleInputChange = (event) => {
        //const {title, value} = event.target;
        //const {body, value} = event.target;

        const {reportContent, value} = event.target;
        this.setState({[reportContent]: value});
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        if(await reportPost({
            reportCounter:this.state.reportCounter
            //reportContent: this.state.reportContent
        }))
        this.setState({showForm: false, reportCounter:""});
    }

    render(){
        return(
<div className="button-container">
	<form onSubmit={this.handleSubmit} className="comment-form">
		<input
			type="text"
			name="report"
			placeholder="report reason..."
			className='form-control-comment'
			value={this.state.reportContent}
            onChange={this.handleInputChange}
            style={{border: "2px solid var(--accent-color-red)"}}
		/>
		<button type="submit" className="submit-btn" 
            style={{color: "var(--accent-color-red)", fontWeight: "700"}} 
            onClick={this.handleSubmit}>
			Report
		</button>
	</form>
</div>

        )
    }
}
export default ReportButton