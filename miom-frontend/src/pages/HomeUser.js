import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';

const HomeUser = () => {
  const [tasks, setTasks] = useState([]);
  const [exams, setExams] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Suponiendo que tenemos endpoints para tareas, exámenes y apuntes
        const [tasksRes, examsRes, notesRes] = await Promise.all([
          fetch('http://localhost:5000/api/tasks'), 
          fetch('http://localhost:5000/api/exams'),
          fetch('http://localhost:5000/api/notes')
        ]);

        const tasksData = await tasksRes.json();
        const examsData = await examsRes.json();
        const notesData = await notesRes.json();

        setTasks(tasksData);
        setExams(examsData);
        setNotes(notesData);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los datos');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
        <p>Cargando datos...</p>
      </Container>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Bienvenido a Miom</h2>

      {/* Sección de Tareas */}
      <Row className="mb-4">
        <Col>
          <h3>Tareas</h3>
          {tasks.length === 0 ? (
            <p>No tienes tareas pendientes</p>
          ) : (
            <Row>
              {tasks.map((task) => (
                <Col md={4} key={task.id}>
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Title>{task.title}</Card.Title>
                      <Card.Text>{task.description}</Card.Text>
                      <Button variant="primary">Ver detalles</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>

      {/* Sección de Exámenes */}
      <Row className="mb-4">
        <Col>
          <h3>Exámenes</h3>
          {exams.length === 0 ? (
            <p>No tienes exámenes próximos</p>
          ) : (
            <Row>
              {exams.map((exam) => (
                <Col md={4} key={exam.id}>
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Title>{exam.subject}</Card.Title>
                      <Card.Text>Fecha: {new Date(exam.date).toLocaleDateString()}</Card.Text>
                      <Button variant="primary">Ver detalles</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>

      {/* Sección de Apuntes */}
      <Row className="mb-4">
        <Col>
          <h3>Apuntes</h3>
          {notes.length === 0 ? (
            <p>No tienes apuntes subidos</p>
          ) : (
            <Row>
              {notes.map((note) => (
                <Col md={4} key={note.id}>
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Title>{note.title}</Card.Title>
                      <Button variant="primary">Descargar Apunte</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default HomeUser;
