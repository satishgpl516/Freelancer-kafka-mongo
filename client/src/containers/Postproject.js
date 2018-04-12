import React, {Component } from 'react';
import {Field, reduxForm } from "redux-form";
import {Link } from 'react-router-dom';
import {doPostProject} from "../actions/dopostProject";
import {connect} from "react-redux";
import '../styles/style.css';

class Postproject extends Component{
    constructor(props){
        super(props);
    }
    renderField(field){
        const { meta:{touched,error}} = field;
        const cname = `form-bar ${touched && error? 'has-danger' : ''} `;

        return(
            <div className= {cname}>
                {/*<label>{field.label}</label>*/}
                <input {...field.input} {...field}
                />
                <div className="text-help">
                    {touched ? error: ''}
                </div>
            </div>
        )

    }
    renderSelect(field){
        return(
            <div>
                <select {...field.input} {...field}/>
                {field.touched && field.error && <div className="error">{field.error}</div>}
            </div>
            );
    }
    onSubmit(values){
        console.log(values);
        this.props.doPostProject(values);
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



    render(){
        const { handleSubmit, load, pristine, reset, submitting } = this.props;

        return(<div>
            <div className="container">
                <div className="post-project-main">
                    <header className="post-project-header">
                    <img className="flicon-logo-postproject"
                      src="https://cdn6.f-cdn.com/build/icons/fl-logo.svg"
                   />
                        <h2 className="Post-Project-header-title">
                            Tell us what you need done
                        </h2>
                        <p className="post-project-head-desc">
                            Get free quotes from skilled freelancers within minutes, view profiles, ratings and portfolios and chat with them. Pay the freelancer only when you are 100% satisfied with their work.
                        </p>
                    </header>
                    <div>
                        <div>
                            <form className="project-form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                <div className="form-group">
                                    <legend className="post-project-form-desc-label" >Choose a name for your project</legend>
                                    <Field
                                        name="proName" placeholder="e.g. Build me a website"
                                           component={this.renderField}
                                            type = "text"
                                           className="form-control form-control-lg post-project-form-name"/>
                                </div>
                                <div className="form-group">
                                    <legend className="post-project-form-label" >Tell us more about your project</legend>
                                    <p className="post-project-form-desc-sub">Great project descriptions include a little bit about yourself, details of what you
                                        are trying to achieve, and any decisions that you have already made about your project.
                                        If there are things you are unsure of, don't worry, a freelancer will be able to help
                                        you fill in the blanks.</p>
                                    <Field name="proDescr"
                                           className="form-control input-lg post-project-form-desc  "
                                           placeholder="Describe your project here..."
                                           component={this.renderDescr}
                                    />
                                </div>
                                <div className="post-project-file-upload-container" >
                                    <div className="post-project-upload">
                                        <button type="button" className="btn btn-secondary">
                                            <span className="glyphicon glyphicon-star" aria-hidden="true">
                                            </span> Upload Files
                                        </button>
                                        <p className="post-project-form-desc-sub">Drag & drop any images or documents that might be helpful in explaining your project brief here.</p>

                                    </div>
                                </div>
                                <div className="form-group">
                                    <legend className="post-project-form-skill" >What skills are required?</legend>
                                    <p className="post-project-form-desc-sub">Enter up to 5 skills that best describe your project. Freelancers will use these skills to find projects
                                        they are most interested and experienced in.</p>
                                    <Field name="proSkills"
                                           className="form-control form-control-lg post-project-form-skill  "
                                           placeholder="What skills are required?"
                                           component={this.renderField}
                                    />
                                </div>
                                    <legend className="post-project-form-pay" >How do you want to pay?</legend>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" defaultChecked/>
                                        <label className="form-check-label" htmlFor="exampleRadios1">
                                           Fixed price project
                                        </label>
                                </div>
                                <div className="form-check-final">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2"/>
                                        <label className="form-check-label" htmlFor="exampleRadios2">
                                            Hourly project
                                        </label>
                                </div>
                                <div className="form-group">
                                    <legend className="post-project-form-pay-price-label" >What is your estimated budget?</legend>
                                    <Field name ="proPayRange" component={this.renderSelect} className="custom-select my-1 mr-sm-2 " >
                                        <option></option>
                                        <option defaultValue="10-30" >Micro Project($10-30 USD)</option>
                                        <option value="30-250">Simple project ($30 - 250 USD)</option>
                                        <option value="1500-1000">Medium project ($1500 - 3000 USD)</option>
                                        <option value="3000-5000">Large project ($3000 - 5000 USD)</option>
                                        <option value="5000-10000">Larger project ($5000 - 10000 USD)</option>
                                        <option value="10000-20000">Very Large project ($10000 - 20000 USD)</option>
                                    </Field>
                                </div>
                                <div className="form-group">
                                    <button id="post-project-submit" className="btn Post-Project-submit-btn btn-primary" >
                                       <span className="post-project-btn-font">Post My Project</span>
                                    </button>
                                </div>
                                <p className= "post-project-form-desc-sub">By clicking 'Post My Project', you agree to the Terms & Conditions and Privacy Policy
                                    If you decide to award your project we charge a 3% commission (minimum project fees apply).
                                </p>


                            </form>
                            <div className="post-project-header-desc">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

function validate(values){
    const errors = {};
    //validate input from values


    if(!values.proName || values.proName.length < 10 ){
        errors.proName = "Please enter atleast 10 characters\n ";
    }


    if(!values.proDescr|| values.proDescr.length<30 || values.proDescr.length>140){
        errors.proDescr = "Please enter between 30  and 150 characters\n ";
    }

    if(!values.proSkills){
        errors.proSkills= 'please enter some skills';
    }

    //if errors is empty , the form is fine to submit
    //if errors has *any* properties, redux form assumes that form is invalid
    return errors;
}

export default reduxForm({
    validate,
    form: 'PostProjectForm'
}) (connect(null,{doPostProject})(Postproject));
