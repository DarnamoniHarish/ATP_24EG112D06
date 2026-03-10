//import exp from 'express'
//const app=exp() //app expression contains http server

import exp from 'express'
export const productApp=exp.Router()


let products=[]

productApp.get('/product',(req,res)=>{
        //read all products & send response
        res.json({message:"all products",payload:products})
    })


productApp.post('/product',(req,res)=>{
        //get user from client
        const newProduct=req.body
        //push
        products.push(newProduct)
        //send res
        res.json({message:"Product created"})
    })

    productApp.put('/product',(req,res)=>{
        let modifiedProduct=req.body
        let index=products.findIndex(productobj=>productobj.id==modifiedProduct.id)
        if(index==-1)
            return res.json({message:"product not found"})
        products.splice(index,1,modifiedProduct)
        //send res 
        res.json({message:"updated product"})
    })

    productApp.delete('/product/:id',(req,res)=>{
        let idOfUrl=Number(req.params.id)
        let index=products.findIndex(obj=>obj.id==idOfUrl)
        if(index==-1)
            return res.json({message:"product not found"})
        products.splice(index,1)
        res.json({message:"product deleted"})
    })

    productApp.get('/product/:brand',(req,res)=>{
        let brandOfUrl=req.params.brand
        let product=products.find(obj=>obj.brand==brandOfUrl)
        if(product==undefined)
            return res.json({message:"product not found"})
        res.json({message:"product",payload:products})
    })