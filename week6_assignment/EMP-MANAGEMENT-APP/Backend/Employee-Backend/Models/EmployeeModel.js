import { Schema,model } from "mongoose";

const employeeSchema=new Schema({
    name:{
        type:String,
        required:[true,"Employee Name required"],
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true
    },
    mobile:{
        type:Number,
        required:[true]
    },
    designation:{
        type:String,
        required:[true,"designation of employee is required"],
    },
    companyName:{
        type:String,
        required:[true,"Name of the company is required"],
    }
},
{
    strict:"throw",
    versionKey:false,
    timestamps:true,
})

//export model
export const EmployeeModel=model("employee",employeeSchema)