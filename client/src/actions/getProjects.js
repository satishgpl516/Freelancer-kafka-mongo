import axios from "axios";
import {ROOT_URL,GET_PROJECTS} from "./index";

export function getProjects(skip,take){
    const request = axios.get(`${ROOT_URL}/users/projects?skip=${skip}&take=${take}`,{withCredentials: true});
    request.then(function(res) {
        if(res.status === 201){
            console.log("project details retrieved successfully");
        }
    });
    console.log("get project  detail action called");
    return ({
        type: GET_PROJECTS,
        payload: request
    });
}

export function searchProjects(value){
    const request = axios.get(`${ROOT_URL}/users/searchprojects/?proName=${value}`,{withCredentials:true});
    request.then(function(res){
        if(res.status===201){
            console.log("search projects done successfully");
        }
    });
    console.log("get project  detail action called");
    return ({
        type: GET_PROJECTS,
        payload: request
    });
}