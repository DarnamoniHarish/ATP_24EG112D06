import exp from 'express'
import { connect } from 'mongoose';
import { config } from 'dotenv';
import { employeeApp } from './API/employeeAPI.js';
import cors from 'cors'

const app=exp()

//add cors middleware
app.use(
    cors({
        origin:["http://localhost:5173"],
    }),
);

//body parser middleware
app.use(exp.json());

config();

app.use("/employee-api",employeeApp);

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
        console.log("err in DB connection",err.message)
    }
 }

 //error handling middleware
app.use((err, req, res, next) => {
  console.log("err in middleware:", err.message);

  res.status(err.status || 500).json({
    message: "error",
    reason: err.message,
  });
});

 connectDB()