import { Outlet } from 'react-router-dom';
import './App.css';
import { ToastContainer, toast ,Zoom} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

function App() {
  const baseUrl = "http://localhost:3000/api";

  const [loading, setLoading] = useState(false);

  const alert = (msg) => {
    toast(msg, {
      position: "top-right", 
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)', 
        color: 'white', 
        borderRadius: '8px', 
        boxShadow: '0 4px 10px rgba(255, 255, 255, 0.2)',
        padding: '10px 20px', 
      },
      toastStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Keep dark background for the toast
        color: 'white', // Ensure the text is white
      },
    });
  }

  return (
    <>
      {/* <Header/> */}
      <ToastContainer autoClose={1500} transition={Zoom} />
      <Outlet context={{ alert, loading, setLoading , baseUrl}} />
    </>
  );
}

export default App;
