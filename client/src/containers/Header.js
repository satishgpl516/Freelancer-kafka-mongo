import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import SignUp from './Signup';
import HomePage from './Home';
import Logo from "./logo.svg";
import "./Header.css";
import {Route, withRouter} from 'react-router-dom';

const Header = () =>(
    <div> <div className="navbar navbar-expand-md navbar-static-top ">

        <nav className="navbar navbar-expand-md ">
            <div className="navbar-collapse container">
                <div className="col-md-8 col-md-offset-4 ">
                    <ul className="navbar-nav justify-content-md-center col-md-10 ">
                        <li><a className="navbar-brand mx-auto" href="/"><img src="https://cdn6.f-cdn.com/build/icons/fl-logo.svg" width="145" height="36" alt="Freelancer"/></a></li>
                        <li id="hf" className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Hire Freelancers</a>
                            <div className="dropdown-menu">
                                <h6 className="dropdown-header">FIND A FREELANCER</h6>

                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <a className="dropdown-item" href="#">Something else here</a>

                                <h6 className="dropdown-header">DISCOVER</h6>
                                <a className="dropdown-item" href="#">Separated link</a>
                            </div>


                        </li>
                        <li id="fw" className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Find Work</a>
                            <div className="dropdown-menu">
                                <h6 className="dropdown-header">FIND WORK</h6>

                                <a className="dropdown-item" href="#">Browse Projects</a>
                                <a className="dropdown-item" href="#">Browse Contests</a>
                                <a className="dropdown-item" href="#">Browse Categories</a>


                            </div>


                        </li>

                        <li id="hiw" className="nav-item">
                            <a className="nav-link" href="#">How It Works</a>
                        </li>

                    </ul>
                </div>

                <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-md-table-col ">
                    <ul className="navbar-nav justify-content-between .col-md-offset-4">
                        <li className="nav-item col-md-4 ">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item col-md-4">
                            <Link className="nav-link" to="/signup">Sign Up</Link>
                        </li>
                        <li className="nav-item col-md-6">
                            <Link className="nav-link btn-primary" to="/post-project">Post a Project</Link>
                        </li>
                    </ul></div>
            </div>
        </nav>

    </div></div>


);
export default Header;
