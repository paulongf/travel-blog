import {Outlet} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';

function App() {


  return (

   <>
    <div className='bgPrimary min-h-screen flex flex-col'>
      <Navbar/>
      <div className='flex-grow'>
        <Outlet/>
      </div>
      <footer className='m-auto bg-white w-full text-center py-3'>Footer</footer>
    </div>
   </>
    
  )
}

export default App
