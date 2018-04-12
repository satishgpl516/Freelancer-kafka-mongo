import React, {Component } from 'react';
import {Field, reduxForm } from "redux-form";
import {Link } from 'react-router-dom';
import {updateProfile} from "../actions/updateProfile";
import {uploadImage} from "../actions/uploadImage";
import {bindActionCreators} from "redux"
import {connect} from "react-redux";
import '../styles/style.css';

class UpdateProfile extends Component{
    constructor(props){
        super(props);

    }
    renderField(field){
        const {input, meta:{touched,error}} = field;
        const cname = `form-bar ${touched && error? 'has-danger': ''}` ;
        return(<div className={cname}>
                <input {...input} {...field}/>
                <div className="text-help" >{touched?error:''}</div>
            </div>

        )
    }
    renderDescr(field) {
        const {meta: {touched, error}} = field;
        const cname = `form-bar ${touched && error ? 'has-danger' : ''} `;

        return (
            <div className={cname}>
                {/*<label>{field.label}</label>*/}
                <textarea {...field.input} {...field}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        )
    }
    onSubmit(values){
        console.log(values);
        this.props.updateProfile(values);

       // this.props.uploadImage(values);

    }
    customFileInput = (field) => {
        delete field.input.value; // <-- just delete the value property
        return <input type="file" id="file" {...field.input} />;
    };

    render(){

        const {handleSubmit,resetForm,submitting} = this.props;
        return (<div className="">
                <div className="container ">
                    <div className="row">

                        <div className="col-md-8 col-md-offset-2">
                            <form role="form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                <legend className="text-center"><h1>Profile Details</h1></legend>
                                <fieldset>
                                    <div className="row">
                                        <div className="form-group col-md-6">
                                            <label className="user-profile-label" for="firstname">First name*</label>
                                            <Field name="firstname" type="text" placeholder="First Name" component={this.renderField} className="form-control"/>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label className="user-profile-label" for="lastname">Last name*</label>
                                            <Field name="lastname" type="text" placeholder="Last Name" component={this.renderField} className="form-control"/>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label className="user-profile-label" for="mobile">Mobile Number</label>
                                            <Field name="mobile" type="number" placeholder="10 digit Mobile Number" component={this.renderField} className="form-control" maxLength="10"/>
                                        </div>
                                        {/*<div className="form-group col-md-6">*/}
                                            {/*<label className="user-profile-label" for="company">Company</label>*/}
                                            {/*<Field name="company"  type="text" placeholder="Company" component={this.renderField} className="form-control"/>*/}
                                        {/*</div>*/}
                                        <div className="form-group col-md-12">
                                            <label className="user-profile-label" for="skills">Skills*</label>
                                            <Field name="skills"  type="text" placeholder="Skills" component={this.renderField} className="form-control"/>
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label className="user-profile-label" for="aboutme">About me</label>
                                            <Field name="aboutme"  placeholder="Enter your professional summary" component={this.renderDescr} className="form-control"/>
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label className="user-profile-label">Upload Image</label>
                                            <div className="input-group">
                                                <Field name="newfile" type="file" component={this.customFileInput}/>
                                            </div>
                                            <input type="text"  className="form-control upload-spacing" readOnly placeholder="Upload Files here"/>
                                            <img id='img-upload'/>
                                        </div>
                                    </div>
                                </fieldset>

                                <div className="form-group">
                                    <div className="col-md-12">
                                        <div className="checkbox">
                                            <label >
                                                <input type="checkbox" value="" id=""/>
                                                I accept the <a href="#">terms and conditions</a>.
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="col-md-12">
                                        <button type="submit" disabled={submitting} onClick={resetForm} className="btn btn-primary">
                                            Save Details
                                        </button>
                                    </div>
                                </div>

                            </form>
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


    if(!values.firstname){
        errors.firstname = "Please enter First name\n ";
    }


    if(!values.lastname){
        errors.lastname = "Please enter Last name\n ";
    }

    if(!values.skills){
        errors.skills= 'please enter some skills';
    }


    if(values.mobile && values.mobile.length<10){
        errors.mobile= 'please enter 10 digits';
    }

    //if errors is empty , the form is fine to submit
    //if errors has *any* properties, redux form assumes that form is invalid
    return errors;
}


function mapDispatchToProps(dispatch){
    return {
        ...bindActionCreators({
            uploadImage, updateProfile
        },dispatch)
    }
}



export default reduxForm({
    validate,
    form: 'PostProjectForm'
}) (connect(null,mapDispatchToProps)(UpdateProfile));

