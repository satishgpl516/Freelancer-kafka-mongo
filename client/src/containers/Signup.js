import React,{Component} from 'react';
import {Field, reduxForm } from "redux-form";
import {Link } from 'react-router-dom';
import {doSignup} from "../actions/doSignup";
import {connect} from "react-redux";
import '../styles/style.css';


class Signup extends Component{
    renderField(field){
        const {input ,meta:{touched,error},...rest} = field;
        const cname = `form-group ${touched && error? 'has-danger' : ''} `;

        return(
            <div className= {cname}>
                {/*<label>{field.label}</label>*/}
                <input className="form-control large-input"
                        {...input} {...rest}
                />
                <div className="text-help">
                    {touched ? error: ''}
                </div>
            </div>
        )

    }
    onSubmit(values){
        console.log(values);
        this.props.doSignup(values);
    }

    render(){
        const { handleSubmit, load, pristine, reset, submitting } = this.props;
        return (
            <div >
                <div className="row justify-content-md-center">
                    <div className="container-fluid">
                        <div className="col-md-12">
                            <div className="header-login-form">
                                <div className="center-modal">
                                    <div className="modal-header">
                                        <div className="modal-header-logo">
                                            <img className="flicon-logo-fullcolor"
                                                 src="https://cdn6.f-cdn.com/build/icons/fl-logo.svg"
                                                 />
                                        </div>
                                        <div>
                                        <h3 className="modal-title">Sign up for <em>free</em> today!</h3>
                                        </div>
                                    </div>

                                    <div className="modal-body">
                                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                        <Field
                                            name = "username"
                                            placeholder = "Username"
                                            component={this.renderField}
                                            type="text"
                                        />
                                        <Field
                                            name="email"
                                            placeholder = "Email Address"
                                            component = {this.renderField}
                                            type= "email"
                                        />

                                            <Field
                                                name="password"
                                                placeholder = "Password"
                                                component = {this.renderField}
                                                type="password"
                                            />
                                        <button type="submit" disabled={pristine || submitting} className="btn btn-primary btn-large  btn-block">
                                            Create Account
                                        </button>
                                        <small className="login-form-signup-terms">
                                            By registering you confirm that you accept the  Terms and Conditions and Privacy Policy
                                        </small>
                                        </form>

                                        <span className="login-form-signup-link">Already a Freelancer.com member?
                                    <Link to="/login" className="switch-to-login">Log in</Link>
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


    if(!values.username ){
        errors.username = "Please enter a username\n ";
    }


    if(!values.email){
        errors.email = 'Please enter an email address\n';
    }

    if(!values.password){
        errors.password= 'please enter password';
    }

    //if errors is empty , the form is fine to submit
    //if errors has *any* properties, redux form assumes that form is invalid
    return errors;
}


export default reduxForm({
    validate,
    form: 'PostsSignupForm'
}) (connect(null,{doSignup})(Signup));
