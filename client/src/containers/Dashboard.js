import React, {Component} from "react";
import {connect} from "react-redux";
import {doLogout} from "../actions/doLogout";
import {Link} from "react-router-dom";
import {bindActionCreators} from "redux";
import {getProjects} from "../actions/getProjects";
import DashboardHeader from "./DashboardHeader";
import _ from "lodash";
import {searchProjects} from "../actions/getProjects";

class Dashboard extends  Component{
    constructor(props){
        super(props);
        // this.displayProjects = this.displayProjects.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.mouseEnter = this.mouseEnter.bind(this);
        this.changeRows = this.changeRows.bind(this);
        this.skippages = this.skippages.bind(this);
    }
    state = {
        isMouseInside: false,
        projectid: null,
        bidprice: 0,
        noofdays: 0,
        query : null,
        take:2,
        skip:0

    }
    mouseEnter = () => {
        this.setState({ isMouseInside: true });
    }
    mouseLeave = () => {
        this.setState({ isMouseInside: false });
    }
    componentDidMount(){
        this.props.getProjects(this.state.skip,this.state.take);
    }
    handleInputChange = () => {
        this.setState({
            query: this.search.value
        }, () => {
            if (this.state.query) {
                if (this.state.query.length % 2 === 0) {
                    this.props.searchProjects(this.state.query)
                }
            } else if (!this.state.query) {
            }
        })
    }
    handleLogout(){
        const user = sessionStorage.getItem('username');
        this.props.doLogout();
    }
    changeRows(event){
        this.setState({
            take: event.target.value},
            () => {
                this.props.getProjects(this.state.skip,this.state.take);
            })
    }
    skippages(event){
        this.setState({
            skip: this.state.skip+this.state.take
        }, () => {
            this.props.getProjects(this.state.skip,this.state.take);
        })
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
                        <section className="ProjectFilters">
                        <div className="ProjectFilters-search " id= "searchDiv">
                            <form className="fl-form ProjectFilters-row" >
                                <div className="label-div">
                                    <label className= "ProjectFilters-rowLabel">Search</label>
                                </div>
                                <div className="ProjectFilters-item">
                                    <div className="input-icon">
                                        <input name="search" type="text" className="form-control default-input"
                                               ref={input => this.search = input}
                                               onChange={this.handleInputChange} placeholder="search for projects"/>
                                    </div>
                                </div>
                            </form>
                        </div>
                            <div className="ProjectFilters-search " id= "skillsDiv">
                                <form className="fl-form ProjectFilters-row" >
                                    <div className="label-div">
                                        <label className= "ProjectFilters-rowLabel">Skills</label>
                                    </div>
                                    <div className="ProjectFilters-item">
                                        <div className="input-icon">
                                            <input name=" skills" type="text" className="form-control default-input" placeholder="Search for Skills"/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="projectFilters=row">
                                <div className="projectFilters-secondaryControls">
                                    <div className="ProjectFilters-quantity">
                                        <label htmlFor="filter-length" className="ProjectFilters-quantityLabel">Results per page</label>
                                        <select onChange={this.changeRows} name="filter-length" id="quantity-selector" className="ProjectFilters-quantitySelector default-input" data-id="filter-length">
                                            <option>2</option>
                                            <option selected="">5</option>
                                            <option>10</option>
                                        </select>
                                    </div>
                                    <div className="pagination-buttons">
                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination justify-content-center">
                                            <li className="page-item disabled">
                                                <a className="page-link" href="#">Previous</a>
                                            </li>
                                            <li className="page-item"><a className="page-link" onClick={this.skippages}>1</a></li>
                                            <li className="page-item"><a className="page-link" onClick={this.skippages}>2</a></li>
                                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                                            <li className="page-item">
                                                <a className="page-link" onClick={this.skippages}>Next</a>
                                            </li>
                                        </ul>
                                    </nav>
                                    </div>
                                </div>
                            </div>
                        </section>
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
            doLogout, getProjects, searchProjects
        },dispatch)
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);

