// import Login from './views/UserView/Login.jsx'

// import Dashboard from './views/UserView/Dashboard.jsx'

import { BrowserRouter, Route, Routes } from 'react-router-dom';  // Importando librerias de react-router-dom para el manejo de wards ('/')
import Inicio from './components/Inicio';
import Login from './components/Login';


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* MAIN ROUTE '/' */}
        <Route index element={<Inicio />} />
        {/* USUARIO */}
        <Route path='/' element={<Inicio />} />
        <Route path='/login' element={<Login />} />
        {/* <Route path='/services' element={<Services />}/> */}

      </Routes>
    </BrowserRouter >


  )
}


export default App
