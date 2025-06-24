import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';

const LoginForm = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correo || !contrasena) {
      alert("Por favor completa todos los campos");
      return;
    }

    if (!emailRegex.test(correo)) {
      alert("Por favor ingresa un correo válido");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/login',
        { correo, contrasena },
        { headers: { 'Content-Type': 'application/json' } }  
      );

      
      localStorage.setItem('token', response.data.token);
      setLoading(false);

      
      navigate('/profile');
    } catch (error) {
      setLoading(false);

      if (error.response) {
        
        alert(`Error: ${error.response.data.mensaje || 'Correo o contraseña incorrectos'}`);
      } else if (error.request) {
        
        alert('Error: No se recibió respuesta del servidor.');
      } else {
        
        alert('Error: ' + error.message);
      }
    }
  };

  return (
    <div className="container">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleLogin}>
        <div className="input-container">
          <input
            type="email"
            placeholder="Correo"
            onChange={(e) => setCorreo(e.target.value)}
            value={correo}
            required
          />
          <PersonIcon className="icon" />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Contraseña"
            onChange={(e) => setContrasena(e.target.value)}
            value={contrasena}
            required
          />
          <LockIcon className="icon" />
        </div>
        <div className="forgot-link">
          <a href="/recuperar-contrasena">¿Olvidaste tu contraseña?</a>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Cargando...' : 'Iniciar sesión'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;