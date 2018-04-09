import React, {Component } from 'react';
import {Field, reduxForm } from "redux-form";
import {Link } from 'react-router-dom';
import {updateProfile} from "../actions/updateProfile";
import {uploadImage} from "../actions/uploadImage";
import {bindActionCreators} from "redux"
import {connect} from "react-redux";
import '../styles/style.css';

class UserProfile extends Component{
    render(){
        return(
            <div>
                <div className="profile-cover-mask">

                </div>
            </div>
        );
    }
}


export default (UserProfile);
