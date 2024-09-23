import React from 'react';
import './Main.css'
import NewPost from "./NewPost";
import BackgroundImg from "../assets/img/bg.png"

export default class Main extends React.Component {
    constructor(props) { super(); }

    state = {}

    render() {
        return (

<div className="main-page-container">
    <img class="background" src={BackgroundImg}></img>
    <NewPost/>
</div>

        )
    }
}