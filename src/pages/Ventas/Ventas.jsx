// Ventas.js
import React, { useState } from 'react';

const Ventas = ({ productos, setProductos }) => {
  const [nombre, setNombre] = useState('');
  const [presentacion, setPresentacion] = useState('');
  const [cantidad, setCantidad] = useState();
  const [error, setError] = useState('');

  const manejarVenta = (e) => {
    e.preventDefault();
    if (!nombre || !presentacion || cantidad) {
      setError('Por favor, completa todos los campos correctamente.');
      return;
    }

    const productoEncontrado = productos.find(
      (producto) => producto.nombre === nombre && producto.presentacion === presentacion
    );

    if (!productoEncontrado) {
      setError('Producto no encontrado.');
      return;
    }

    if (productoEncontrado.cantidad < cantidad) {
      setError('No hay suficiente cantidad disponible.');
      return;
    }

    // Actualizar la cantidad del producto
    const nuevosProductos = productos.map((producto) => {
      if (producto.nombre === nombre && producto.presentacion === presentacion) {
        return { ...producto, cantidad: producto.cantidad - cantidad };
      }
      return producto;
    });

    setProductos(nuevosProductos);
    setNombre('');
    setPresentacion('');
    setCantidad();
    setError('');
  };

  return (
    <div className="ventas-container">
      <h2>Realizar Venta</h2>
      {error && <p className="error">{error}</p>}
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
          <label>Presentación:</label>
          <input
            type="text"
            value={presentacion}
            onChange={(e) => setPresentacion(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Cantidad a Vender:</label>
          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
            required
          />
        </div>
        <button type="submit">Vender Producto</button>
      </form>
    </div>
  );
};

export default Ventas;