import { GET_PROJECT_DETAILS, POST_BID} from "../actions/index";
import _ from "lodash";

export default function(state={
    bidposted: false
},action){
    // console.log("user bids retrieved succesfully");
    // console.log(action.payload.data);
    switch (action.type){
        case GET_PROJECT_DETAILS:
            //console.log(action.payload.data.projects);
            console.log("user bids retrieved succesfully");
            console.log(action.payload);
            return (action.payload.data.bids);
            break;
        case POST_BID:
            console.log("user bids retrieved succesfully");
            console.log(action.payload);
            return (action.payload.data.bids);
            break;
        default:
            return state;
    }
}