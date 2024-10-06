import React, { useEffect, useState } from 'react';
import { Table, Container, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';  // Importar jwt-decode para decodificar el token JWT

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');  // Redirige si no hay token
        return;
      }

      try {
        // Decodificar el token para obtener el rol del usuario
        const decoded = jwtDecode(token);
        if (decoded.user.role !== 'superadmin') {
          navigate('/');  // Redirige si el usuario no es superadmin
          return;
        }

        // Hacer la solicitud para obtener los usuarios
        const response = await fetch('http://localhost:5000/api/auth/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,  // Incluye el token en los headers
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener los usuarios');
        }

        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate]);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
        <p>Cargando usuarios...</p>
      </Container>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Lista de Usuarios</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Completo</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Fecha de Registro</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UsersList;
