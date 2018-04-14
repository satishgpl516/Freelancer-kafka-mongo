import axios from "axios";
import {ROOT_URL,GET_POSTED_PROJECTS} from "./index";

export function getpostedProjects(){
    const request = axios.get(`${ROOT_URL}/users/postedprojects`, {withCredentials:true});
    request.then(function(res) {
        if(res.status = 201){
            console.log("project details retrieved successfully")
        }

    });
    console.log("get project  detail action called");
    return ({
        type: GET_POSTED_PROJECTS,
        payload: request
    });
}
