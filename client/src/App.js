import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Router,Route,Redirect, Switch} from "react-router-dom";
import Home from "./containers/Home";
import Signup from "./containers/Signup";
import Dashboard from "./containers/Dashboard";
import Postproject from "./containers/Postproject";
import UpdateProfile from "./containers/UpdateProfile";
import ProjectDetails from "./containers/ProjectDetails";
import UserProfile from "./containers/UserProfile";
import UserPosted from "./containers/UserPosted";
import Login from "./containers/Login";
import {history} from './containers/History';
import {connect} from "react-redux";
import {PrivateRoute} from "./containers/PrivateRoute";
import {fetchUser} from "./actions/doLogin";

class App extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.props.fetchUser();
    }

  render() {
        //var logStat = this.props.user.isLoggedIn;
      var logStat = localStorage.getItem('isLoggedIn');
      console.log("new:",logStat);

      //  console.log(this.props.user.isLoggedIn);
    return (
      <div className="App">

        <Router  history = {history}>
            <Switch>

                <Route path="/login" render={() => (
                    !logStat ? (
                        <Login/>
                    ) : (
                        <Redirect to="/Dashboard"/>
                    )
                )}/>
                    <Route path = "/signup" component={Signup}/>
                    <PrivateRoute path = "/dashboard" component = {Dashboard} />
                    <PrivateRoute path = "/post-project" component = {Postproject} />
                    <PrivateRoute path ="/update-profile" component = {UpdateProfile}/>
                    {/*<PrivateRoute path = "/project-details/:pid" render = {(props) => (<ProjectDetails id = {this.props.match.params.pid}/>)}/>*/}
                    <Route exact path = "/project-details/:pid" render = {(props) => {
                    return logStat ? (
                        <ProjectDetails id={props.match.params.pid}/>
                    ) : (
                        <Redirect to="/login"/>
                    )
                }}/>

                    <PrivateRoute path = "/user-profile/" component = {UserProfile}/>
                    <PrivateRoute path = "/getuserposted/" component = {UserPosted}/>
                <Route path="/" render={() => (
                    !logStat ? (
                        <Home />
                    ) : (
                        <Redirect to="/dashboard"/>
                    )
                )}/>


            </Switch>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state){
    return ({user : state.user});
}



export default connect(mapStateToProps,{fetchUser})(App);
