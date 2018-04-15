import {ROOT_URL, GET_BID_DETAILS, POST_BID} from "./index";
import axios from "axios";
import {history} from "../containers/History";
import {getProjectDetails} from "./getProjectDetails";

export function getbidDetails(pid) {
    console.log(pid);
    const request = axios.get(`${ROOT_URL}/users/biddetails?pid=${pid}`,{withCredentials:true});

    request.then(function(res) {
        if(res.status === 201){
            console.log("user bid details retrieved successfully")
        }
    });
    console.log("get project  detail action called");
    return ({
        type: GET_BID_DETAILS,
        payload: request
    });

}

export function postBid(values){
    var projectid = values.projectid;

    const request = axios(`${ROOT_URL}/users/bid`, {
        method: "post",
        data: values,
        withCredentials: true
    });
    request.then(function(res) {
        if(res.status === 201) {
            console.log("userdetails updated successfully");
            history.push(`/dashboard`);
        }
    });
    console.log("post bid action called");

    return {
        type: POST_BID,
        payload: request
    }

}