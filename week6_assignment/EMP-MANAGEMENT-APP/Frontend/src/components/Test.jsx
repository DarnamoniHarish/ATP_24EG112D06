import { useContext } from "react"
import { counterContextObj } from "../Contexts/ContextProvider"
import { useCounterStore } from "../Store/CounterStore.js";


function Test() {

    const newCounter1=useCounterStore((state)=>state.newCounter1);
  const incrementCounter1=useCounterStore((state)=>state.incrementCounter1);

  const {counter1,changeCounter1}=useContext(counterContextObj)
console.log('Test');
  return (
    <div>
      <h1 className="text-4xl">Counter1:{counter1}</h1>
      <button onClick={changeCounter1} className="bg-green-300 p-5">Change</button>

      <h1 className="text-4xl">New Counter1:{newCounter1}</h1>
      <button onClick={incrementCounter1} className="bg-green-300 p-5">increment Counter1</button>

    </div>
  )
}

export default Test
