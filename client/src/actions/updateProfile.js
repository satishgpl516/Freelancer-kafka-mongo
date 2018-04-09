import {ROOT_URL,UPDATE_PROFILE} from "./index";
import axios from "axios";
import {history} from "../containers/History";

export  function updateProfile(values){

    const request = axios(`${ROOT_URL}/users/userProfile`, {
        method: "post",
        data: values,
        withCredentials: true
    })
    request.then(function(res) {
        if(res.status === 201){
            alert("profile updated successfully");
            history.push('/dashboard');
        }

    });
    console.log("post project action called");

    return {
        type: UPDATE_PROFILE,
        payload: request
    }

}