import React, {Component} from 'react';
import "../styles/BidCard.css";
//import profile from "./profile.png";
import {Link} from 'react-router-dom';


class BiddingCard extends Component{

    constructor(props){
        super(props);
        };

    state = {
        username : this.props.user.biddername,
        bid:  this.props.user.bidvalue,
        completiontime: this.props.user.completiontime};



    render(){
        console.log("Bidding Card",this.props.biddername);
        return(

            <div className='bidContainer-bidInfoContainer'>

                <div className='bidContainer-bidInfoContainer-item well row'>


                    {/*<div className='bidContainer-bidInfoContainer-item-image col-md-4'><img id ="image" src={profile}></img> </div>*/}
                    <div className='bidContainer-bidInfoContainer-item-username col-7'><Link to ={`/users/user-profile/${this.state.username}`} id="username">{this.state.username}</Link></div>
                    <div id = 'bid_value' className='bidContainer-bidInfoContainer-item-bid col-md-1'>
                        <p id="bid_value_number">{this.state.bid}$</p>
                        <p id = "bid_value_time">{this.state.completiontime}</p>
                    </div>


                </div>

            </div>
        );
    };

}


export default BiddingCard;