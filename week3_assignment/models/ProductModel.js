import { Schema,model } from "mongoose";

const productSchema=new Schema({
    productID:{
        type:String,
        required:[true,"product ID is required"],
        unique:[true,"product id is already exists"]
    },
    productName:{
        type:String,
        required:[true,"product name is required"],
    },
    price:{
        type:Number,
        required:[true,"price should be there"],
        min:[10000,"minimum price is 10000"],
        max:[50000,"Max price is 50000"]
    },
    brand:{
        type:String,
        required:[true,"brand is mandatory"]
    }
},{
    versionKey:false,
    timestamps:true
},
)

export const ProductModel=model("product",productSchema)