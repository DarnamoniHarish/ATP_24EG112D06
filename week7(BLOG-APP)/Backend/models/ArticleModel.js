import { Schema,model,Types } from "mongoose";


const commentSchema=new Schema({
    user:{
    type:Types.ObjectId,
    ref:"user",
    required:[true,"User ID is required"],
    },
    comments:{
        type:String,
        required:[true,"Enter a comment"]
    },
})
const articleSchema=new Schema({
    author:{
        type:Types.ObjectId,
        ref:"user",
        required:[true,"Author ID is required"]
    },
    title:{
        type:String,
        required:[true,"Title is required"],
    },
    category:{
        type:String,
        required:[true,"Category is required"]
    },
    content:{
        type:String,
        required:[true,"Content is required"]
    },
    isArticleActive:{
        type:Boolean,
        default:true,
    },
    comments:[{type:commentSchema,default:[]}],
},{
    timestamps:true,
    versionKey:false,
    strict:"throw"
})

export const ArticleModel=model("article",articleSchema)