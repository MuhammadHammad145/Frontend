import React, { useState } from 'react';
import { Col, Form, Input, Row, Button, message, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" }

const { Title,Paragraph } = Typography
const Register = () => {

    const navigate = useNavigate()

    const [state, setState] = useState(initialState)

    const [isProcessing, setIsProcessing] = useState(false)

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleSubmit = () => {

        const { firstName, lastName, email, password, confirmPassword } = state
        if (confirmPassword !== password) { return message.error("Your password is doesnt match") }

        const fullName = `${firstName} ${lastName}`
        const user = { firstName, lastName, email, password, fullName }
        setIsProcessing(true)
        axios.post("https://back-end-s7bw.vercel.app/auth/register", user)
            .then(({ status, data }) => {
                if (status == 201) {
                    message.success(data.message)
                    console.log('data.user', data.user)
                }
            }).catch((error) => {
                const msg = error.response?.data?.message || "Something went wrong during registration";
                message.error(msg);
                console.log('Register error:', error);
                setIsProcessing(false);
            }).finally(() => {

                setIsProcessing(false)
                navigate("/auth/login")
            })
    }



    return (
        <main className="auth p-3 p-md-4 p-lg-5">
            <div className="card p-3 p-md-4 p-lg-5">
                <Title level={3}>Register</Title>
                <Form layout='vertical'>
                    <Row gutter={16}>
                        <Col xs={24} lg={12}>
                            <Form.Item label="First Name" required>
                                <Input type='text' size='large' placeholder='Enter your First Name' name='firstName' onChange={handleChange} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} lg={12}>
                            <Form.Item label="Last Name">
                                <Input type='text' name='lastName' size='large' placeholder='Enter your Last Name' onChange={handleChange} />
                            </Form.Item>
                        </Col>
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
                            <Form.Item label="Confirm Password" required>
                                <Input.Password name='confirmPassword' size='large' placeholder='Enter your Confirm Password' onChange={handleChange} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Button type='primary' htmlType='submit' size='large' block loading={isProcessing} onClick={handleSubmit}>Register</Button>
                        </Col>
                        <Col span={24}>
                            <Paragraph className='mt-3 text-center'>If already have an account <span style={{color:"blue",cursor:"pointer"}} onClick={()=>navigate("/auth/login")}>Login</span></Paragraph>
                        </Col>


                    </Row>
                </Form>
            </div>
        </main>

    )
}

export default Register