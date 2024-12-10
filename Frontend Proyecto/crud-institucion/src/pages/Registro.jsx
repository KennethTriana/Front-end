import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Registro.css';

const Registro = () => {
  const navigate = useNavigate();
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [foto_perfil, setFoto] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [cargo_id, setCargo] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true); // Indica que la solicitud está en progreso

    if (!nombres || !apellidos || !correo || !contrasena || !foto_perfil || !telefono || !direccion || !cargo_id) {
      setError('Por favor, completa todos los campos.');
      setIsLoading(false); // Detiene el estado de carga
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const response = await axios.post('http://127.0.0.1:5000/usuarios', {
        nombres,
        apellidos,
        correo,
        contrasena,
        foto_perfil,
        telefono,
        direccion,
        cargo_id,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Usuario agregado:', response.data);
      navigate('/home');
      // Reinicia los campos del formulario
      setNombres('');
      setApellidos('');
      setCorreo('');
      setContrasena('');
      setFoto('');
      setTelefono('');
      setDireccion('');
      setCargo('');
    } catch (error) {
      console.error('Error al registrar el usuario', error);
      if (error.response) {
        if (error.response.status === 400) {
          setError('Error en los datos proporcionados. Por favor, verifica e intenta nuevamente.');
        } else if (error.response.status === 401) {
          setError('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
          navigate('/login');
        } else {
          setError('Error al registrar el usuario. Intenta nuevamente más tarde.');
        }
      } else {
        setError('Error de conexión. Por favor, intenta nuevamente más tarde.');
      }
    } finally {
      setIsLoading(false); // Detiene el estado de carga
    }
  };

  return (
    <div className="registro-container">
      <h2>Registro de Usuario</h2>
      {error && <p className="error">{error}</p>}
      {isLoading && <p>Cargando...</p>}
      <form onSubmit={manejarEnvio}>
        <div>
          <label>Nombres:</label>
          <input
            type="text"
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Apellidos:</label>
          <input
            type="text"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Correo Electrónico:</label>
          <input
            type="text"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="text"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Url Foto Perfil:</label>
          <input
            type="text"
            value={foto_perfil}
            onChange={(e) => setFoto(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Teléfono:</label>
          <input
            type="number"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Dirección:</label>
          <input
            type="text"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Cargo (1 o 2):</label>
          <input
            type="number"
            value={cargo_id}
            onChange={(e) => setCargo(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Registro;