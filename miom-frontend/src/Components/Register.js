import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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

    // Validar teléfono (opcional)
    const phoneRegex = /^\d{10,14}$/; // Validar formato básico de teléfono
    if (phone && !phoneRegex.test(phone)) {
      formErrors.phone = 'El formato del número de teléfono no es válido';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setSuccessMessage('');

    // Si el formulario no es válido, detener la ejecución
    if (!validateForm()) {
      return;
    }

    // Crear el objeto de usuario
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

      // Si el registro es exitoso
      setSuccessMessage('Registro exitoso. ¡Ya puedes iniciar sesión!');
      setFullName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setPhone('');
      setErrors({});
    } catch (error) {
      setServerError(error.message);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <h2 className="text-center mb-4">Regístrate en Miom</h2>

          {/* Mostrar mensajes de éxito o error */}
          {serverError && <Alert variant="danger">{serverError}</Alert>}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}

          <Form onSubmit={handleSubmit}>
            {/* Nombre completo */}
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

            {/* Email */}
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

            {/* Teléfono */}
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

            {/* Contraseña */}
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

            {/* Confirmación de contraseña */}
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

            {/* Aceptar términos */}
            <Form.Group controlId="formTerms" className="mb-3">
              <Form.Check type="checkbox" label="Acepto los términos y condiciones" required />
            </Form.Group>

            {/* Botón de registro */}
            <Button variant="primary" type="submit" className="w-100">
              Registrarse
            </Button>
          </Form>

          <div className="mt-3 text-center">
            <a href="/login">¿Ya tienes una cuenta? Inicia sesión aquí</a>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
