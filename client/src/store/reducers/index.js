import {combineReducers} from "redux";
import contacts from "./contact";
import notification from "./notification";
import personal from "./personal";

const appReducers=combineReducers({
    personal,
   
    contacts,
  
    notification,
    




})

export default appReducers