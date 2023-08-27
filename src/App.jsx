import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GetAllMovie } from './redux/slice/movie';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login'
import Admin from './pages/admin';



const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetAllMovie())
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes> 

            {/* for dashboard  */}
            <Route path='/' element={<Home />} /> 

          {/* admin dashboard (after login will be open) */} 
            <Route path='admin' element={localStorage.getItem("user") ? <Admin /> : <Login />} /> 


        </Routes>
      </BrowserRouter >
    </>
  )

}
export default App;