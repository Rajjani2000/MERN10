import React from 'react';
import Draggable, {DraggableCore} from 'react-draggable';
import {useState} from 'react';
import './NewPost.css'
import PaperPlanIcon from "../assets/img/paper-plane.svg";

export default class Main extends React.Component {
    constructor(props) { 
        super(); 
        this.state = {value: "example"};

        this.handleChange = this.handleChange.bind(this);


    }
    state = {}

     
     handleChange(event) {
        this.setState({value:event.target.value});
    }
    render() {
        return (

<Draggable>
    <div className="new-post-edit-container">
        <textarea value={this.state.value} onChange={this.handleChange}className="new-post-edit" placeholder="Start Your Epic Post"></textarea>


        <button className="new-post-edit-btn">
            <img className="new-post-edit-btn-icon" src={PaperPlanIcon}></img>
        </button>
    </div>
</Draggable>

        )
    }
}