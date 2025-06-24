import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 
import './profile.css'; 

const Profile = () => {
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const getCargoTexto = (cargoId) => {
    switch (cargoId) {
      case 1:
        return 'Administrador';
      case 2:
        return 'Empleado';
      default:
        return 'Cargo no definido';
    }
  };

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
        setUser(response.data);
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
    <div className="profile-page-wrapper">
      {isLoading ? (
        <p>Cargando...</p>
      ) : user ? (
        <div className="profile-card"> {/* Esta es la tarjeta blanca flotante */}
          <h1>Perfil</h1>
            
          <p className="profile-info-label">Foto Perfil:</p>
          <img src={user.foto_perfil} alt="Avatar" className="profile-image" />
            
          <div className="profile-info-group">
            <p className="profile-info-label">Nombres:</p>
            <div className="profile-info-value">{user.nombres}</div>
          </div>

          <div className="profile-info-group">
            <p className="profile-info-label">Apellidos:</p>
            <div className="profile-info-value">{user.apellidos}</div>
          </div>

          <div className="profile-info-group">
            <p className="profile-info-label">Correo:</p>
            <div className="profile-info-value">{user.correo}</div>
          </div>
            
          <div className="profile-info-group">
            <p className="profile-info-label">Teléfono:</p>
            <div className="profile-info-value">{user.telefono}</div>
          </div>

          <div className="profile-info-group">
            <p className="profile-info-label">Dirección:</p>
            <div className="profile-info-value">{user.direccion}</div>
          </div>

          <div className="profile-info-group">
            <p className="profile-info-label">Cargo:</p>
            <div className="profile-info-value">{getCargoTexto(user.cargo_id)}</div>
          </div>

            {/* MOVIDO: El botón de cerrar sesión ahora está dentro de .profile-card */}
            <button onClick={handleLogout} className="profile-logout-button">Cerrar sesión</button>
        </div>
      ) : (
        <p>No se encontró información del usuario.</p>
      )}
        {/* REMOVIDO: El elemento <nav> ya no es necesario si el botón está dentro de la tarjeta */}
    </div>
  );
};

export default Profile;