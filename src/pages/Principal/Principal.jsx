import React, { useState } from 'react';
import './Principal.css';

const Inventario = () => {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [cantidad, setCantidad] = useState();
  const [precioEntrada, setPrecioEntrada] = useState();
  const [precioSalida, setPrecioSalida] = useState();
  const [presentacion, setPresentacion] = useState('');
  const [error, setError] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!nombre || !categoria || !fechaVencimiento || cantidad <= 0 || precioEntrada <= 0 || precioSalida <= 0 || !presentacion) {
      setError('Por favor, completa todos los campos correctamente.');
      return;
    }

    const nuevoProducto = {
      nombre,
      categoria,
      fechaIngreso: new Date().toLocaleDateString(),
      fechaVencimiento,
      cantidad,
      precioEntrada,
      precioSalida,
      presentacion,
    };

    setProductos([...productos, nuevoProducto]);
    // Reiniciar el formulario
    setNombre('');
    setCategoria('');
    setFechaVencimiento('');
    setCantidad(0);
    setPrecioEntrada(0);
    setPrecioSalida(0);
    setPresentacion('');
    setError('');
  };

  const eliminarProducto = (index) => {
    const nuevosProductos = productos.filter((_, i) => i !== index);
    setProductos(nuevosProductos);
  };

  return (
    <div className="inventario-container">
      <h2>Agregar Producto al Inventario</h2>
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
          <label>Categoría:</label>
          <input
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Fecha de Vencimiento:</label>
          <input
            type="date"
            value={fechaVencimiento}
            onChange={(e) => setFechaVencimiento(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Cantidad:</label>
          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Precio de Entrada:</label>
          <input
            type="number"
            value={precioEntrada}
            onChange={(e) => setPrecioEntrada(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Precio de Salida:</label>
          <input
            type="number"
            value={precioSalida}
            onChange={(e) => setPrecioSalida(Number(e.target.value))}
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
        <button type="submit">Agregar Producto</button>
      </form>

      <h3>Productos en Inventario</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Fecha de Ingreso</th>
            <th>Fecha de Vencimiento</th>
            <th>Cantidad</th>
            <th>Precio de Entrada</th>
            <th>Precio de Salida</th>
            <th>Presentación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto, index) => (
                       <tr key={index}>
              <td>{producto.nombre}</td>
              <td>{producto.categoria}</td>
              <td>{producto.fechaIngreso}</td>
              <td>{producto.fechaVencimiento}</td>
              <td>{producto.cantidad}</td>
              <td>{producto.precioEntrada}</td>
              <td>{producto.precioSalida}</td>
              <td>{producto.presentacion}</td>
              <td>
                <button onClick={() => eliminarProducto(index)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventario;