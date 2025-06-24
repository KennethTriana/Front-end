import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AlertaList = () => {
  const [alertasCriticas, setAlertasCriticas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlertas = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        alert('No estás autenticado');
        navigate('/');
        return;
      }

      try {
        jwtDecode(token); 

        const response = await axios.get('http://127.0.0.1:5000/alerta', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });


        const criticas = response.data.filter(
          (alerta) => alerta.stock <= alerta.stock_minimo
        );
        setAlertasCriticas(criticas);
      } catch (error) {
        console.error('Error al obtener las alertas', error);
        if (error.response?.status === 401) {
          alert('Sesión expirada. Inicia sesión nuevamente.');
          navigate('/');
        } else {
          alert('No se pudieron cargar las alertas. Intenta más tarde.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlertas();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    navigate('/');
  };

  return (
    <div className="container" style={{ padding: '20px' }}>

      {isLoading ? (
        <p>Cargando...</p>
      ) : alertasCriticas.length > 0 ? (
        <div>
          <h1>⚠️ Alertas Críticas de Stock</h1>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {alertasCriticas.map((alerta) => (
              <li
                key={alerta.id}
                style={{
                  border: '1px solid red',
                  backgroundColor: '#ffe5e5',
                  color: 'darkred',
                  marginBottom: '10px',
                  padding: '10px',
                  borderRadius: '8px',
                }}
              >
                <h2>{alerta.nombre}</h2>
                <p><strong>Stock mínimo:</strong> {alerta.stock_minimo}</p>
                <p><strong>Stock actual:</strong> {alerta.stock}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No hay alertas críticas en este momento. </p>
      )}
    </div>
  );
};

export default AlertaList;
