import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../CSS/Login.css';  // Reutilizamos el CSS de login para mantener la coherencia

const TermsAndConditions = () => {
  return (
    <Container fluid className="login-container">
      <Row className="justify-content-center align-items-center h-100">
        <Col xs={12} sm={8} md={6} lg={8}> {/* Ajustamos el tamaño de la columna */}
          <h2 className="text-center login-header">Términos y Condiciones</h2>
          <div className="login-box">
            <p>
              Bienvenido a Miom. Al utilizar nuestra plataforma, aceptas los siguientes términos y condiciones:
            </p>
            <h3>1. Uso de la Plataforma</h3>
            <p>
              Miom permite a los usuarios registrar tareas, exámenes y subir apuntes para su gestión personal. Al registrarte, eres responsable de la información que subes y debes respetar las normas de conducta.
            </p>
            <h3>2. Privacidad</h3>
            <p>
              Respetamos la privacidad de nuestros usuarios. La información que recopilemos estará protegida de acuerdo con nuestras políticas de privacidad.
            </p>
            <h3>3. Responsabilidades del Usuario</h3>
            <p>
              Al utilizar la plataforma, aceptas no compartir contenido inapropiado o utilizar la plataforma de manera indebida.
            </p>
            <h3>4. Cambios en los Términos</h3>
            <p>
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Notificaremos cualquier cambio significativo.
            </p>
            <p>
              Al continuar usando la plataforma, aceptas los términos actualizados.
            </p>
            <p>
              Si tienes alguna duda, no dudes en contactarnos a través de nuestros canales de soporte.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default TermsAndConditions;
