import exp from 'express'
import { UserModel } from '../models/UserModel.js'
import { hash,compare } from 'bcryptjs'
import jwt from "jsonwebtoken"
import { verifyToken } from '../middlewares/VerifyToken.js';
import { ArticleModel } from '../models/ArticleModel.js';
const {sign}=jwt;
export const commonApp=exp.Router()
import { upload } from '../config/multer.js';
import { uploadToCloudinary } from '../config/cloudinaryUpload.js';
import { config } from 'dotenv';
import cloudinary from '../config/cloudinary.js';
config();

//Route for register
commonApp.post('/users',upload.single("profileImageUrl"),async(req,res)=>{
    try{
    let allowedRoles=["USER","AUTHOR"]
    //get user from req
    const newUser=req.body
    //check role
    if(!allowedRoles.includes(newUser.role)){
        return res.status(400).json({message:"Invalid role"})
    }

    let cloudinaryResult;
    //upload image to cloudinary from memoryStorage
    if(req.file){
        cloudinaryResult=await uploadToCloudinary(req.file.buffer);
    }
    
    //add CDN link(secure_url)of image to newUserObj
    newUser.profileImageUrl=cloudinaryResult?.sec

    //hash password and replace plain with hashed  one
    newUser.password=await hash(newUser.password,12) 
    //create new user document
    const newUserDoc=new UserModel(newUser)
    //save document
    await newUserDoc.save()
    //send res
    res.status(201).json({message:"user created successfully"})
   }
   catch(err){
    //delete image from cloudinary
    await cloudinary.uploader.destroy(cloudinaryResult.public)
   }
})

//Route for login (user, admin,author)
commonApp.post("/login",async(req,res)=>{
    //roles accepted to login
    //const allowedRoles=["USER","AUTHOR","ADMIN"]
    //get user credential obj
    const {email,password}=req.body
    const user=await UserModel.findOne({email:email})
    if(!user)
        return res.status(400).json({message:"Invalid Email"})
    
    //verify password using compare
    const isMatched=await compare(password,user.password)
    if(!isMatched)
        return res.status(400).json({message:"Invalid Password"})
    //create jwt
    const signedToken=sign(
        {
            id:user._id,
            email:email,
            role:user.role,
            firstName:user.firstName,
            lastName:user.lastName,
            profileImageUrl:user.profileImageUrl
        },
        process.env.SECRET_KEY,
        {expiresIn:"1h"})
    res.cookie("token",signedToken,{
        httpOnly:true,
        sameSite:"lax",
        secure:false
    })
    //remove password from user doc
    let userObj=user.toObject()
    delete userObj.password
    //send res
    res.status(200).json({message:"login successfull",payload:userObj})
})

//logout 
commonApp.get("/logout",async(req,res)=>{
    //delete token from cookie storage
    res.clearCookie("token",{
        httpOnly:true,
        secure:false,
        sameSite:"lax"
    })
    res.status(200).json({message:"logout success"})
})

//read articles by user,admin
commonApp.get("/user",verifyToken("AUTHOR"),async(req,res)=>{
    // get article by id
    const articleIdOfToken=req.article?._id
    const articlesList=await ArticleModel.findById({_id:articleIdOfToken})
    //send res
    res.status(200).json({message:"articles list",payload:articlesList})
})

commonApp.put("/password",verifyToken("USER","AUTHOR","ADMIN"),async(req,res)=>{
    const {currentPassword,newPassword}=req.body;
    //check current password and new password are same
    if(currentPassword==newPassword)
        res.status(400).json({message:"New password and Current password is same"})
    //get current password of user/admin/author
    const newPasswordDoc=await UserModel.findOneAndUpdate({$set:{password:newPassword}})
    if(!newPasswordDoc)
    {
        res.status(400).json({message:"enter new password"})
    }
    //check current password of req and user are not same
    //hash the new password
    newPassword=await hash(newPassword,12)
    //replace current password of user with hashed password
    newPasswordDoc.password=newPassword
    //save
    await newPasswordDoc.save()
    //send res
    res.status(200).json({message:"Password changed successfully"})

})

//page refresh
commonApp.get("/check-auth",verifyToken("USER","AUTHOR","ADMIN"),(req,res)=>{
    res.status(200).json({
        message:"authenticated",
        payload:req.user,
    })
})