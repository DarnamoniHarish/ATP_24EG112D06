import exp from "express"
import { EmployeeModel } from "../Models/EmployeeModel.js"
export const employeeApp=exp.Router()



employeeApp.post('/employee',async(req,res)=>{
    const newEmployee=req.body;
    const newEmployeeDocument=new EmployeeModel(newEmployee);

    const result=await newEmployeeDocument.save();
    console.log("result",result);

    res.status(201).json({message:"employee Created"})
});

//read all employees
employeeApp.get("/employee",async(req,res)=>{
    const employeeList=await EmployeeModel.find()
    res.status(200).json({message:"List of Employees",payload:employeeList})
})

//update employee
employeeApp.put("/employee/:id",async(req,res)=>{
    const modifiedemployee=req.body
    const eid=req.params.id
    let updatedEmployee=await EmployeeModel.findByIdAndUpdate(eid,{$set:{...modifiedemployee}},{returnDocument:"after"});
    if(!updatedEmployee){
        return res.status(404).json({message:"Employee not found"});
    }
    res.status(200).json({message:"employee updated",playload:updatedEmployee})
})

//delete emp by id
employeeApp.delete("/employee/:id",async(req,res)=>{
    let deletedEmp=await EmployeeModel.findByIdAndDelete(req.params.id);
    if(!deletedEmp){
        return res.status(404).json({message:"employee not found"});
    }
    res.status(200).json({message:"employee deleted",payload:deletedEmp});
})