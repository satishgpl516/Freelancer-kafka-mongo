import {GET_PROJECTS, GET_PROJECT_DETAILS} from "../actions/index";
import _ from "lodash";

export default function(state={},action){
    switch (action.type){
        case GET_PROJECTS:
            //console.log(action.payload.data.projects);
            return _.mapKeys(action.payload.data.projects,'projectid');
            break;
        case GET_PROJECT_DETAILS:
            console.log(action.payload.data);
            return (action.payload.data.projects);
        default:
            return state;
    }
}