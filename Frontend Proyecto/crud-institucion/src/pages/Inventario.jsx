import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('No estás autenticado');
      navigate('/');
      return;
    }

    setIsLoading(true);

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.sub;

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
          alert('Token inválido. Por favor, inicia sesión nuevamente.');
          navigate('/');
        } else {
          alert('Error al obtener los productos. Intenta nuevamente más tarde.');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [navigate]);

  return (
    <div className="container">
      {isLoading ? (
        <p>Cargando...</p>
      ) : products.length > 0 ? (
        <div>
          <h1>Lista de Productos</h1>
          <ul>
            {products.map(product => (
              <li key={product.id}>
                <h2>{product.nombre}</h2>
                <p>Fecha de entrada: {product.fecha_entrada}</p>
                <p>Fecha de vencimiento: {product.fecha_vence}</p>
                <p>Estado: {product.estado}</p>
                <p>Cantidad: {product.cantidad}</p>
                <p>Precio de entrada: {product.precio_entrada}</p>
                <p>Precio de salida: {product.precio_salida}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No se encontraron productos.</p>
      )}
    </div>
  );
};

export default ProductList;