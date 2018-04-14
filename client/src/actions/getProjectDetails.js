import {ROOT_URL, GET_PROJECT_DETAILS} from "./index";
import axios from "axios";
import {history} from "../containers/History";


export function getProjectDetails(pid) {
    console.log(pid);
    const request = axios.get(`${ROOT_URL}/users/projectdetails?pid=${pid}`,{withCredentials:true});

    request.then(function(res) {
        if(res.status = 201){
            console.log("project details retrieved successfully")
        }

    });
    console.log("get project  detail action called");
    return ({
        type: GET_PROJECT_DETAILS,
        payload: request
    });

}