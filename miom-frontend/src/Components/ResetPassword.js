import React, { useState } from 'react'
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap'
import '../CSS/Login.css'
import { useLocation, useNavigate } from 'react-router-dom'

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword ] = useState('')
    const [errorMessage, setErrorMessage ] = useState('')
    const [successMessage, setSuccessMessage ] = useState('')
    const navigate = useNavigate()
    const location = useLocation()

    // Obtener el token de la URL
    const searchParams = new URLSearchParams(location.search)
    const token = searchParams.get('token')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage('')
        setSuccessMessage('')

        if (newPassword !== confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden')
            return
        }

        try {
            const response = await fetch ('http://localhost:5000/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword})
            })

            const data = await response.json()

            if(!response.ok) {
                throw new Error(data.msg || 'Error al cambiar la contraseña')
            }

            setSuccessMessage('La contraseña se ha actualizado exitosamente. Redirigiendo al login...')
            setTimeout(() => navigate('/login'), 3000)
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    return (
        <Container fluid className="login-container">
      <Row className="justify-content-center align-items-center h-100">
        <Col xs={12} sm={8} md={6} lg={4}>
          <h2 className="text-center login-header">Crea una nueva contraseña</h2>
          <img src={require('../assets/MiomLogo.png')} alt="Miom Logo" className="logo mb-3" />
          <div className="login-box">
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formNewPassword" className="mb-3">
                <Form.Label>Nueva Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingresa tu nueva contraseña"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formConfirmPassword" className="mb-3">
                <Form.Label>Confirma tu nueva contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirma tu nueva contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mb-2 login-button">
                Cambiar contraseña
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
    )
}

export default ResetPassword