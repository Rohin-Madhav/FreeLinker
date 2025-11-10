import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
     <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        draggable
        theme="light"
        toastClassName={() =>
          "relative flex p-4 rounded-lg bg-white shadow-lg border border-gray-200 text-gray-800 text-sm md:text-base w-[90%] md:w-auto mx-auto"
        }
        bodyClassName={() => "flex items-center gap-2"}
      />
  </StrictMode>,
)
