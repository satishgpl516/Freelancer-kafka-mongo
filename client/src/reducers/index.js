import {combineReducers}  from 'redux';
import {reducer as formReducer} from "redux-form";
import reducerlogin from "./reducerlogin";
import reducergetProjects from "./reducergetProjects";
import reducergetbidDetails from "./reducergetbidDetails"

const rootReducer = combineReducers({
    user: reducerlogin,
    projects: reducergetProjects,
    biddetails: reducergetbidDetails,
    form:  formReducer

});

export default rootReducer;