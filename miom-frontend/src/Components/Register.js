import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';  // Para redirigir al usuario después del registro
import '../CSS/Register.css'; // Asegúrate de tener el CSS enlazado correctamente

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();  // Hook de React Router para redirigir

  // Validación del formulario
  const validateForm = () => {
    let formErrors = {};

    // Validar nombre completo
    if (!fullName.trim()) {
      formErrors.fullName = 'El nombre completo es obligatorio';
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      formErrors.email = 'El email es obligatorio';
    } else if (!emailRegex.test(email)) {
      formErrors.email = 'El formato del email no es válido';
    }

    // Validar contraseña
    if (!password) {
      formErrors.password = 'La contraseña es obligatoria';
    } else if (password.length < 8) {
      formErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    // Validar confirmación de contraseña
    if (!confirmPassword) {
      formErrors.confirmPassword = 'La confirmación de la contraseña es obligatoria';
    } else if (confirmPassword !== password) {
      formErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    // Validar teléfono (obligatorio)
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phone) {
      formErrors.phone = 'El número de teléfono es obligatorio';
    } else if (!phoneRegex.test(phone)) {
      formErrors.phone = 'El formato del número de teléfono no es válido';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Resetear mensajes de error y éxito
    setServerError('');
    setSuccessMessage('');

    // Validar el formulario
    if (!validateForm()) {
      return;
    }

    // Crear el objeto de usuario con los datos del formulario
    const user = {
      fullName,
      email,
      password,
      phone,
    };

    try {
      // Realizar la solicitud al backend
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Error del servidor');
      }

      // Si el registro es exitoso, guarda el token y redirige al usuario
      localStorage.setItem('token', data.token);  // Guardar el token en localStorage
      setSuccessMessage('Registro exitoso. Redirigiendo...');
      navigate('/home');  // Redirigir al dashboard o página protegida
    } catch (error) {
      setServerError(error.message);
    }
  };

  return (
    <Container fluid className="register-container">
      <Row className="justify-content-center align-items-center h-100">
        <Col xs={12} sm={8} md={6} lg={4}> {/* Se adapta a diferentes tamaños de pantalla */}
          <h2 className="text-center register-header">Registrate en Miom</h2>
          <img src={require('../assets/MiomLogo.png')} alt="Miom Logo" className="logo mb-3" />
          <div className="register-box">
            {/* Mostrar mensajes de éxito o error */}
            {serverError && <Alert variant="danger">{serverError}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formFullName" className="mb-3">
                <Form.Label>Nombre Completo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa tu nombre completo"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  isInvalid={!!errors.fullName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.fullName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingresa tu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formPhone" className="mb-3">
                <Form.Label>Número de Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa tu número de teléfono"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  isInvalid={!!errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formConfirmPassword" className="mb-3">
                <Form.Label>Confirma tu Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirma tu contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  isInvalid={!!errors.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formTerms" className="mb-3 d-flex align-items-center">
                <Form.Check
                  required
                  label={<>Acepto los <a href="/terms-conditions" target="_blank" rel="noopener noreferrer">términos y condiciones</a></>}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 register-button">
                Registrarse
              </Button>
            </Form>
            <div className="mt-3 text-center">
              <p>¿Ya tienes una cuenta? <a href="/login">Inicia sesión aquí</a></p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
