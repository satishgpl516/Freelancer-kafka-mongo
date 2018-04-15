import React, {Component} from "react";
import {connect} from "react-redux";
import {doLogout} from "../actions/doLogout";
import {Link} from "react-router-dom";
import {bindActionCreators} from "redux";
import {getProjects} from "../actions/getProjects";
import DashboardHeader from "./DashboardHeader";
import _ from "lodash";


class Dashboard extends  Component{
    constructor(props){
        super(props);
        // this.displayProjects = this.displayProjects.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.mouseEnter = this.mouseEnter.bind(this);

    }
    state = {
        isMouseInside: false,
        projectid: null,
        bidprice: 0,
        noofdays: 0

    }
    mouseEnter = () => {
        this.setState({ isMouseInside: true });
    }
    mouseLeave = () => {
        this.setState({ isMouseInside: false });
    }
    componentDidMount(){
        this.props.getProjects();
    }
    handleLogout(){
        const user = sessionStorage.getItem('username');
        this.props.doLogout();
    }
    displayProjects(){
       console.log("this project",this.props.projects);
        return _.map(this.props.projects, proj => {
           // console.log(proj._id, proj.projectname);
            this.state.projectid = proj._id;
            return (

                <tr  className="ProjectTable-row project-details" key={proj._id+"row"}>
                    <td className=" ProjectTable-cell ProjectTable-summaryColumn title-col" key={proj._id+"data"}>
                        <h2 className="ProjectTable-title" key={proj._id+"h2"}>
                            <span className= "ProjectTable-titleIcon" key={proj._id+"projname"}>
                                <Link to={`/project-details/${proj._id}`} key={proj._id+"link"} >{proj.projectname}</Link>
                            </span>
                        </h2>
                        <p className="ProjectTable-description" key={proj._id+"description"} >{proj.projectdescription}</p>
                        <span className="ProjectTable-skills" key={proj._id+"skilss"}>{proj.projectskills} </span>
                    </td>
                    <td className=" ProjectTable-cell ProjectTable-bidsColumn bids-col " key={proj._id+"bidsdata"}>
                        <div className="bids-col-inner" key={proj._id+"bids"}>{proj._id}</div>
                    </td>
                    <td className=" ProjectTable-cell ProjectTable-startedColumn started-col" key={proj._id+"time"}>6d 23h</td>
                    <td className=" ProjectTable-cell ProjectTable-priceColumn price-col" key={proj._id+"price"}>1627</td>
                    <td  className=" ProjectTable-cell ProjectTable-priceColumn" key={proj._id+"bidbtn"}>
                        {this.state.isMouseInside ? <Link to = {`/project-details/${proj._id}`} className= "btn btn-primary " >Bid</Link> : <p/> }
                    </td>
                </tr>
            );
        });


    }
    render(){
        return (
            <div>
                <div>
                    <div><DashboardHeader/></div>
                    
                    <div className="section-inner">
                        <h1 className="page-title">Freelance Jobs and Contests</h1>
                        <h2 className="section-heading">Browse Jobs on Freelancer</h2>
                        <div className="ProjectFilters-search " id= "searchDiv">
                            <form className="fl-form ProjectFilters-row" >
                                <div className="label-div">
                                    <label className= "ProjectFilters-rowLabel">Search</label>
                                </div>
                                <div className="ProjectFilters-item">
                                    <div className="input-icon">
                                        <input name="search" type="text" className="form-control default-input" placeholder="search for projects"/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="browse-project-table">
                        <div className="dataTables_wrapper" id="project_table_wrapper">
                            {/*<div className="dataTables_processing"></div>*/}
                            <table id="project_table" className="Project-Table">
                                <thead className="ProjectTable-head">
                                <tr>
                                    <th className="ProjectTable-header ProjectTable-summaryColumn">Project/Contest</th>
                                    <th className="ProjectTable-header ProjectTable-cell ProjectTable-bidsColumn bids-col">Bids/Entries</th>
                                    <th className="ProjectTable-header ProjectTable-cell ProjectTable-startedColumn started-col">Started</th>

                                    <th className="ProjectTable-header ProjectTable-cell ProjectTable-priceColumn price-col">Price</th>
                                    <th className=" ProjectTable-header ProjectTable-priceColumn">Bid/hire</th>


                                </tr>
                                </thead>
                                <tbody className="ProjectTable-body">{this.displayProjects()}
                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>

            </div>
        );

    }
}
function mapStateToProps(state){
    console.log("state",state);
    return ({projects: state.projects});
}

function mapDispatchToProps(dispatch){
    return {
        ...bindActionCreators({
            doLogout, getProjects
        },dispatch)
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);

