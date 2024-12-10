import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const AlertaList = () => {
  const [alertas, setAlertas] = useState([]);
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
        .get('http://127.0.0.1:5000/alerta', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          setAlertas(response.data);
        })
        .catch(error => {
          console.error('Error al obtener las alertas', error);
          if (error.response && error.response.status === 401) {
            alert('Token inválido. Por favor, inicia sesión nuevamente.');
            navigate('/');
          } else {
            alert('Error al obtener las alertas. Intenta nuevamente más tarde.');
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
      {isLoading ? (
        <p>Cargando...</p>
      ) : alertas.length > 0 ? (
        <div>
          <h1>Lista de Alertas</h1>
          <ul>
            {alertas.map(alerta => (
              <li key={alerta.id}>
                <h2>{alerta.nombre}</h2>
                <p>Stock mínimo: {alerta.stock_minimo}</p>
                <p>Stock: {alerta.stock}</p>
                <p>Productos ID: {alerta.productos_id}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No se encontraron alertas.</p>
      )}
    </div>
  );
};

export default AlertaList;