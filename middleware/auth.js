const express=require("express")
require("dotenv").config();
const jwt=require("jsonwebtoken")

const {User,Driver}=require("../models/users")
const {Admin}=require("../models/users")
exports.checkToken=async (req,res,next)=>{
  try {
      if(req.headers["auth-user"]){
        const {_id,expiresIn}=jwt.verify(req.headers["auth-user"],process.env.DB_SECRET);
        console.log(_id)
         const account=await User.findById({"_id":_id})
       
        
         
          if(account){
            res.locals.userData=await User.findById({"_id":_id})
           }
       
          
           
         
         
        
     
        next();
  
      }


      else{
          next()
      }
  
  
      
  } catch (error) {
      res.status(401).send({error:"bad token"})
      
  }
  }
  
exports.Checkuser= async(req,res,next)=>{
  const user=res.locals.userData;
 
  req.user=user
  next();
}
  