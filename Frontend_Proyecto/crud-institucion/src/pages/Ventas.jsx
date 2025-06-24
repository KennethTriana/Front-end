import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Producto';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './Ventas.css'; 

const Ventas = () => {
  const navigate = useNavigate();
  const [productos, setProductosLocal] = useState([]);
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('No estás autenticado');
      navigate('/');
      return;
    }

    setIsLoading(true);

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.sub; 

      axios
        .get('http://127.0.0.1:5000/productos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setProductosLocal(response.data);
        })
        .catch((error) => {
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
    } catch (e) {
      console.error('Error al decodificar el token', e);
      navigate('/');
    }
  }, [navigate]);

  const manejarVenta = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!nombre.trim() || cantidad === '') {
      setError('Por favor, completa todos los campos correctamente.');
      return;
    }

    const cantidadNumero = Number(cantidad);
    if (isNaN(cantidadNumero) || cantidadNumero <= 0) {
      setError('La cantidad debe ser un número válido mayor que cero.');
      return;
    }

    const token = localStorage.getItem('token');

    const productoEncontrado = productos.find(
      (producto) => producto.nombre.toLowerCase() === nombre.toLowerCase()
    );

    if (!productoEncontrado) {
      setError('Producto no encontrado.');
      return;
    }

    if (productoEncontrado.cantidad < cantidadNumero) {
      setError('No hay suficiente cantidad disponible.');
      return;
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:5000/ventas/${productoEncontrado.id}`,
        { cantidad: cantidadNumero },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const nuevosProductos = productos.map((producto) => {
        if (producto.id === productoEncontrado.id) {
          return { ...producto, cantidad: producto.cantidad - cantidadNumero };
        }
        return producto;
      });

      setProductosLocal(nuevosProductos);
      setSuccess(response.data.message || 'Venta realizada con éxito');
      setNombre('');
      setCantidad('');
      navigate('/historial'); 
    } catch (error) {
      console.error('Error al realizar la venta', error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('Error al realizar la venta. Intenta nuevamente más tarde.');
      }
    }
  };

  return (
    <div className="ventas-container">
      <h2>Realizar Venta</h2>
      {isLoading && <p>Cargando productos...</p>}
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={manejarVenta}>
        <div>
          <label>Nombre del Producto:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Cantidad a Vender:</label>
          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            required
          />
        </div>
        <button type="submit">Vender Producto</button>
      </form>
    </div>
  );
};

export default Ventas;

