import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { useLocation,useNavigate } from "react-router";
import axios from "axios"

function EditEmp() {

  const {
    register,
    handleSubmit,
    formState:{errors},
    setValue,
  }=useForm();

  const navigate=useNavigate();

  //get empObj from navigate hook
  const {state}=useLocation();

  useEffect(()=>{
    setValue("name",state.name);
    setValue("email",state.email);
    setValue("mobile",state.mobile);
    setValue("designation",state.designation);
    setValue("companyName",state.companyName);
  },[])

  //save modified employee
  const saveModifiedEmp=async(modifiedEmp)=>{
    //make HTTP PUT req
    const res=await axios.put(`http://localhost:5000/employee-api/employee/${state._id}`,modifiedEmp)
    if(res.status==200)
    {
      navigate("/list");
    }
  }

  return (
    <div>
      <h1 className='text-5xl text-center text-amber-500'>Edit Employee</h1>
      {/* form */}
      <form className="max-w-md mx-auto mt-10" onSubmit={handleSubmit(saveModifiedEmp)}>
        <input type="text" {...register("name")} placeholder='enter your name' className="mb-3 border w-full p-3 rounded-2xl"  />

        {/* if we dont want to edit paticular element then make it as disable */}
        <input type="text" {...register("email")} placeholder='enter your email' className="mb-3 border  w-full p-3 rounded-2xl" />
        <input type="number" {...register("mobile")} placeholder='enter your number' className="mb-3 border  w-full p-3 rounded-2xl" />
        <input type="text" {...register("designation")} placeholder='enter your designation' className="mb-3 border w-full p-3 rounded-2xl" />
        <input type="text" {...register("companyName")} placeholder='enter companyName' className="mb-3 border w-full p-3 rounded-2xl" />

        <button type="submit" className="text-2xl rounded-2xl bg bg-green-600 text-white block mx-auto p-4">Save</button>
      </form>
    </div>
  )
}

export default EditEmp
