import {ROOT_URL, LOG_IN, FETCH_USER} from "./index";
import axios from "axios";
import {history} from "../containers/History";

export function doLogin (values) {
    let rtype = null;
    let dtype = null;
    const request = axios.post(`${ROOT_URL}/users/login`, values,{withCredentials: true} );
    request.then(function(res) {
       // console.log("res",res);
        if(res.status == 201){
            window.localStorage.setItem('user',res.data.user);
            window.localStorage.setItem('isLoggedIn',true);
            console.log("response received");
            history.push('/dashboard');
            dtype= request;
        }
    });
    request.catch(function(err){
        dtype = {message:'error received'}
       // console.log("caught:",err.response);
    });
    return {
        type: LOG_IN,
        payload: request
    }
}

export function doGoogleLogin () {
    let rtype = null;
    let dtype = null;
    const request = axios.get(`${ROOT_URL}/users/auth/google`,{withCredentials: true} );
    request.then(function(res) {
        // console.log("res",res);
        if(res.status == 201){
            console.log("response received");
            history.push('/dashboard');
            dtype= request;
        }
    });
    request.catch(function(err){
        dtype = {message:'error received'}
        // console.log("caught:",err.response);
    });
    return {
        type: LOG_IN,
        payload: request
    }
}

export function fetchUser(){
    let rtype = null;
    let dtype = null;
    const request  = axios.get(`${ROOT_URL}/users/api/current_user`,{withCredentials:true} );
    request.then(function(res){
        if(res.status==201){
            console.log('response received');
            dtype = request;
            window.localStorage.setItem('user',res.data.user);
            window.localStorage.setItem('isLoggedIn',true);
        }
    });
    request.catch(function(err){
        localStorage.setItem('user',err.user);
        dtype = {message:'error received'};
        console.log("error:",err);
    });
    return{
        type: FETCH_USER,
        payload: request
    }

}
