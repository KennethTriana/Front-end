import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './Inventario.css'; // ¡Importante: asegúrate de que esta ruta sea correcta!

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('No estás autenticado');
      navigate('/login');
      return;
    }

    setIsLoading(true);

    try {
      const decodedToken = jwtDecode(token);
      // const userId = decodedToken.sub; // Puedes usar esto si necesitas el ID del usuario
    } catch (error) {
      console.error('Error decodificando el token:', error);
      alert('Token inválido o expirado. Por favor, inicia sesión nuevamente.');
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      navigate('/login');
      return;
    }

    axios
      .get('http://127.0.0.1:5000/productos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los productos', error);
        if (error.response && error.response.status === 401) {
          alert('Sesión expirada o token inválido. Por favor, inicia sesión nuevamente.');
          localStorage.removeItem('token');
          localStorage.removeItem('refresh_token');
          navigate('/login');
        } else {
          alert('Error al obtener los productos. Intenta nuevamente más tarde.');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [navigate]);

  return (
    // Contenedor principal de la página de inventario
    <div className="inventory-page-wrapper">
      {isLoading ? (
        // Mensaje de carga
        <p className="inventory-loading-message">Cargando productos...</p>
      ) : products.length > 0 ? (
        // Tarjeta contenedora principal para la lista de productos
        <div className="inventory-card">
          <h1>Lista de Productos</h1>
          {/* Lista de productos */}
          <ul className="product-list">
            {products.map(product => (
              // Cada item de producto individual
              <li key={product.id} className="product-item">
                {/* Nombre del producto */}
                <h2 className="product-name">{product.nombre}</h2>
                {/* Detalles del producto con spans para los valores */}
                <p className="product-detail">Fecha de entrada: <span>{product.fecha_entrada}</span></p>
                <p className="product-detail">Fecha de vencimiento: <span>{product.fecha_vence}</span></p>
                <p className="product-detail">Estado: <span>{product.estado}</span></p>
                <p className="product-detail">Cantidad: <span>{product.cantidad}</span></p>
                <p className="product-detail">Precio de entrada: <span>${product.precio_entrada}</span></p>
                <p className="product-detail">Precio de salida: <span>${product.precio_salida}</span></p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        // Mensaje si no se encontraron productos
        <p className="inventory-no-products-message">No se encontraron productos.</p>
      )}
    </div>
  );
};

export default ProductList;