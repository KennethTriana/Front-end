import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import { useNavigate } from 'react-router-dom';

const RecuperarContrasenaForm = () => {
  const [correo, setCorreo] = useState('');
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);
  const [mostrarNuevaContrasena, setMostrarNuevaContrasena] = useState(false);
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [tokenRecuperacion, setTokenRecuperacion] = useState('');

  const navigate = useNavigate();

  const handleRecuperar = async (e) => {
    e.preventDefault();

    if (!correo || !nombres || !apellidos) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/recuperar-contrasena',
        { correo, nombres, apellidos },
        { headers: { 'Content-Type': 'application/json' } }
      );

      setMensaje(response.data.mensaje);
      setTokenRecuperacion(response.data.token_recuperacion);
      setMostrarNuevaContrasena(true);
    } catch (error) {
      if (error.response) {
        setMensaje(error.response.data.mensaje || 'Error en la recuperación');
        alert(`Error: ${error.response.data.mensaje}`);
      } else {
        alert('Error inesperado: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRestablecer = async (e) => {
    e.preventDefault();

    if (!nuevaContrasena) {
      alert('Ingresa una nueva contraseña');
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/restablecer-contrasena',
        { nueva_contrasena: nuevaContrasena },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenRecuperacion}`
          }
        }
      );

      alert(response.data.mensaje);

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      if (error.response) {
        alert(`Error: ${error.response.data.mensaje}`);
      } else {
        alert('Error inesperado: ' + error.message);
      }
    }
  };

  return (
    <div className="container">
      <h1>¿Olvidaste tu contraseña?</h1>
      <form onSubmit={handleRecuperar}>
        <div className="input-container">
          <input
            type="text"
            placeholder="Nombres"
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Apellidos"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Verificando...' : 'Recuperar'}
        </button>
      </form>

      {mostrarNuevaContrasena && (
        <form onSubmit={handleRestablecer} style={{ marginTop: '30px' }}>
          <h2>Restablecer Contraseña</h2>
          <div className="input-container">
            <input
              type="password"
              placeholder="Nueva contraseña"
              value={nuevaContrasena}
              onChange={(e) => setNuevaContrasena(e.target.value)}
              required
            />
          </div>
          <button type="submit">Guardar nueva contraseña</button>
        </form>
      )}

      {mensaje && <p style={{ marginTop: '20px' }}>{mensaje}</p>}
    </div>
  );
};

export default RecuperarContrasenaForm;