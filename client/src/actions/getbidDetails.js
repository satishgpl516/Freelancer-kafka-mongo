import {ROOT_URL, GET_BID_DETAILS} from "./index";
import axios from "axios";


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

    const request = axios(`${ROOT_URL}/users/bid`, {
        method: "post",
        data: values,
        withCredentials: true
    });
    request.then(function(res) {
        if(res.status === 201){
            alert("project posted successfully")
            history.push('/dashboard');
        }

    });
    console.log("post project action called");

    return {
        type: POST_BID,
        payload: request
    }

}