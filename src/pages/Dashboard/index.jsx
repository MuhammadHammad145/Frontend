import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Todo from './Todo'

const Dashboard = () => {
  return (
    <Routes>
      <Route index element={<Navigate to={"/dashboard/todo/add"}/>}/>
      <Route path='todo/*' element={<Todo/>}/>
    </Routes>
  )
}

export default Dashboard