import { useContext } from "react"
import { counterContextObj } from "../contexts/ContextProvider"

function EditCounter2() {
   const {counter,increment,decrement}=useContext(counterContextObj)
  return (
     <div className="text-3xl text-center border mx-32 my-16 bg-amber-600">
      <h1>Edit Counter-2</h1>
      <h1 className="mt-11">{counter}</h1>
      <div className="m-auto ">
        <button className="bg-violet-500 p-2" onClick={increment}>+</button>
        <button className="bg-violet-500 p-2" onClick={decrement}>-</button>
      </div>
    </div>
  )
}

export default EditCounter2
