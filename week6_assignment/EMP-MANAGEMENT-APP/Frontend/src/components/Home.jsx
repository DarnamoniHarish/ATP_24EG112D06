import { useContext } from "react"
import { counterContextObj } from "../Contexts/ContextProvider"
import Test from "./Test"
import { useCounterStore } from "../Store/CounterStore.js"

function Home() {

  //call useCounterStore hook to get state of zustand store
  const newCounter=useCounterStore((state)=>state.newCounter);
  const incrementCounter=useCounterStore((state)=>state.incrementCounter);
  const ChangeCount=useCounterStore((state)=>state.ChangeCount);

  const {counter,changeCounter}=useContext(counterContextObj)
  console.log("Home")

  return (
    <div>
      <h1 className="text-4xl">Counter:{counter}</h1>
      <button onClick={changeCounter} className="bg-green-300 p-5">Change</button>

      <h1 className="text-4xl">New Counter:{newCounter}</h1>
      <button onClick={incrementCounter} className="bg-green-300 p-5">increment Counter</button>

      <Test/>
    </div>
  )
}

export default Home
