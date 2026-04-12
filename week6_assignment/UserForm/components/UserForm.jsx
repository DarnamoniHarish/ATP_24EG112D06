import { useForm } from "react-hook-form";
import { useState } from "react";

function UserForm(){

    const [users,setUsers]=useState([]);
    const {register,handleSubmit,formState:{errors}}=useForm();

    const onFormSubmit=(newUserObj)=>
    {
        console.log(newUserObj)
        setUsers([...users,newUserObj]);
    }

    console.log(users)

    return(
        <div className="bg-blue-400">
            <h1 className="text-5xl text-center">User Form</h1>
            <form className="max-w-md mx-auto mt-10 bg-amber-500" onSubmit={handleSubmit(onFormSubmit)}>
                {/*name */}
                <div className="mb-3">
                    <label htmlFor="firstName">firstName</label>
                    <input type="text" 
                    {...register("firstName",
                        {
                            required:"firstName Required",
                            validate:(v)=>v.trim().length!=0 || "White Spaces are not allowed"
                        }
                    )} 
                    id="firstName" className="border w-full p-3" />

                    {errors.firstName?.type=="required" && <p className="text-red-500">{errors.firstName.message}</p>}
                    {errors.firstName?.type=="validate" && <p className="text-red-500">{errors.firstName.message}</p>}
                </div>

                {/* email */}
                <div>
                    <label htmlFor="email">email</label>
                    <input type="email" {...register("email",
                        {
                            required:"email required",
                            validate:(v)=>v.trim().length!=0 || "White Spaces are not allowed"
                        }
                    )} id="email" className="border w-full p-3" />

                    {errors.email?.type=="required" && <p className="text-red-500">{errors.email.message}</p>}
                    {errors.email?.type=="validate" && <p className="text-red-500">{errors.email.message}</p>}

                </div>

                {/* date of birth */}
                <div>
                    <label htmlFor="dateOfBirth">dateOfBirth</label>
                    <input type="date" {...register("dateOfBirth")} id="dateOfBirth" className="border w-full p-3" />
                </div>
                <button type="submit" className="bg-pink-500 mx-auto block mt-5">Add User</button>
            </form>
            <div>
                    <h1 className="text-4xl text-center text-white mt-4">List Of Users</h1>
                       <table className="mx-auto mt-5 border text-3xl">
                        <thead>
                            <tr>
                                <th>firstName</th>
                                <th>Email</th>
                                <th>dateOfBirth</th>
                            </tr>
                        </thead>
                        <tbody className="border">
                            {
                                users.map((userObj,index)=>(
                                   <tr key={index} className="text-white text-2xl">
                                       <td>{userObj.firstName}</td>
                                       <td>{userObj.email}</td>
                                       <td>{userObj.dateOfBirth}</td>
                                    </tr>
                                ))
                           }
                        </tbody>
                       </table>
                </div>
        </div>
    )
}

export default UserForm