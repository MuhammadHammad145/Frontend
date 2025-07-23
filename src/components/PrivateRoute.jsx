import React from 'react'
import { useAuthContext } from '../context/Auth'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({Component}) => {
    const {isAuth}=useAuthContext()

    if(!isAuth) <Navigate to={"/auth/register"}/>


  return (
   <Component/>
  )
}

export default PrivateRoute