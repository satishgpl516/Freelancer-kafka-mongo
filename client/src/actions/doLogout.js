import {ROOT_URL, LOG_OUT} from "./index";
import axios from "axios";
import {history} from "../containers/History";

export function doLogout (values) {
    console.log(values);
    const request = axios.get(`${ROOT_URL}/users/logout`, {withCredentials:true});

    console.log("Action creator called");
    console.log("request :",request);
    request.then(function(res) {
        if(res.status === 201)
            history.push('/login');
        localStorage.clear();
    });
    return {
        type: LOG_OUT,
        payload: request
    }
}

