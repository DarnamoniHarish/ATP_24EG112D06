import exp from 'express'
import { UserModel } from '../models/UserModel.js'
import {ArticleModel} from '../models/ArticleModel.js'
import {verifyToken} from '../middlewares/VerifyToken.js'
export const authorApp=exp()

//write article 
authorApp.post("/article",verifyToken("AUTHOR"),async(req,res)=>{
    //get article obj from client
    const articleObj=req.body
    let user=req.user
    let author=await UserModel.findById(articleObj.author)
    //cross check emails
    if(author.email!=user.email)
    {
        return res.status(403).json({message:"You are not authorised"})
    }
    if(!author)
    {
        return res.status(404).json({message:"Invalid author"})
    }
    //check role
    if(author.role!="AUTHOR"){
        res.status(403).json({message:"Only author can publish"})
    }
    //create article document
    const articleDoc=new ArticleModel(articleObj)
    //save the Doc
    await articleDoc.save()
    //send response
    res.status(200).json({message:"Article published"})
})

//read own arcticles
authorApp.get("/article",verifyToken("AUTHOR"),async(req,res)=>{
    const authorIdOfToken=req.user?.id
    //get articles by authorId
    const articlesList=await ArticleModel.find({author:authorIdOfToken})
    res.status(200).json({message:"articles",payload:articlesList})
})

//update article
authorApp.put("/article",verifyToken("AUTHOR"),async(req,res)=>{
    //find 
    const authorIdOfToken=req.user?.id
    //get updated article from client
    const {articleId,title,category,content}=req.body
    const updatedArticle=await ArticleModel.findOneAndUpdate(
        {_id:articleId,author:authorIdOfToken},{$set:{title,category,content}},{new:true})
    // if either article id or author not correct
    if(!updatedArticle){
        return res.status(403).json({message:"Not authorised to edit article"})
    }
    //send res.
    res.status(200).json({message:"updated successfully",payload:updatedArticle})
})

//delete article 
authorApp.patch("/article",verifyToken("AUTHOR"),async(req,res)=>{

    const authorIdOfToken=req.user?.id
    //get modified article from client
    const {articleId,isArticleActive}=req.body
    //get article by id
    const articleOfDB=await ArticleModel.findOne({_id:articleId,author:authorIdOfToken})
    //check status
    if(isArticleActive==articleOfDB.isArticleActive)
    {
        return res.status(200).json({message:"Article already is in the same state"})
    }
    articleOfDB.isArticleActive=isArticleActive
    await articleOfDB.save();
    res.status(200).json({message:"Article modified",payload:articleOfDB})
})
