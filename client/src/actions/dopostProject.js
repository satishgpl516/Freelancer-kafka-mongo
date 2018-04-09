import {ROOT_URL,POST_PROJECT} from "./index";
import axios from "axios";
import {history} from "../containers/History";

export  function doPostProject(values){

    const request = axios(`${ROOT_URL}/users/project`, {
        method: "post",
        data: values,
        withCredentials: true
    })
    request.then(function(res) {
        if(res.status === 201){
            alert("project posted successfully")
            history.push('/dashboard');
        }

            });
    console.log("post project action called");

    return {
        type: POST_PROJECT,
        payload: request
    }

}