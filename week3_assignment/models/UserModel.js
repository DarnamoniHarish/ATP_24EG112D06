//import mongoose
import {Schema,model,Types} from 'mongoose'


//create cart schema (product ,count)
const cartSchema=new Schema({
    product:{
        type:Types.ObjectId,  // we can write without importing (type:Schema.Types.ObjectID)
        ref:"product"  //name of the product Model
    },
    count:{
        type:Number,
        default:1
    }
})

//Generate user schema (username,password,email,age)
const userSchema=new Schema({
    //structure of User resources
    username:{
        type:String,
        required:[true,"username is non empty"],
        minLength:[4,"min length of Username is 4 Chars"],
        maxLength:[6,"username size exceed 6 chars"],
    },
    password:{
        type:String,
        required:[true,"password required"],
    },
    email:{
        type:String,
        required:[true,"email required"],
        unique:[true,"Email already existed"]
    },
    age:{
        type:Number,
        required:[true,"age should required"],
    },
    cart:[cartSchema]  //accepts cart Schema objects only
},{
    versionKey:false,
    timestamps:true
},);

//Generate UserModel
export const UserModel=model("user",userSchema)
