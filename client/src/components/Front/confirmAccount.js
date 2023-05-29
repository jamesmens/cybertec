import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams,useNavigate } from "react-router-dom";

import { CheckCircle } from "react-bootstrap-icons";
import { CircleSpinner } from "react-spinners-kit";
import {ComfirmUser } from "../../store/actions/adminActions";

const ConfirmAccount = () => {
  const [searchParams] = useSearchParams();
const token = searchParams.get("t");
const dispatch = useDispatch();
  const notifications =useSelector((value)=>value.notification);
  const [loading,setload]=useState(false)
  const navigate=useNavigate()
  useEffect(()=>{
    
    if(notifications && notifications.notice){
      if(notifications.success){
        setload(false) 
        navigate("/")
      }}
  })
  const Comfirmme=()=>{
    setload(true)
    dispatch(ComfirmUser({t:token}))
   
  }


  return (
    <div  className="mainLayout" style={{minHeight:`${window.innerHeight}px`}}>
      <p className="verifypage">
        please click on{" "}
        <span style={{ fontFamily: "Tapestry", color: "blue" }}>Verify me</span>{" "}
        to complete process
      </p>
      <div
        style={{ width: "100%", display:"flex", justifyContent: "center" ,alignItems: "center" }}
        
      >
        {
          loading ?
          <CircleSpinner color="white"/>:
          <span onClick={
            ()=>{Comfirmme()}
          } className="verifyme"><CheckCircle/>   Verify me</span>

        }
    
     
      </div>
      <div className="footer">
        <div className="frontitemhover">
        <p>
          Powered By Cybertec Inc<span style={{ color: "green" }}> @ </span>{" "}
          2023
        </p>

        </div>
       
      </div>
    </div>
  );
};

export default ConfirmAccount;
