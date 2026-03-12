import exp from 'express'
import {connect} from 'mongoose'
import {userApp} from './APIs/UserAPI.js'
import { UserModel } from './models/UserModel.js'
import { productApp } from './APIs/ProductAPI.js'
import {ProductModel} from './models/ProductModel.js'
import cookieParser from 'cookie-parser'
import { config } from 'dotenv'

config();  //process.env
const app=exp()

app.use(exp.json())

app.use(cookieParser())

app.use("/user-api",userApp)
app.use("/product-api",productApp)

const port=process.env.port || 4000

//connect to DB server
async function connectDB(){
    try{
        await connect(process.env.DB_URL)
        console.log("DB connection success")
        //start server
        app.listen(4000,()=>console.log("server on port 4000..."))
    }
    catch(err)
    {
        console.log("error in DB connection :",err)
    }
}
connectDB();

//error handling middleware
app.use((err,req,res,next)=>{
    //validationError
    if(err.name=="ValidationError"){
        return res.status(400).json({message:"error occured",error:err.message})
    }

    //CastError
    if(err.name=="CastError"){
        return res.status(400).json({message:"Error Occured",error:err.message})
    }

    //send Server side error
    res.status(500).json({message:"error occured",error:"Server side Error"})
})
