import React from 'react'
import { Space } from 'antd'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../context/Auth'

const Header = () => {
  const {isAuth}=useAuthContext()

  return (
<header>
    <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
  <div className="container">
    <Link to="/" style={{fontFamily:"cursive"}} className="navbar-brand" >MERN Stack Project</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to="/" style={{fontFamily:"cursive"}} className="nav-link active" aria-current="page" href="#">Home</Link>
        </li>
      
       
      </ul>
        <div className="ms-auto">

        {!isAuth
        ?<Space>
          <Link to="/auth/register" style={{fontFamily:"cursive"}} className='btn btn-outline-success'>Register</Link>
          <Link to="/auth/login" style={{fontFamily:"cursive"}} className='btn btn-outline-success'>Login</Link>
        </Space>
        : <Link to="/dashboard/todo/all" className='btn btn-outline-success' style={{fontFamily:"cursive"}}>Dashboard</Link>
        }
        </div>


      
    </div>
  </div>
</nav>
</header>
  )
}

export default Header