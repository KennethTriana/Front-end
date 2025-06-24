import React from 'react';
import logo from '../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login'); 
  };

  const handleRegister = () => {
    navigate('/registro'); 
  };

  return (
    <div className="container">
      <img
        src={logo}
        alt="Logo"
        className="logo"
      />

      <h2>Un inventario bien gestionado es un inventario eficaz</h2>
      
      <div className="button-container">
        <button className="button" onClick={handleLogin}>Iniciar Sesión</button>
        <button className="button" onClick={handleRegister}>Registrarse</button>
      </div>
    </div>
  );
}