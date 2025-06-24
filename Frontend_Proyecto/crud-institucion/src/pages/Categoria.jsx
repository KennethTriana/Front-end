import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom'; 
import './categoria.css';
function Categoria() {
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState('');
  const [editando, setEditando] = useState(null);
  const [autenticado, setAutenticado] = useState(true); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setAutenticado(false);
      return;
    }

    
    axios.get('http://localhost:5000/categorias', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setCategorias(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las categorías:', error);
      });
  }, []);

  if (!autenticado) {
    return <Navigate to="/login" />;
  }

  const manejarSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      alert('Por favor, ingresa un nombre para la categoría.');
      return;
    }

    const token = localStorage.getItem('token');
    const categoriaData = { nombre };

    if (editando) {
      axios.put(`http://localhost:5000/categorias/${editando}`, categoriaData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(() => {
          setCategorias(prev =>
            prev.map(c => c.id === editando ? { ...c, nombre } : c)
          );
          setNombre('');
          setEditando(null);
        })
        .catch(error => {
          console.error('Error al actualizar la categoría:', error);
          alert('Hubo un error al actualizar la categoría.');
        });
    } else {
      axios.post('http://localhost:5000/categorias', categoriaData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          setCategorias(prev => [...prev, { id: response.data.id, nombre }]);
          setNombre('');
        })
        .catch(error => {
          console.error('Error al crear la categoría:', error);
          alert('Ya existe otra categoría con el nombre.');
        });
    }
  };

  const manejarEdicion = (categoria) => {
    setNombre(categoria.nombre);
    setEditando(categoria.id);
  };

  const manejarEliminar = (id) => {
    const token = localStorage.getItem('token');
  

    axios.delete(`http://localhost:5000/categorias/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        setCategorias(prev => prev.filter(c => c.id !== id));
      })
      .catch(error => {
        console.error('Error al eliminar la categoría:', error);
        alert('Hubo un error al eliminar la categoría.');
      });
  };

  const cancelarEdicion = () => {
    setNombre('');
    setEditando(null);
  };

  return (
    <div>
      <h2>Administrar Categorías</h2>
      <form onSubmit={manejarSubmit}>
        <input
          data-testid="input-nombre-categoria"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre de la categoría"
        />
        <button type="submit" data-testid="btn-agregar-categoria">
          {editando ? 'Actualizar' : 'Agregar'} Categoría
        </button>
        {editando && (
          <button type="button" onClick={cancelarEdicion} style={{ marginLeft: '10px' }}>
            Cancelar edición
          </button>
        )}
      </form>
      <ul>
        {categorias.map(categoria => (
          <li key={categoria.id}>
            {categoria.nombre}
            <button onClick={() => manejarEdicion(categoria)} style={{ marginLeft: '10px' }}>Editar</button>
            <button onClick={() => manejarEliminar(categoria.id)} style={{ marginLeft: '5px', color: 'red' }}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categoria;