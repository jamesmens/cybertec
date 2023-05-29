
import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

import {BrowserRouter,Routes,Route} from "react-router-dom"
import {ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import MyForm from "./components/Front/RegistrationForm";

import Home from './components/Front/home';

import { showToastify } from "./components/utils.js/reuseable";
import { ClearNotify } from "./store/actions/notification";
import  "./components/style/custome.css"


import Login from "./components/Front/login";

import Resetpasspage from "./components/Front/resetpassword";
import ConfirmAccount from "./components/Front/confirmAccount";

function App() {
  const notifications =useSelector((value)=>value.notification);
  const dispatch=useDispatch();
  useEffect(()=>{
if(notifications && notifications.notice){
  if(notifications.success){
    showToastify("SUCCESS", notifications.notice.msg)
    dispatch(ClearNotify());
 
  
  }
  if(notifications.success===false){
    showToastify("ERROR", notifications.notice.msg)
dispatch(ClearNotify());
 
  
  }
  window.scrollTo(0,0);
}
  });
 
  return (
   <BrowserRouter>
<Routes>
<Route path='/' 
element={<Home/>}/> 
<Route
  path="/user/Signup"
  element={<MyForm/>}
  
/>
<Route path="/user/login"  element={<Login/>}/>
<Route path="/account/verification" element={<ConfirmAccount/>}/>
<Route path="/account/passwordreset" element={<Resetpasspage/>}/>

</Routes>
<ToastContainer/>
   </BrowserRouter>
  );
}

export default App;
