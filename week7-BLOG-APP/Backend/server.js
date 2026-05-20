import exp from 'express'
import {config} from 'dotenv'
import { connect } from 'mongoose'
import { userApp } from './APIs/UserAPI.js'
import {commonApp} from './APIs/CommonAPI.js'
import {adminApp} from './APIs/AdminAPI.js'
import { authorApp } from './APIs/AuthorAPI.js'
import cookieParser from 'cookie-parser'
import cors from 'cors';


config()
//create express app
const app=exp()

app.use(cors(
    {
        origin:["http://localhost:5173"],
        credentials:true,

    }
))
//cookie parser
app.use(cookieParser())
//body parser middle ware
app.use(exp.json())

//path level middlewares
app.use("/user-api",userApp);
app.use("/author-api",authorApp);
app.use("/admin-api",adminApp)
app.use("/auth",commonApp)


//connect to DB
 const connectDB=async()=>{
    try{
        await connect(process.env.DB_URL)
        console.log("DB connected")
        //assign port
        const port=process.env.port || 5000
        app.listen(port,()=>console.log(`server listening on ${port}..`))
    }
    catch(err)
    {
        console.log("err in DB connection",err)
    }
 }
 

 // to handle invalid  path
 app.use((req,res,next)=>{
    console.log(req.url)
    res.status(404).json({message:`path ${req.url} is Invalid`})
 })

 //to handle errors
 app.use((err,req,res,next)=>{
    //validationError
    if(err.name=="ValidationError"){
        return res.status(400).json({message:"error occured",error:err.message})
    }

    //CastError
    if(err.name=="CastError"){
        return res.status(400).json({message:"Error Occured",error:err.message})
    }

    const errCode = err.code ?? err.cause?.code ?? err.errorResponse?.code;
  const keyValue = err.keyValue ?? err.cause?.keyValue ?? err.errorResponse?.keyValue;

  if (errCode === 11000) {
    const field = Object.keys(keyValue)[0];
    const value = keyValue[field];
    return res.status(409).json({
      message: "error occurred",
      error: `${field} "${value}" already exists`,
    });
  }

    //send Server side error
    res.status(500).json({message:"error occured",error:err.message})
})
connectDB()