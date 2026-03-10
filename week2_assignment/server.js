// create http server
import exp from 'express'
const app=exp() //app expression contains http server
import {userApp} from './APIs/userAPI.js';
import {productApp} from './APIs/productAPI.js';

//use body parser middleware (inbuilt middleware)
app.use(exp.json())

//create custom middelware
function middelware1(req,res,next){
    //send response from middleware
    //res.json({message:"this is from middleware1"})
    //forward req to next
    console.log("middleware1 is executed")
    //next()
}

function middelware2(req,res,next){
    //send response from middleware
    res.json({message:"this is from middleware2"})
    //forward req to next
    console.log("middleware2 is executed")
    next()
}
//use middleware
app.use(middelware1)
app.use(middelware2)

//forward it to user-api
app.use("/user-api", userApp)
//forward it to product-api
app.use("/product-api", productApp)

// set a port number
const port=3000
//to assign port number to HTTP server
app.listen(port,()=>console.log(`server listening port ${port}...`))

