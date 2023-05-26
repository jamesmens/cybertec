import axios from  "axios"
import * as notify from "./notification"

const { USER_DETAIL ,USERS,NEW_USER,PRE_REGISTER} = require("../type");

export const get_users=(detail)=>({
type:USERS,
payload:detail
})

export const pre_register=(data)=>({
    type:PRE_REGISTER,
    payload:data
    })




export const userDetail=(data)=>({
type:USER_DETAIL,
payload:data
})




axios.defaults.headers.post["Content-Type"]="application/json"
/** my details */
export const getAllUsers=()=>{
    return async(dispatch)=>
{
try { 
    
    const content =await axios.get("/user/alluser");
   dispatch(get_users(content.data))

} catch (error) {


    
}
}
}




export const preRegister=(userdata)=>{
    return async (dispatch,getdispatch)=>{
try {
    const newd=await axios.post("/user/preregister",userdata);
    dispatch(pre_register(newd.data))
    
} catch (error) {


    console.log(error.response.data);
    
}




    }
}



export const comfirmUser=(data,id)=>{
    return async(dispatch)=>{

        try {
            const newUser= await axios.post("/user/createuser",data,
        );
            dispatch(userDetail(newUser.data))
            dispatch(notify.notify_success({msg:"Account verified"}))

        } catch (error) {
            dispatch(notify.notify_error({msg:error.response.data}))
            
        }
    }
}


export const updateAccount=(data,id)=>{
    return async(dispatch)=>{

        try {
            const profiledetail = await axios.patch(`/user/modifyuser:${id}`,data);
            dispatch(userDetail(profiledetail.data))
            dispatch(notify.notify_success({msg:"Account Updated"}))

        } catch (error) {
            dispatch(notify.notify_error({msg:error.response.data}))
            
        }
    }
}


export const SignIn=(data)=>{
    return async(dispatch)=>{

        try {
            const profiledetail = await axios.patch("/user/signin",data);
            dispatch(userDetail(profiledetail.data))
            dispatch(notify.notify_success({msg:"Account Updated"}))

        } catch (error) {
            dispatch(notify.notify_error({msg:error.response.data}))
            
        }
    }
}


export const AutoLogin=(data)=>{
    return async(dispatch)=>{

        try {
            const profiledetail = await axios.patch("/user/profile");
            dispatch(userDetail(profiledetail.data))
          

        } catch (error) {
            dispatch(notify.notify_error({msg:error.response.data}))
            
        }
    }
}


