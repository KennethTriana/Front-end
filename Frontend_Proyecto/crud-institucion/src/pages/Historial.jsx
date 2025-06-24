import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Historial.css';

const Historial = () => {
  const [historial, setHistorial] = useState([]);

  
  const fetchHistorial = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/historial', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setHistorial(response.data.historial);  
    } catch (error) {
      console.error('Error al cargar el historial:', error);
    }
  };

  useEffect(() => {
    
    fetchHistorial();

    
    const intervalId = setInterval(() => {
      setHistorial((prevHistorial) => {
        return prevHistorial.map((item) => ({
          ...item,
          fecha: new Date(item.fecha), 
        }));
      });
    }, 1000);

    
    return () => clearInterval(intervalId);
  }, []);

  
  const options = {
    timeZone: 'America/Bogota',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true, 
  };

  return (
    <div className="historial-container">
      <h2>Historial de Actividades</h2>
      <table className="historial-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Acción</th>
            <th>Descripción</th>
            <th>Producto ID</th>
            <th>Nombre usuario</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {historial.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.accion}</td>
              <td>{item.descripcion}</td>
              <td>{item.producto_id}</td>
              <td>{item.usuario_nombre}</td>
              <td>
                {/* Aplicamos el formato con la zona horaria de Bogotá */}
                {new Date(item.fecha).toLocaleString('es-CO', options)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Historial;
