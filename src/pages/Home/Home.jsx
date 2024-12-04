import React from 'react';
import logo from '../../assets/images/logo.png';
import './Home.css';

export default function Home() {
  return (
    <div className="container">
      <img
        src={logo}
        alt=""
        className="logo"
      />

      <h2>"Un Inventario Bien Gestionado Es Un Inventario Eficaz"</h2>
      
      <div className="button-container">
        <button className="button">Iniciar Sesión</button>
        <button className="button">Registrarse</button>
      </div>
    </div>
  );
}