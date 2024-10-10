import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';  // Para redirigir después del login
import '../CSS/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();  // Hook para redireccionar

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('Holaa');
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {  // Actualiza la URL según tu endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem('token', data.token);  // Guarda el token en el localStorage
        setSuccessMessage('Login exitoso');
        navigate('/home');  // Redirigir al dashboard o a la página que prefieras
      } else {
        throw new Error(data.msg || 'Credenciales incorrectas');
      }
    } catch (error) {
      setErrorMessage(error.message);  // Establecer el mensaje de error
    }
  };

  return (
    <Container fluid className="login-container">
      <Row className="justify-content-center align-items-center h-100">
        <Col xs={12} sm={8} md={6} lg={4}> {/* Se adapta a diferentes tamaños de pantalla */}
          <h2 className="text-center login-header">Bienvenido a Miom</h2>
          <img src={require('../assets/MiomLogo.png')} alt="Miom Logo" className="logo mb-3" />

          <div className="login-box">
            {/* Mostrar el mensaje de error si existe */}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingresa tu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <div className="text-end mb-3">
                <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
              </div>

              <Button variant="primary" type="submit" className="w-100 mb-2 login-button">
                Iniciar sesión
              </Button>

              <div className="text-center">
                <p>¿No tienes una cuenta? <a href="/register">Registrarse</a></p>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
