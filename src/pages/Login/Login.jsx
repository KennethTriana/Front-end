import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!correo || !contrasena) {
      setError('Por favor, completa todos los campos.');
      return;
    }
    // Aquí puedes agregar la lógica para enviar los datos a tu API
    console.log('Datos enviados:', { correo, contrasena });
    // Reiniciar el formulario
    setCorreo('');
    setContrasena('');
    setError('');
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={manejarEnvio}>
        <div>
          <label>Correo Electrónico:</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;