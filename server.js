const express=require("express")
const mongoose=require("mongoose")
const app=express()
require("dotenv").config()
const bodyParser=require("body-parser")
const cookieParser=require("cookie-parser")
const PORT=process.env.PORT ||3003
const path=require("path")

const MongoUrl=`mongodb+srv://numbonayar:${process.env.DB_PASS}@cluster0.ulrnjef.mongodb.net/?retryWrites=true&w=majority`



const Admin=require("./routers/Admin")



const users=require("./routers/users")
const geo=require("./routers/geo")

const {checkToken}=require("./middleware/auth")

app.use(bodyParser.json())

app.use(cookieParser())
app.use(checkToken)
/// middlewares
app.use("/admin",Admin)
app.use("/user",users)


app.use("/ipaddress",geo)







const DBconnect =async () => {
    try {
        console.log("Starting")
        mongoose.set('strictQuery', false)
        mongoose.connect(MongoUrl) 
        console.log('Mongo connected')
    } catch(error) {
        console.log(error)
        process.exit()
    }
}
DBconnect()


app.listen(PORT,(er,res)=>{
    if(er){
        console.log("express not connected")
    }
    
        console.log(`express server running on ${PORT} `)
    
})

app.use(express.static("client/build"));

if(process.env.NODE_ENV==="production"){
    const path=require("path");
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"client","build","index.html"));

    });

}