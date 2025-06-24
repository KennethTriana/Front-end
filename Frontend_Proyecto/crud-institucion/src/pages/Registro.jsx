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

  const validarCampos = () => {
    if (!nombres || !apellidos || !correo || !contrasena || !foto_perfil || !telefono || !direccion || !cargo_id) {
      setError('Por favor, completa todos los campos.');
      return false;
    }

    if (cargo_id !== "1" && cargo_id !== "2") {
      setError('El cargo debe ser 1 o 2.');
      return false;
    }

    const telefonoRegex = /^[0-9]+$/;
    if (!telefonoRegex.test(telefono)) {
      setError('El teléfono debe contener solo números.');
      return false;
    }

    try {
      new URL(foto_perfil);
    } catch (e) {
      setError('La URL de la foto de perfil no es válida.');
      return false;
    }

    return true;
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!validarCampos()) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/usuarios', {
        nombres,
        apellidos,
        correo,
        contrasena,
        foto_perfil,
        telefono,
        direccion,
        cargo_id: parseInt(cargo_id),
      });

      console.log('Usuario agregado:', response.data);
      navigate('/home');

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
        const mensajeServidor = error.response.data?.msg || error.response.data?.error || '';

        console.log('Respuesta completa del servidor:', error.response);
        console.log('Mensaje del servidor:', mensajeServidor);

        if (error.response.status === 409) {
          setError('El correo electrónico ya está registrado. Por favor, usa otro correo.');
        } else if (mensajeServidor.includes('correo electrónico no puede estar vacío')) {
          setError('El correo electrónico no puede estar vacío.');
        } else if (mensajeServidor.includes('Duplicate entry') && mensajeServidor.includes('usuarios.email')) {
          setError('El correo electrónico ya está registrado.');
        } else if (error.response.status === 400) {
          setError(error.response.data.msg || 'Los datos no son válidos.');
        } else if (error.response.status === 500) {
          setError('No tienes permiso para registrar un usuario, solo el administrador tiene acceso.');
        } else {
          setError('Error al registrar el usuario. Intenta más tarde.');
        }
      } else {
        setError('Error de conexión. Intenta más tarde.');
      }
    } finally {
      setIsLoading(false);
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
          <input type="text" value={nombres} onChange={(e) => setNombres(e.target.value)} required />
        </div>
        <div>
          <label>Apellidos:</label>
          <input type="text" value={apellidos} onChange={(e) => setApellidos(e.target.value)} required />
        </div>
        <div>
          <label>Correo Electrónico:</label>
          <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
        </div>
        <div>
          <label>Url Foto Perfil:</label>
          <input type="text" value={foto_perfil} onChange={(e) => setFoto(e.target.value)} required />
        </div>
        <div>
          <label>Teléfono:</label>
          <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
        </div>
        <div>
          <label>Dirección:</label>
          <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
        </div>
        <div>
          <label>Cargo:</label>
          <select value={cargo_id} onChange={(e) => setCargo(e.target.value)} required>
            <option value="">Selecciona un cargo</option>
            <option value="1">Administrador</option>
            <option value="2">Empleado</option>
          </select>
        </div>
        <button type="submit" disabled={isLoading}>Registrarse</button>
      </form>
    </div>
  );
};

export default Registro;