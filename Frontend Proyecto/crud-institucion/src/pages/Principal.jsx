import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Principal.css';
import axios from 'axios';

const Productos = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [fecha_entrada, setFechaEntrada] = useState('');
  const [fecha_vence, setFechaVence] = useState('');
  const [estado, setEstado] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precio_entrada, setPrecioEntrada] = useState('');
  const [precio_salida, setPrecioSalida] = useState('');
  const [categoria_id, setCategoriaId] = useState('');
  const [usuarios_id, setUsuariosId] = useState('');
  const [error, setError] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!nombre || !fecha_entrada || !fecha_vence || !estado || !cantidad || !precio_entrada || !precio_salida || !categoria_id || !usuarios_id) {
      setError('Por favor, completa todos los campos correctamente.');
      return;
    }
    const token = localStorage.getItem('token');

    axios
      .post('http://127.0.0.1:5000/productos', { 
        nombre, 
        fecha_entrada, 
        fecha_vence, 
        estado, 
        cantidad, 
        precio_entrada, 
        precio_salida, 
        categoria_id, 
        usuarios_id 
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        console.log('Producto agregado:', response.data);
        navigate('/home'); 
        setNombre('');
        setFechaEntrada('');
        setFechaVence('');
        setEstado('');
        setCantidad('');
        setPrecioEntrada('');
        setPrecioSalida('');
        setCategoriaId('');
        setUsuariosId('');
        setError('');
      })
      .catch(error => {
        if (error.response) {
          console.error('Error al agregar producto', error.response.data);
          setError(`Error: ${error.response.data.mensaje || 'Error al agregar producto'}`);
        } else if (error.request) {
          console.error('Error al agregar producto', error.request);
          setError('Error: No se recibió respuesta del servidor.');
        } else {
          console.error('Error', error.message);
          setError('Error: ' + error.message);
        }
      });
  };

  return (
    <div className="inventario-container">
      <h2>Agregar Producto al Inventario</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={manejarEnvio}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Fecha Entrada:</label>
          <input
            type="date"
            value={fecha_entrada}
            onChange={(e) => setFechaEntrada(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Fecha de Vencimiento:</label>
          <input
            type="date"
            value={fecha_vence}
            onChange={(e) => setFechaVence(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Estado:</label>
          <input
            type="text"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Cantidad:</label>
          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Precio de Entrada:</label>
          <input
            type="number"
            value={precio_entrada}
            onChange={(e) => setPrecioEntrada(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Precio de Salida:</label>
          <input
            type="number"
            value={precio_salida}
            onChange={(e) => setPrecioSalida(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Categoria ID:</label>
          <input
            type="number"
            value={categoria_id}
            onChange={(e) => setCategoriaId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Usuario ID:</label>
          <input
            type="number"
            value={usuarios_id}
            onChange={(e) => setUsuariosId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Agregar Producto</button>
      </form>
    </div>
  );
};

export default Productos;