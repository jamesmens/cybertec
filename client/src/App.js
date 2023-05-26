
import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

import {BrowserRouter,Routes,Route} from "react-router-dom"
import {ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import MyForm from "./components/Front/RegistrationForm";

import Home from './components/Front/home';


import  "./components/style/custome.css"

import "./components/style/front.css"

import Login from "./components/Front/login";

import Resetpasspage from "./components/Front/resetpassword";
import ConfirmAccount from "./components/Front/confirmAccount";

function App() {
 
  return (
   <BrowserRouter>
<Routes>
<Route path='/' 
element={<Home/>}/> 
<Route
  path="/user/myform"
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
