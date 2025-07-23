import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Form, Input, message, Row, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Typography } from 'antd';
import axios from 'axios';



const initialState = { title: "", location: "", description: "" }

const { Title } = Typography;
const All = () => {



    const [todos, setTodos] = useState([])

    const [state, setState] = useState(initialState)

    const [selectedTodo, setSelectedTodo] = useState(null)

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const [isLoading, setIsLoading] = useState(false)

    let navigate = useNavigate()

    const getTodos = useCallback( () => {
        const token = localStorage.getItem("jwt")
        const config = { headers: { Authorization: `Bearer ${token}` } }
        setIsLoading(true)
        axios.get(`http://localhost:8000/todo/get`, config)
            .then(({ status, data }) => {
                if (status == 200) {
                    setTodos(data.todo)
                    message.success("todo get success fully")
                    console.log('todos', todos)
                }
            }).catch((error) => {
                console.error('error', error)
                message.error(error.response?.data?.error)


            }).finally(() => {
                setIsLoading(false)
            })
    }, [])

    useEffect(() => {
        const token = localStorage.getItem("jwt")
        if (token) {
            getTodos()
        }
    }, [getTodos])



    const handleUpdate =  (todo) => {
        let { title, location, description } = state

        const updateDate = { title, location, description }
        // setState(todo)
        const token = localStorage.getItem("jwt")
        const config = { headers: { Authorization: `Bearer ${token}` } }
        try {

            axios.patch(`http://localhost:8000/todo/update/${todo.id}`, updateDate, config)
            const updateDocuments = todos.map(item => {
                if (item.id === todo.id)
                    return { ...todo, ...updateDate }
                return item
            })
            
            setTodos(updateDocuments)
            
            
           

            message.success("Todo update success fully")


        } catch (error) {
            message.error("Some thing went wrong while updating the todo")
            console.error("Some thing went wrong while updating the todo", error);
        }

    }
    const handleDelete = (todo) => {
        try {
            const token = localStorage.getItem("jwt")
            const config = { headers: { Authorization: `Bearer ${token}` } }
            axios.delete(`http://localhost:8000/todo/delete/${todo.id}`, config)

            const filteredDocument = todos.filter(item => item.id !== todo.id)

            setTodos(filteredDocument)

            message.success("Todo delete successfully")

        } catch (error) {
           message.error("Some thing went wrong while deleting the todo")
            console.error("Some thing went wrong while deleting the todo", error);
        }
    }


     

    return (

        <>
            <div className="container" style={{fontFamily:"cursive"}}>
                <Row>
                    <Col span={24}>
                        <Title className='text-center py-5'  style={{fontFamily:"cursive"}}> Show All Todo</Title>
                    </Col>
                    <Col span={24}>

                        <div className="table-responsive" >
                            <table className="table"  style={{fontFamily:"cursive"}}>
                                <thead>
                                    <tr>
                                        <th >#</th>

                                        <th >Title</th>
                                        <th >Location</th>
                                        <th >Description</th>

                                        <th >Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {todos.map((todo, i) => {
                                        return (
                                            <tr key={i}>
                                                <th >{i + 1}</th>

                                                <td>{todo.title}</td>
                                                <td>{todo.location}</td>
                                                <td>{todo.description}</td>

                                                <td><Space>
                                                    <button type="button" className="btn btn-primary " data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setSelectedTodo(todo);setState(todo) }}>
                                                        U
                                                    </button>
                                                    <Button size='large' type='primary' danger onClick={() => { handleDelete(todo) }} >D</Button>
                                                </Space></td>

                                            </tr>

                                        )
                                    })}


                                </tbody>
                            </table>
                        </div>
                    </Col>

                </Row>
                <Row className='d-flex justify-content-center'>
                    <Space>

                        <Button type='primary' size='large' style={{ maxWidth: "150px", textAlign: "center",fontFamily:"cursive" }} onClick={() => { navigate("/dashboard/todo/add") }}>Add Todos</Button>

                        <Button type='primary' size='large' style={{ width: "150px", textAlign: "center",fontFamily:"cursive" }} onClick={() => { navigate("/") }}>Go TO Home Page</Button>
                    </Space>
                </Row>
            </div>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Form layout='vertical'>

                                <Row gutter={8}>
                                    <Col span={24}>
                                        <Form.Item label="Title" required>
                                            <Input type='text' size='large' placeholder='Enter your title' value={state.title} name='title' onChange={handleChange} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item label="Location">
                                            <Input type='text' size='large' placeholder='Enter your location' value={state.location} name='location'  onChange={handleChange} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item label="Description">
                                            <Input size='large' placeholder='Enter your Email' name='description' value={state.description}  rows={5} style={{ resize: "none" }} onChange={handleChange} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Button type='primary' htmlType='submit' size='large' data-bs-dismiss="modal" loading={isLoading} block onClick={() => {
                                            handleUpdate(selectedTodo)
                                        }}>Add</Button>
                                    </Col>

                                </Row>
                            </Form>
                        </div>

                    </div>
                </div>
            </div >
        </>
    )
}

export default All