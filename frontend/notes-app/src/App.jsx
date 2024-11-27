import { Outlet } from 'react-router-dom'
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

function App() {
  const [loading , setLoading] = useState(false);
  const alert = (msg) => {
    toast(msg);
  }
alert()
  return (
    <>
    {/* <Header/> */}
    <ToastContainer autoClose={1500}/>
    <Outlet context={{alert, loading, setLoading}}/>
    </>
  )
}

export default App
