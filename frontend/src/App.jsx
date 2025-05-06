import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Registro from './pages/Registro';
import DashboardAdmin from './pages/dashboard.admin';
import DashboardUsuario from './pages/dashboard.usuario';


function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path='/dashboard.admin' element={<DashboardAdmin/>}/>
        <Route path='/dashboard.usuario' element={<DashboardUsuario/>} />    
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
