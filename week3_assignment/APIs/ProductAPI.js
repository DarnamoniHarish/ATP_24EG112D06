import exp from "express"
import { hash } from "bcryptjs"
import {ProductModel} from '../models/ProductModel.js'
import jwt from "jsonwebtoken"
import { verifyToken } from "../middlewares/verifyToken.js"
const {sign}=jwt

export const productApp=exp.Router();

// make products authenticate
productApp.post("/auth",async(req,res)=>{
    const {productID}=req.body
    const product=await ProductModel.findOne({productID:productID})
    if(!product)
        return res.status(400).json({message:"Invalid product"})

    const signedToken=sign({productID:product.productID},"Harish",{expiresIn:"1h"})

    res.cookie("token",signedToken,{
        httpOnly:true,
        sameSite:"lax",
        secure:false
    })
    res.status(200).json({message:"product is available",payload:product})
    
})

//create products
productApp.post("/product",async(req,res)=>{
    //get product obj
    const newProduct=req.body
    //create product document
    const newProductDocument=new ProductModel(newProduct);
    //save
    const result=await newProductDocument.save();
    console.log("result",result);
    //send
    res.status(201).json({message:"Product Created"})
})

//read all products
productApp.get("/product",verifyToken,async(req,res)=>{
    const productList=await ProductModel.find()
    res.status(200).json({message:"products",payload:productList})
})

//read product by productid
productApp.get("/product/:productID",async(req,res)=>{
    const pid=req.params.productID
    const productObj=await ProductModel.findOne({productID:pid});
    if(!productObj)
        res.status(404).json({message:"product not found"})
    res.status(200).json({message:"product",payload:productObj})
})

//update product by productID
productApp.put("/product/:productID",async(req,res)=>{
    const modifiedProduct=req.body
    const pid=req.params.id
    const updatedProduct=await ProductModel.findOneAndUpdate(pid,{$set:{...modifiedProduct}},{new:true,runValidators:true})
    res.status(200).json({message:"product updated",playload:updatedProduct})
})

//delete product by productID
productApp.delete("/product/:id",async(req,res)=>{
  const pid=req.params.id
  const deletedProduct=await ProductModel.findOneAndDelete({productID:pid})
  if(!deletedProduct)
  {
    res.status(404).json({message:"Product not found"})
  }
  res.status(200).json({message:"product deleted"})
})