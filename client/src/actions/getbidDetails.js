import {ROOT_URL, GET_BID_DETAILS} from "./index";
import axios from "axios";


export function getbidDetails(pid) {
    console.log(pid);
    const request = axios.get(`${ROOT_URL}/users/biddetails?pid=${pid}`);

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