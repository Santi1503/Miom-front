import React, { useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
      
        const data = await response.json();
      
        if (data.token) {
          localStorage.setItem('token', data.token); // Guarda el token en el localStorage
          console.log('Login exitoso, token guardado');
        } else {
          console.log('Login fallido');
        }
      }
      

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col md={6}>
                    <h2 className='text-center mb-4'>Welcome to Miom</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Form>
                    <div className="mt-3 text-center">
                        <a href="/register">Don't have an account? Register here</a>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}


export default Login