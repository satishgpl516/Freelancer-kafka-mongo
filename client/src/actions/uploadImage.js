import {UPLOAD_IMAGE} from "./index";

import {ROOT_URL,UPDATE_PROFILE} from "./index";
import axios from "axios";
import {history} from "../containers/History";

export  function uploadImage(values){
    console.log(values);
    let formData = new FormData();
    formData.append('name', values.picname);
    formData.append('myfile', values.newfile[0]);
    console.log(values.newfile[0]);
    const request = axios(`${ROOT_URL}/files/upload`, {
        method: "post",
        data: formData,
        config: { headers: {'Content-Type': 'multipart/form-data' }},
        withCredentials: true
    });
    request.then(function(res) {
        if(res.status = 201){
            alert("profile updated successfully");
            history.push('/dashboard');
        }

    });
    console.log("post project action called");

    return {
        type: UPLOAD_IMAGE,
        payload: request
    }

}