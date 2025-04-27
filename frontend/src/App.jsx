import React from 'react'
import {Outlet} from 'react-router-dom';
import Navigation from './pages/Auth/Navigation';
import {ToastContainer} from "react-toastify"
const App = () => {

  return (
    <div>
      <ToastContainer/>
      <Navigation/>
      <main className="py-3">
        <Outlet /> 
      </main>
    </div>
  )
}

export default App
