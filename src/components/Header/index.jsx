import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../context/Auth'
import { Avatar, Button, Space, Tooltip } from 'antd'

const Header = () => {
    const { handleLogout, isAuth } = useAuthContext()
    return (
        <header style={{ fontFamily: 'cursive' }}>
            <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
                <div className="container">
                    <Link to='/' className="navbar-brand" >MERN STACK PROJECT</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to='/' className="nav-link active" aria-current="page" >Home</Link>
                            </li>

                        </ul>
                        {!isAuth
                            ? <Link to="/auth/register" className="btn btn-outline-success">Login</Link >

                            : <div>
                                <Space>
                                    {/* <Tooltip title={user.firstname}><Avatar icon shape='circle'  style={{ objectFit: "cover" }} /></Tooltip> */}
                                    <Button type='primary' danger onClick={() => handleLogout()}>Login</Button >
                                    <Link to="dashboard" className="btn btn-outline-success">Dashboard</Link >
                                </Space>
                            </div>

                        }
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header