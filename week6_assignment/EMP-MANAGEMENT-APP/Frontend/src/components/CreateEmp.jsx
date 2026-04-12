import {useForm} from "react-hook-form"
import { useState } from 'react';
import { useNavigate } from 'react-router';

function CreateEmp() {

    const [loading,setLoading]=useState(false);
    const [error,setError]=useState("");
    const navigate=useNavigate();

    const {register,handleSubmit,formState:{errors}}=useForm();

    //form submit
    const onFormSubmit=async(newEmpObj)=>{
        try{
            setLoading(true);
            //make HTTP post req
            let res=await fetch("http://localhost:5000/employee-api/employee",
                {
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify(newEmpObj)
                }
            )
            if(res.status==201){
              //navigate to employees component programatically
              navigate("/list");
            }
            else
            {
              let errorRes=await res.json();
              console.log("error responce is ",errorRes);
              throw new Error(errorRes.reason)
            }
          }
        catch(err){
          console.log("err in catch ",err)
          //deal with err
          setError(err.message);
        }
        finally{
          setLoading(false);
        }
      };
      //console.log(error.message);

      if(loading){
        return <p className="text-center text-4xl">Loading....</p>;
      }

      if (error) {
        return <p className="text-red-500 text-center text-3xl">{error}</p>;
      }

  return (
    <div>
      <h1 className='text-5xl text-center text-gray-300'>Create new Employee</h1>
      {/* form */}
      <form className="max-w-md mx-auto mt-10" onSubmit={handleSubmit(onFormSubmit)}>
        <input type="text" {...register("name")} placeholder='enter your name' className="mb-3 border w-full p-3 rounded-2xl" />
        <input type="text" {...register("email")} placeholder='enter your email' className="mb-3 border  w-full p-3 rounded-2xl" />
        <input type="number" {...register("mobile")} placeholder='enter your number' className="mb-3 border  w-full p-3 rounded-2xl" />
        <input type="text" {...register("designation")} placeholder='enter your designation' className="mb-3 border w-full p-3 rounded-2xl" />
        <input type="text" {...register("companyName")} placeholder='enter companyName' className="mb-3 border w-full p-3 rounded-2xl" />

        <button type="submit" className="text-2xl rounded-2xl bg bg-gray-600 text-white block mx-auto p-4">Add Employee</button>
      </form>
    </div>
  )
}

export default CreateEmp
