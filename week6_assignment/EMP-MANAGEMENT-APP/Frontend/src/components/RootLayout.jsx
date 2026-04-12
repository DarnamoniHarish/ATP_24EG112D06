import { Outlet } from 'react-router'
import Header from './Header'


function RootLayout() {
    
  return (
   <div>
    <Header/>
    <main className='min-h-screen mx-20 p-20 bg-gray-200'>
        <Outlet/>
    </main>
   </div>
  )
}

export default RootLayout
