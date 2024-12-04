import React, { useState } from 'react';
import './Registro.css';

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!nombre || !correo || !contrasena) {
      setError('Por favor, completa todos los campos.');
      return;
    }
    // Aquí puedes agregar la lógica para enviar los datos a tu API
    console.log('Datos enviados:', { nombre, correo, contrasena });
    // Reiniciar el formulario
    setNombre('');
    setCorreo('');
    setContrasena('');
    setError('');
  };

  return (
    <div className="registro-container">
      <h2>Registro de Usuario</h2>
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
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Registro;