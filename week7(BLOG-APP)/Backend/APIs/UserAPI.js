import exp from 'express'
import { verifyToken } from '../middlewares/VerifyToken.js'
import { ArticleModel } from '../models/ArticleModel.js'
export const userApp=exp()

//read articles of all authors
userApp.get("/articles",verifyToken("USER"),async(req,res)=>{
    //read articles
    const articlesList=await ArticleModel.find({isArticleActive:true})
    //send res
    res.status(200).json({message:"articles",payload:articlesList})
})

//add comment to an article
userApp.put("/articles",verifyToken("USER"),async(req,res)=>{
    //get body from client
    const {articleId,comment}=req.body
    //check article
    const articleDocument=await ArticleModel.findOne({ _id:articleId,isArticleActive:true}).populate("comments.user");
    if(!articleDocument)
    {
        return res.status(404).json({message:"Article Is not found"})
    }
    //get user id
    const userId=req.user?.id;
    //add comment
    articleDocument.comments.push({user:userId,comment:comment})
    await articleDocument.save()
    //send res
    res.status(200).json({message:"comment added successfully",payload:articleDocument})
})