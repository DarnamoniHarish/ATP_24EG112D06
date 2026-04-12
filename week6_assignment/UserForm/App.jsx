//class component
import Navbar from './components/navbar';
import Footer from './components/footer';
import UserForm from './components/UserForm';


function App() {
  //state
  
  console.log("App rendered")
  //return react element
  return (
    
    <div>
      <Navbar />
        <div className='m-16 min-h-screen'>
         < UserForm/>
        </div>
        <Footer />
    </div>
  );
}
export default App;