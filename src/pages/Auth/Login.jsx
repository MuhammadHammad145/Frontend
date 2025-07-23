import React, { useState } from 'react';
import { Col, Form, Input, Row, Button, message,Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../../context/Auth';


const initialState = { email: "", password: "" }

const {Title}=Typography
const Login = () => {

    const {isAuth,dispatch}=useAuthContext()
    
    const navigate=useNavigate()

    const [state, setState] = useState(initialState)

    const [isProcessing, setIsProcessing] = useState(false)

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleSubmit = () => {

        const {  email, password} = state
        const user = {  email, password}
        setIsProcessing(true)
        axios.post('http://localhost:8000/auth/login',user)
        .then(({status,data})=>{
            if(status === 201){
                message.success(data.message)
                console.log('data.token', data.token)
                localStorage.setItem("jwt",data.token)
                dispatch({
                type: "SET_LOGGED_IN",
                payload: {
                    user: data.user 
                }
            });
            }
        })
        .catch((error)=>{
            message.error(error.response.data.message)
            console.log('error', error)
        })
        .finally(()=>{
            setIsProcessing(false)
        })
        console.log('isAuth', isAuth)
        console.log('user', user)
    }



    return (
        <main className="auth p-3 p-md-4 p-lg-5">
            <div className="card p-3 p-md-4 p-lg-5">
                <Title level={3}>Login</Title>
                <Form layout='vertical'>
                    <Row gutter={16}>
                        
                        <Col span={24}>
                            <Form.Item label="Email" required>
                                <Input type='email' name='email' size='large' placeholder='Enter your Email' onChange={handleChange} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Password" required>
                                <Input.Password name='password' size='large' placeholder='Enter your Password' onChange={handleChange} />
                            </Form.Item>
                        </Col>
                        
                        <Col span={24}>
                            <Button type='primary' htmlType='submit' size='large' block loading={isProcessing} onClick={handleSubmit}>Login</Button>
                        </Col>


                    </Row>
                </Form>
            </div>
        </main>

    )
}

export default Login