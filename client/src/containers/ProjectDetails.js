import React, {Component } from 'react';
import {Route, Link , withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {getProjectDetails} from "../actions/getProjectDetails";
import {getbidDetails} from "../actions/getbidDetails";
import DashBoardHeader from './DashboardHeader';
import "./ProjectStyle.css"
import BiddingCard from "./BiddingCard";
import _ from 'lodash';
import { bindActionCreators } from 'redux';

class ProjectDetails extends Component{

constructor(props){
    super(props);
    this.state= {
        pid: this.props.id
    };
}


componentDidMount(){
    // action calls for getting project details and Bid details using id
    this.props.getProjectDetails(this.state.pid);
    this.props.getbidDetails(this.state.pid);

}

    render(){

        let projectName = "Freelancer"; //_.map(this.props.data,'ProjectName');
        let no_of_bids  = 3; //this.props.bid_data.length;
        let avg_bid = 437;
        let max_range = 585;
        let min_range =437;
        let description = this.props.data.projectdescription;
        let skills =   this.props.data.projectskills;
        let project_id = this.props.data.projectid;
        let employer_details = this.props.data.projectowner;
        let top_five = 5;
        let currency = '$';
        console.log("project details",this.props.data);
        console.log("Bid details",this.props.bids);
        return(
            <div id ='projectDescriptionBody'>
                <div><DashBoardHeader/></div>
                <div className='projectDetailsContainer '>
                    <div className='row'>
                        <div className='col-md-2'></div>
                        <div className='col-md-8 '>
                            <h1 className='project_name largest bold margin-b5 span12 '>{}</h1>
                            <div className='shadow'>
                                <div id = 'headercontainer row ' className='headerContainer'>

                                    <div className='headerContainer well white silver span padding-5 align-c margin-t10 margin-l10 margin-b10 PageFreelancerPvp-infoBar-details col-md-6'>
                                        <div className='headerContainer-items align-c padding-r10 padding-l5 '>
                                            <div id='heading'><p>Bids</p></div>
                                            <div id='value' className='val'>{no_of_bids}</div>
                                        </div>

                                        <div id="middle" className='headerContainer-items align-c padding-r10 padding-l10 border-left border-right'>
                                            <div id = 'heading'><p>Avg Bid (USD)</p></div>
                                            <div id ='value' className='val'>{avg_bid}$</div>
                                        </div>

                                        <div className='headerContainer-items align-c padding-r10 padding-l10'>
                                            <div id = 'heading'><p>Project Budget (USD)</p></div>
                                            <div id ='value'className='val'>{min_range}$ - {max_range}$</div>
                                        </div>
                                    </div>
                                    {/*Bid Button*/}

                                    <div className='headerContainer-items col-md-2' id = 'bid_button'>
                                        <div id = 'heading'><Link className='btn btn-primary' to='#' >Bid</Link></div>
                                    </div>
                                </div>
                            </div>
                        </div >
                    </div>
                    <div className='row'>

                        <div className='col-md-2'></div>
                        <div className='detailsContainer shadow col-md-8'>
                            <div className='detailsContainer-header'>
                                <h2>Project Description</h2>
                            </div>
                            <div className='detailsContainer-body'>
                                <div id ='body'>
                                    <p>{description}</p>
                                    <div className='employerDetails'><h5>About the employer</h5>
                                        <p>{employer_details}</p>
                                    </div>
                                    <div className='employerDetails'><h5>Skills Required</h5>
                                        <Link id='skills' to = '#'>{skills}</Link>
                                    </div>
                                    <div id='projectID'><h6>Project ID: {project_id}</h6>
                                        <Link to = '#'>Report Project</Link>

                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>

                    <div className='row'>
                        <div className='col-md-2'></div>
                        <div id='bid_container' className='bidContainer col-md-8 shadow'>
                            <div id='bid_container_header' className='bidContaner-header well row'>
                                <div id = 'bid_header_items' className='bidContainer-header-items col-md-8'>
                                    <p>FREELANCER BIDDING ({top_five})</p>

                                </div>
                                <div id = 'bid_header_items' className='bidContainer-header-items col-md-2'>
                                    <p>REPUTATION</p>
                                </div>
                                <div id = 'bid_header_items' className='bidContainer-header-items col-md-2'>
                                    <p>BID ({currency})</p>
                                </div>
                            </div>
                            <div className='bidContainer-bids'>
                                {
                                    Object.entries(this.props.bids).map(
                                        ([key, value]) => {
                                            return <BiddingCard key = {key} user = {value}/>
                                            console.log('Values', value);

                                        }
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>);

    }

}

function mapStateToProps(state){
    return ({
        data :state.projects,
        bids: state.biddetails

    });

}

function mapDispatchToProps(dispatch){
    return {
        ...bindActionCreators({
            getbidDetails, getProjectDetails
        },dispatch)
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(ProjectDetails);