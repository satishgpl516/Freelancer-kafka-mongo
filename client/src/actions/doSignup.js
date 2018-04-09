import {ROOT_URL, SIGN_UP} from "./index";
import axios from "axios";
import {history} from "../containers/History";

export function doSignup (values){
    console.log(values);
    const request = axios.post(`${ROOT_URL}/users/signup`,values,{
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials:true
    });
    request.then(function(res) {
        if(res.status === 201)
            window.localStorage.setItem('isLoggedIn',true);
            history.push('/dashboard');});
    console.log("Action creator called");

    return {
        type: SIGN_UP,
        payload: request
    }

}


