import axios from "axios";
import {ROOT_URL,GET_PROJECTS} from "./index";

export function getProjects(){
    const request = axios.get(`${ROOT_URL}/users/projects`,{withCredentials: true});
    request.then(function(res) {
        if(res.status = 201){
            console.log("project details retrieved successfully")

        }

    });
    console.log("get project  detail action called");
    return ({
        type: GET_PROJECTS,
        payload: request
    });
}
