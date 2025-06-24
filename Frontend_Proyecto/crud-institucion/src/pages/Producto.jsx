import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Productos.css';
import axios from 'axios';

const Productos = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState('');
  const [fecha_entrada, setFechaEntrada] = useState('');
  const [fecha_vence, setFechaVence] = useState('');
  const [estado, setEstado] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precio_entrada, setPrecioEntrada] = useState('');
  const [precio_salida, setPrecioSalida] = useState('');
  const [categoria_id, setCategoriaId] = useState('');
  const [editando, setEditando] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchCategorias();
      fetchProductos();
    }
  }, []);

  const fetchCategorias = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:5000/categorias', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCategorias(res.data);
    } catch (err) {
      setError('Error al obtener categorías.');
    }
  };

  const fetchProductos = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:5000/productos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProductos(res.data);
    } catch (err) {
      setError('Error al obtener productos.');
    }
  };

  const limpiarFormulario = () => {
    setNombre('');
    setFechaEntrada('');
    setFechaVence('');
    setEstado('');
    setCantidad('');
    setPrecioEntrada('');
    setPrecioSalida('');
    setCategoriaId('');
    setEditando(null);
    setError('');
    setSuccess('');
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!nombre || !fecha_entrada || !fecha_vence || !estado || !cantidad || !precio_entrada || !precio_salida || !categoria_id) {
      setError('Por favor, completa todos los campos correctamente.');
      return;
    }

    if (parseInt(cantidad) <= 0 || parseFloat(precio_entrada) <= 0 || parseFloat(precio_salida) <= 0) {
      setError('Cantidad y precios deben ser valores positivos.');
      return;
    }

    if (new Date(fecha_entrada) > new Date(fecha_vence)) {
      setError('La fecha de entrada no puede ser posterior a la fecha de vencimiento.');
      return;
    }

    const productoData = {
      nombre,
      fecha_entrada,
      fecha_vence,
      estado,
      cantidad: parseInt(cantidad),
      precio_entrada: parseFloat(precio_entrada),
      precio_salida: parseFloat(precio_salida),
      categoria_id: parseInt(categoria_id)
    };

    try {
      setLoading(true);
      let res;
      if (editando) {
        res = await axios.put(`http://127.0.0.1:5000/productos/${editando}`, productoData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSuccess(res.data.msg || 'Producto actualizado correctamente.');
      } else {
        res = await axios.post('http://127.0.0.1:5000/productos', productoData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSuccess(res.data.msg || 'Producto agregado correctamente.');
      }

      fetchProductos();
      limpiarFormulario();
    } catch (err) {
      const msg = err.response?.data?.msg || 'Error al guardar el producto.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const manejarEliminar = async (id) => {
    setError('');
    setSuccess('');
  
    try {
      const res = await axios.delete(`http://127.0.0.1:5000/productos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      setSuccess(res.data.msg || 'Producto eliminado correctamente.');
      setProductos(productos.filter(p => p.id !== id));
    } catch (err) {
      const response = err.response;
      if (response) {
        console.error('Error del servidor:', response.status, response.data);
        if (response.status === 403) {
          setError('No tienes permisos para eliminar este producto.');
        } else if (response.status === 404) {
          setError('Producto no encontrado.');
        } else if (response.status === 401) {
          setError('No autorizado. Vuelve a iniciar sesión.');
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setError(response.data?.msg || 'Error desconocido al eliminar el producto.');
        }
      } else {
        setError('No se pudo conectar con el servidor.');
        console.error(err);
      }
    }
  };

  const manejarEditar = (producto) => {
    setNombre(producto.nombre);
    setFechaEntrada(producto.fecha_entrada);
    setFechaVence(producto.fecha_vence);
    setEstado(producto.estado);
    setCantidad(producto.cantidad.toString());
    setPrecioEntrada(producto.precio_entrada.toString());
    setPrecioSalida(producto.precio_salida.toString());
    setCategoriaId(producto.categoria_id.toString());
    setEditando(producto.id);
    setError('');
    setSuccess('');
  };

  return (
    <div className="inventario-container">
      <h2>{editando ? 'Editar Producto' : 'Agregar Producto al Inventario'}</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form onSubmit={manejarEnvio}>
        <div><label>Nombre:</label><input type="text" value={nombre} onChange={e => setNombre(e.target.value)} required /></div>
        <div><label>Fecha Entrada:</label><input type="date" value={fecha_entrada} onChange={e => setFechaEntrada(e.target.value)} required /></div>
        <div><label>Fecha Vencimiento:</label><input type="date" value={fecha_vence} onChange={e => setFechaVence(e.target.value)} required /></div>
        <div><label>Estado:</label><input type="text" value={estado} onChange={e => setEstado(e.target.value)} required /></div>
        <div><label>Cantidad:</label><input type="number" value={cantidad} onChange={e => setCantidad(e.target.value)} required /></div>
        <div><label>Precio Entrada:</label><input type="number" value={precio_entrada} onChange={e => setPrecioEntrada(e.target.value)} required /></div>
        <div><label>Precio Salida:</label><input type="number" value={precio_salida} onChange={e => setPrecioSalida(e.target.value)} required /></div>
        <div>
          <label>Categoría:</label>
          <select value={categoria_id} onChange={e => setCategoriaId(e.target.value)} required>
            <option value="">Selecciona una categoría</option>
            {categorias.map(categoria => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : (editando ? 'Actualizar' : 'Agregar')}
        </button>
      </form>

      <h3>Lista de Productos</h3>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            <strong>{producto.nombre}</strong> - {producto.cantidad} unidades
            <button onClick={() => manejarEditar(producto)}>Editar</button>
            <button onClick={() => manejarEliminar(producto.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Productos;
