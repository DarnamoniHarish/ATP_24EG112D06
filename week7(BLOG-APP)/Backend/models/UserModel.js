import { Schema,model } from "mongoose";

const userSchema=new Schema({
    firstName:{
        type:String,
        required:[true,"First name is required"],
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"Email already Exists"]
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    role:{
        type:String,
        enum:["USER","AUTHOR","ADMIN"],
        required:[true,"Invalid role"]
    },
    profileImageUrl:{
        type:String
    },
    isUserActive:{
        type:String,
        default:true,
    },
},{
    timestamps:true,
    versionKey:false,
    strict:"throw"
});

//create model
export const UserModel=model("user",userSchema)