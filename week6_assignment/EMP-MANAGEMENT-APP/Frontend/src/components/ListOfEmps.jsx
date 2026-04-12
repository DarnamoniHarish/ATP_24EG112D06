import { useState,useEffect } from "react"
import { useNavigate } from "react-router";
import axios from "axios";

function ListOfEmps() {

  const [emps,setEmps]=useState([]);
  const navigate=useNavigate();

  const gotoEmployee=(empObj)=>{
    //navigate to employee along with selected employee object
    navigate("/employee",{state:empObj});
  }

  const gotoEditEmployee=(empobj)=>{
    //navigate to employee along with selected employee object
    navigate("/edit-emp",{state:empobj});
  }

  //delete employee
  const deleteEmpById=async (id)=>{
    let res=await axios.delete(`http://localhost:5000/employee-api/employee/${state._id}`)
    if(res.status==200){
      //get employees
      getEmps();
    }
  }

  //get all employees
  async function getEmps() {
      let res=await axios.get("http://localhost:5000/employee-api/employee");
      if(res.status==200){
        let resObj=await res.data;
        setEmps(resObj.payload);
      }
    }

  //get all employees on component loading
  useEffect(()=>{
    getEmps();
  },[])

  return (
    <div>
      <h2 className="text-4xl text-center">List Of Employees</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-8">
        {
            emps.map((empObj)=>(
                <div key={empObj._id} className="bg-white p-5 rounded-2xl text-2xl text-center">
                    <p className="mt-2">{empObj.email}</p>
                    <p className="mb-5">{empObj.name}</p>

                    {/* 3 buttons */}
                    <div>
                      <button onClick={()=>gotoEmployee(empObj)} className="bg-green-600 p-2 rounded-2xl text-white">View</button>
                      <button onClick={()=>gotoEditEmployee(empObj)} className="bg-orange-600 p-2 rounded-2xl text-white">Edit</button>
                      <button onClick={()=>deleteEmpById(id)} className="bg-red-600 p-2 rounded-2xl text-white">Delete</button>
                    </div>
                </div>
            ))
        }
      </div>
    </div>
  )
}

export default ListOfEmps
