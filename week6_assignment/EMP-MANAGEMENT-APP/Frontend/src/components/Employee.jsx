import { useLocation } from "react-router"

function Employee() {

  const {state}=useLocation();

  return (
    <div className="p-16 text-3xl text-center m-auto bg-violet-300 text-white">
      <p>{state.name}</p>
      <p>{state.email}</p>
      <p>{state.mobile}</p>
      <p>{state.designation}</p>
      <p>{state.companyName}</p>
      
    </div>
  )
}

export default Employee
