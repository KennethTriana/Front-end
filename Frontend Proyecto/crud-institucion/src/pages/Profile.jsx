import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 

const Profile = () => {
  const [user, setUser ] = useState([]);
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

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.sub; 

    axios
      .get('http://127.0.0.1:5000/perfil', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setUser (response.data);
      })
      .catch(error => {
        console.error('Error al obtener el perfil', error);
        if (error.response && error.response.status === 401) {
          alert('Token inválido. Por favor, inicia sesión nuevamente.');
          navigate('/');
        } else {
          alert('Error al obtener el perfil. Intenta nuevamente más tarde.');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    navigate('/');
  };

  return (
    <div className="container">
      <nav>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </nav>
      {isLoading ? (
        <p>Cargando...</p>
      ) : user ? (
        <div>
          <h1>Perfil</h1>
          <p>Foto Perfil:</p><img src={user.foto_perfil} alt="Avatar" style={{ width: '200px', height: '200px', objectFit: 'cover' }}/>
          <p>Nombres: {user.nombres}</p>
          <p>Apellidos: {user.apellidos}</p>
          <p>Correo: {user.correo}</p>
          <p>Teléfono: {user.telefono}</p>
          <p>Dirección: {user.direccion}</p>
          <p>Cargo: {user.cargo_id}</p>
        </div>
      ) : (
        <p>No se encontró información del usuario.</p>
      )}
    </div>
  );
};

export default Profile;