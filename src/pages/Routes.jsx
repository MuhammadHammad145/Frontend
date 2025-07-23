import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Frontend from './Frontend/Home'
import Auth from './Auth'
import Dashboard from './Dashboard'
import { useAuthContext } from '../context/Auth'
import PrivateRoute from '../components/PrivateRoute'

const Index = () => {

  const {isAuth}=useAuthContext()

  // const token=localStorage.getItem("jwt")
  return (
    <Routes>
        <Route path='/' element={isAuth  ?<Frontend/> :<Navigate to={"/auth/register"}/>}/>
        <Route path='auth/*' element={!isAuth  ?<Auth/> :<Navigate to={"/"}/>}/>
        <Route path='dashboard/*' element={<PrivateRoute Component={Dashboard}/>}/>
    </Routes>
  )
}

export default Index