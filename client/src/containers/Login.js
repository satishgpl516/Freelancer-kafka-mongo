import React,{Component} from 'react';
import {Field, reduxForm } from "redux-form";
import {Link } from 'react-router-dom';
import {bindActionCreators} from "redux";
import {doLogin} from "../actions/doLogin";

import {connect} from "react-redux";
import '../styles/style.css';

class Login extends  Component{
    renderField(field){
        const {input, meta:{touched,error}} = field;
        const cname = `form-group ${touched && error? 'has-danger' : ''} `;

        return(
            <div className= {cname}>
                {/*<label>{field.label}</label>*/}
                <input className="form-control large-input"
                       {...input} {...field}
                />
                <div className="text-help">
                    {touched ? error: ''}
                </div>
            </div>
        )

    }
    onSubmit(values){
        console.log(values);
        this.props.doLogin(values);
    }

    render(){
        const { handleSubmit, load, pristine, reset, submitting } = this.props;
        return (

            <div>
                <div className="row justify-content-md-center">
                    <div className="container-fluid">
                        <div className="col-md-12">
                            <div className="header-login-form">
                                <div className="center-modal">

                                    <div className="modal-header">
                                        <div className="modal-header-logo">
                                            {/*<Link to={uemail? '/dashboard' : '/'} className="newlink">*/}
                                                <img className="flicon-logo-fullcolor"
                                                     src="https://cdn6.f-cdn.com/build/icons/fl-logo.svg"
                                                     style={this.flicon}/>
                                            {/*</Link>*/}
                                        </div>
                                        <p className="error-text">{this.props.user.message}</p>
                                    </div>
                                    <div className="modal-body">
                                            <a href="http://localhost:5000/users/auth/google" className="btn btn-block btn-social btn-lg btn-google">
                                            <span className="fa fa-google"></span>Login with Google</a>

                                        <div className="hr-divider"><span className="hr-divider-text">OR</span></div>
                                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                            <Field
                                                name="username"
                                                placeholder = "Username or Email Address"
                                                component = {this.renderField}
                                                type = "text"
                                            />
                                            <Field
                                                name="password"
                                                placeholder = "Password"
                                                type = "password"
                                                component = {this.renderField}

                                            />
                                            <button type="submit" disabled={pristine || submitting} className="btn btn-primary btn-large  btn-block">
                                                Log In
                                            </button>
                                        </form>

                                        <span className="login-form-signup-link" >Don't have an account?
                                             <Link to="/signup" className="switch-to-login">Sign Up</Link>
                          </span>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

function validate(values){
    const errors = {};
    //validate input from values



    if(!values.username){
        errors.username = 'Please enter Username or email address\n';
    }

    if(!values.password){
        errors.password= 'please enter password';
    }


    //if errors is empty , the form is fine to submit
    //if errors has *any* properties, redux form assumes that form is invalid
    return errors;
}
function mapStateToProps(state){
    return ({user: state.user});
}

function mapDispatchToProps(dispatch){
    return {
        ...bindActionCreators({
            doLogin},dispatch)

    };
}


export default reduxForm({
    validate,
    form: 'PostsLoginForm'
}) (connect(mapStateToProps,mapDispatchToProps)(Login));
