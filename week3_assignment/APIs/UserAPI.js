//create min-express app
import exp from "express"
import {UserModel} from '../models/UserModel.js'
import { hash,compare } from "bcryptjs"
export const userApp=exp.Router()
import jwt from "jsonwebtoken"
import { verifyToken } from "../middlewares/verifyToken.js"
const {sign}=jwt


//user login
userApp.post('/auth',async(req,res)=>{
    const {email,password}=req.body
    const user=await UserModel.findOne({email:email})
    if(!user)
    {
        return res.status(400).json({message:"Inavlid Email"})
    }

    //verify password using compare
    let result=await compare(password,user.password)
    if(!result)
    {
        res.status(400).json({message:"Inavlid Password"})
    }

    const signedToken=sign({email:user.email},process.env.SECRET_KEY,{expiresIn:"1h"})

    //store token as httpcookie
    res.cookie("token",signedToken,{
        httpOnly:true,
        sameSite:"lax",
        secure:false
    })

    res.status(200).json({message:"login successfull",payload:user})
})

//default User REST API routes
//create new user
userApp.post("/users",async(req,res)=>{

    //get new user obj from req
    const newUser=req.body
    //hash the password
    const hashedPassword=await hash(newUser.password,10)
    //replace plain password to hash password
    newUser.password=hashedPassword;
    //create new user document
     const newUserDocument=new UserModel(newUser);

    //save
    const result=await newUserDocument.save();
    console.log("result",result)
    //send response
    res.status(201).json({message:"User created"})
})

//read all users
userApp.get("/users",verifyToken,async(req,res)=>{
    let usersList=await UserModel.find()
    res.status(200).json({message:"users",payload:usersList})
})

//read a user by id
userApp.get("/user",verifyToken,async(req,res)=>{
    //read user email from req
    const emailOfUser=req.user?.email

    //find user by email (current login user)
    const userObj=await UserModel.findOne({email:emailOfUser}).populate("cart.product");
    if(!userObj)
        res.status(404).json({message:"User not found"})
    //send res
    res.status(200).json({message:"user",payload:userObj})
})

//update
userApp.put("/users/:id",async(req,res)=>{
    //get modified user fro req
    const modifiedUser=req.body;
    const uid=req.params.id;
    //hash the password
    const hashedPassword=await hash(modifiedUser.password,10)
    //replace plain password to hash password
    modifiedUser.password=hashedPassword;
    //find user by id & update
    const updatedUser=await UserModel.findByIdAndUpdate(uid,{$set:{...modifiedUser}},{new:true,runValidators:true});
    //send res
    res.status(200).json({message:"User modified",payload:updatedUser})
})

//delete user by id
userApp.delete("/users/:id",async(req,res)=>{
    let uid=req.params.id;
    let deletedUser=await UserModel.findByIdAndDelete(uid)
    if(!deletedUser)
        return res.status(404).json({message:"user not found"})
    res.status(200).json({message:"user deleted",payload:deletedUser})
})


/*userApp.put("/cart/product-id/:pid",verifyToken,async(req,res)=>{
    let pid=req.params.pid
    //get user details
   const emailOfUser=req.user?.email
    //get user from db
    const result=await UserModel.findOneAndUpdate({email:emailOfUser},{$push:{cart:{product:pid}}})
    // if user invalid
    if(!result)
        res.status(404).json({message:"User not found"})
    res.status(200).json({message:"product added to the cart"})
})*/


userApp.put("/cart/product-id/:pid",verifyToken,async(req,res)=>{
    let pid=req.params.pid
    //get user details
   const emailOfUser=req.user?.email
   const user=await UserModel.findOne({email:emailOfUser})
   //before add,first it should check that product is already in the cart
   const id=await user.cart.find({})
   if(id){
    //then increment count to 1
     cart.count=cart.count+1;
   }

    //get user from db
    const result=await UserModel.findOneAndUpdate({email:emailOfUser},{$push:{cart:{product:pid}}})
    // if user invalid
    if(!result)
        res.status(404).json({message:"User not found"})
    res.status(200).json({message:"product added to the cart"})
})