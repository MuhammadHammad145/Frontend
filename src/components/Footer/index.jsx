import React from 'react'
import { Col, Row,Typography } from 'antd'



const {Paragraph}=Typography
const Footer = () => {
    const year = new Date().getFullYear()

    return (
        <footer className='bg-primary m-0 p-0'>
            <div className="container">
                <Row>
                    <Col span={24}>
                        <Paragraph className='text-center text-white m-0 py-2'>
                            &copy; {year} All rights are reserved.
                        </Paragraph>
                    </Col>
                </Row>
            </div>
        </footer>
    )
}

export default Footer