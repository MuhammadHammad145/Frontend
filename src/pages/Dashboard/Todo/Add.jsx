import React, { useState } from 'react';
import { Col, Form, Input, Row, Button, Typography, message} from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const initialState = { title: "", location: "", description: "" }

const { Title } = Typography;

const Add = () => {

  const navigate = useNavigate()



  const [state, setState] = useState(initialState)

  const [isProcessing, setIsProcessing] = useState(false)




  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const getRandomId = () => Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)

  const handleSubmit = (e) => {

    e.preventDefault()

    let { title, location, description } = state
    console.log('state', state)
    const id=getRandomId()
    const todo = { id, title, location, description }
 const token = localStorage.getItem("jwt")
        const config = { headers: { Authorization: `Bearer ${token}` } }
    console.log('todo', todo)
    setIsProcessing(true)
    axios.post("http://localhost:8000/todo/post",todo,config)
    .then(({status,data})=>{
      if(status == 200){
        message.success(data.message)
      }
    }).catch((error)=>{
      console.log('error', error)
      message.error(error.response?.data?.error)
      setIsProcessing(false)
      
    }).finally(()=>{
      setIsProcessing(false)

    })

  }

 

 


  return (
    <main className="auth p-3 p-md-4 p-lg-5">
      <div className="card p-3 p-md-4 p-lg-5">
        <Title level={3}>Add Todos</Title>
        <Form layout='vertical'>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Title" required>
                <Input type='text' size='large' placeholder='Enter your title' name='title' onChange={handleChange} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Location">
                <Input type='text' size='large' placeholder='Enter your location' name='location' onChange={handleChange} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Description">
                <Input.TextArea size='large' placeholder='Enter your Email' name='description' rows={5} style={{ resize: "none" }} onChange={handleChange} />
              </Form.Item>
            </Col>
           
            

            <Col xs={24} lg={12} >


              <Button type='primary' className='md-m-2 sm-m-2 xs-m-2 ' htmlType='submit' size='large' block loading={isProcessing}  onClick={handleSubmit}>Add</Button>
            </Col>
            <Col xs={24} lg={12}>
              <Button type='primary' size='large' block  onClick={() => { navigate("/dashboard/todo/all") }}>Show All Todos</Button>

            </Col>
            
           

    
           



          </Row>
        </Form>
      </div>
    </main>


  )
}

export default Add