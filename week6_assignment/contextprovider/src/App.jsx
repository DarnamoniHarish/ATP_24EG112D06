import EditCounter1 from "./components/EditCounter1";
import EditCounter2 from "./components/EditCounter2";
import EditCounter3 from "./components/EditCounter3";
import EditCounter4 from "./components/EditCounter4";


function App() {
  return (
    <div className="grid grid-cols-2 gap-4 bg-pink-400 border min-h-screen mx-12 my-7">
      <EditCounter1/>
      <EditCounter2/>
      <EditCounter3/>
      <EditCounter4/>

    </div>
  )
}

export default App;
