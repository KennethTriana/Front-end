import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock'
import axios from 'axios';
import './login.css';

const LoginFrom = () => {
  const [nombres, setNombres] = useState("");
  const [contrasena, setContrasena] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!nombres || !contrasena) {
      alert("Por favor completa todos los campos");
      return;
    }

    axios
      .post('http://127.0.0.1:5000/login', { nombres, contrasena })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        alert('Login exitoso!');
        window.location.href = "/profile";
      })
      .catch(error => {
        if (error.response) {
          console.error('Error al iniciar sesión', error.response.data);
          alert(`Error: ${error.response.data.mensaje || 'Error al iniciar sesión'}`);
        } else if (error.request) {
          console.error('Error al iniciar sesión', error.request);
          alert('Error: No se recibió respuesta del servidor.');
        } else {
          console.error('Error', error.message);
          alert('Error: ' + error.message);
        }
      });
  };

  return (
    <div className="container">
      <h1>Iniciar Sesión</h1>
      <input
        type="text"
        placeholder="Nombres"
        onChange={(e) => setNombres(e.target.value)}
      />
      <PersonIcon className='Icon'/>
      <input
        type="password"
        placeholder="Contraseña"
        required
        onChange={(e) => setContrasena(e.target.value)}
      />
      <LockIcon className='icon'/>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginFrom;