import { GET_BID_DETAILS} from "../actions/index";
import _ from "lodash";

export default function(state={},action){
    // console.log("user bids retrieved succesfully");
    // console.log(action.payload.data);
    switch (action.type){
        case GET_BID_DETAILS:
            //console.log(action.payload.data.projects);
            console.log("user bids retrieved succesfully");
            console.log(action.payload);
            return (action.payload.data);
            break;
        default:
            return state;
    }
}