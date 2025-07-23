import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Col, Row,Typography } from 'antd'

const {Title}=Typography
const Frontend = () => {
  return (
    <>
        <Header/>
    <main>
        <div className="container">

       <Row>
        <Col span={24}>
        <Title className='mt-5 ' style={{fontFamily:"cursive"}}>It's my first Project Small Project with MERN Stack</Title>
        </Col>
       </Row>
        </div>
        </main>
        <Footer/>
    </>
  )
}

export default Frontend