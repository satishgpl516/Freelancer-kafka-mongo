import {FETCH_USER, LOG_IN, LOGIN_ERROR, UPDATE_PROFILE} from "../actions/index";
import {SIGN_UP} from "../actions/index";
import {LOG_OUT,POST_PROJECT,UPLOAD_IMAGE} from "../actions/index";

export default function (state={
    isLoggedIn : false,
    username: '',
    message: '',
    posted: false,
    imgupload: false,
}, action){
    if(action.error){
        action.type = LOGIN_ERROR;
    }
    switch (action.type){
        case LOG_IN:
            // sessionStorage.setItem("islogin", true);
            // sessionStorage.setItem("username", action.payload.data.username);
            console.log(action.payload);
            return  {...state, isLoggedIn:true, username: action.payload.data, };
            break;
        case SIGN_UP:
            sessionStorage.setItem("islogin", true);
            sessionStorage.setItem("username", action.payload.username);
            return  {...state, isLoggedIn:true, username: action.payload.data.username};
            break;
        case LOG_OUT:
            sessionStorage.clear();
            return {...state, isLoggedIn:false, username: '' };
            break;
        case LOGIN_ERROR:
            return {...state, isLoggedIn:false, username: '',message:'Invalid username or password' };
            break;
        case POST_PROJECT:
            return {...state, posted:true};
            break;
        case UPDATE_PROFILE:
            return {...state, imgupload:true };
            break;
        case FETCH_USER:
            console.log("user new:",action.payload.data);
            return {...state, isLoggedIn:true, username: action.payload.data};
            break;
        default:
            return state;
    }

}