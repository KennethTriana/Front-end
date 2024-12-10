import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('No estás autenticado');
      navigate('/');
      return;
    }

    setIsLoading(true);

    axios
      .get('http://127.0.0.1:5000/usuarios', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los usuarios', error);
        if (error.response && error.response.status === 401) {
          alert('Token inválido. Por favor, inicia sesión nuevamente.');
          navigate('/');
        } else {
          alert('Error al obtener los usuarios. Intenta nuevamente más tarde.');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [navigate]);

  return (
    <div className="container">
      {isLoading ? (
        <p>Cargando...</p>
      ) : users.length > 0 ? ( // Verifica si hay usuarios
        <div>
          <h1>Lista de Usuarios</h1>
          {users.map(user => ( // Itera sobre el arreglo de usuarios
            <div key={user.id}> {/* Asegúrate de que cada usuario tenga un ID único */}
              <p>Foto Perfil:</p>
              <img src={user.foto_perfil} alt="Avatar" style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
              <p>Nombres: {user.nombres}</p>
              <p>Apellidos: {user.apellidos}</p>
              <p>Email: {user.correo}</p>
              <p>Teléfono: {user.telefono}</p>
              <p>Dirección: {user.direccion}</p>
              <p>Cargo: {user.cargo_id}</p>
              <hr /> {/* Separador entre usuarios */}
            </div>
          ))}
        </div>
      ) : (
        <p>No se encontraron usuarios.</p>
      )}
    </div>
  );
};

export default UserList;