import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Logo from "../logo.svg";
import "../styles/Header.css";
import {connect} from "react-redux";
import {doLogout} from "../actions/doLogout";

//import {Route, withRouter} from 'react-router-dom';

class DashboardHeader extends Component{
    constructor(props){
        super(props);
        this.handleLogout= this.handleLogout.bind(this);
    }

    handleLogout(){
        const user = sessionStorage.getItem('username');
        this.props.doLogout();
    }

    render(){
        return (
            <div>

                <nav className="navbar navbar-expand-md navbar-static-top">
                    <div className="navbar-collapse">

                        <div className="col-md-8">

                            <ul className="navbar-nav justify-content-md-center col-md-12 ">
                                <li><Link className="navbar-brand mx-auto" to="/"><img src="https://cdn6.f-cdn.com/build/icons/fl-logo.svg" width="145" height="36" alt="Freelancer"/></Link></li>
                                <li id="hf" className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Hire Freelancers</a>
                                    <div className="dropdown-menu">
                                        <h6 className="dropdown-header" >FIND A FREELANCER</h6>

                                        <a className="dropdown-item" href="#">Post a Project</a>
                                        <a className="dropdown-item" href="#">Start a Contest</a>
                                        <a className="dropdown-item" href="#">Post a Local Job</a>
                                        <a className="dropdown-item" href="#">Get a Recruiter</a>
                                        <hr className='SectionDivider ng-star-inserted'/>


                                        <h6 className="dropdown-header">DISCOVER</h6>
                                        <a className="dropdown-item" href="#">Separated link</a>
                                        <a className="dropdown-item" href="#">Browse Directory</a>
                                        <a className="dropdown-item" href="#">Community</a>
                                    </div>


                                </li>
                                <li id="fw" className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Find Work</a>
                                    <div className="dropdown-menu">
                                        <h6 className="dropdown-header ">FIND WORK</h6>

                                        <a className="dropdown-item" href="#">Projects with My Skills</a>
                                        <a className="dropdown-item" href="#">Browse Projects</a>
                                        <a className="dropdown-item" href="#">Browse Contests</a>
                                        <a className="dropdown-item" href="#">Browse Local Jobs</a>
                                        <a className="dropdown-item" href="#">Browse Categories</a>
                                        <a className="dropdown-item" href="#">Bookmarks</a>
                                        <a className="dropdown-item" href="#">Get Certified</a>
                                        <a className="dropdown-item" href="#">Refer a Client</a>
                                    </div>
                                </li>

                                <li id="mp" className="nav-item">
                                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">My Projects</a>
                                    <div className="dropdown-menu">
                                        <h6 className="dropdown-header">MY PROJECTS</h6>
                                        <hr className='SectionDivider ng-star-inserted'/>
                                        <a className="dropdown-item" href="/getuserposted">Posted Projects</a>
                                        <a className="dropdown-item" href="#">bidded projects a</a>
                                        <a className="dropdown-item" href="#">completed  projects</a>
                                        <a className="dropdown-item" href="#">Get a Recruiter</a>


                                        <h6 className="dropdown-header">DISCOVER</h6>
                                        <a className="dropdown-item" href="#">Separated link</a>
                                        <a className="dropdown-item" href="#">Browse Directory</a>
                                        <a className="dropdown-item" href="#">Community</a>
                                    </div>
                                </li>
                                <li id="help" className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Help</a>
                                    <div className="dropdown-menu">
                                        <h6 className="dropdown-header">GET HELP</h6>
                                        <a className="dropdown-item" href="#">Get Support</a>
                                        <a className="dropdown-item" href="#">How Freelancer.com Works</a>
                                        <a className="dropdown-item" href="#">Frequently Asked Questions</a>
                                        <a className="dropdown-item" href="#">Fees and Charges</a>
                                        <a className="dropdown-item" href="#">Disputes</a>



                                    </div>


                                </li>

                            </ul>
                        </div>






                        <div className='col-md-2'>
                            <form className='form-inline my-2 my-lg-0'>
                                <input className="form-control mr-sm-2" type="text" placeholder="Search"/>

                            </form>


                        </div>
                        <div className='col-md-2'>
                            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-md-table-col ">
                                <ul className="navbar-nav justify-content-between .col-md-offset-4">
                                    <li className="nav-item col-md-4 ">
                                        <button type ="submit" className="btn btn-danger" onClick={this.handleLogout}>logout</button>
                                    </li>
                                    {/*<li className="nav-item col-md-4">*/}
                                    {/*<Link className="nav-link" to="/SignUp">Sign Up</Link>*/}
                                    {/*</li>*/}
                                    {/*<li className="nav-item col-md-6 dropdown">*/}
                                    {/*/!*<Link className="nav-link btn-primary" to="#">Post a Project</Link>*!/*/}
                                    {/*<a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Help</a>*/}
                                    {/*<div className="dropdown-menu">*/}
                                    {/*<h6 className="dropdown-header">GET HELP</h6>*/}
                                    {/*<a className="dropdown-item" href="#">Get Support</a>*/}
                                    {/*<a className="dropdown-item" href="#">How Freelancer.com Works</a>*/}
                                    {/*<a className="dropdown-item" href="#">Frequently Asked Questions</a>*/}
                                    {/*<a className="dropdown-item" href="#">Fees and Charges</a>*/}
                                    {/*<a className="dropdown-item" href="#">Disputes</a></div>*/}

                                    {/*</li>*/}
                                </ul></div>
                        </div>
                    </div>
                </nav>
                <nav id = 'subheader' className="navbar nav-fill nav-pills">

                    <div className='col-md-8 offset-md-2'>
                        <div className='row'><div className='col-md-1'></div>
                            <a className="nav-link col-md-1.5" href="#">My Projects</a>
                            <Link className="nav-link active col-md-1.5" to="/">DashBoard</Link>
                            <a className="nav-link col-md-1.5" href="#">Inbox</a>
                            <a className="nav-link col-md-1.5" href="#">Feedback</a></div>
                    </div>
                    <div className ='nav-item col-md-2'><Link id='pop' className="nav-link btn-primary" to="/post-project">Post a Project</Link></div>

                </nav>

            </div>


        );
    }
}


export default connect(null,{doLogout})(DashboardHeader);

