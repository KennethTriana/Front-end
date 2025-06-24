import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const navigate = useNavigate();


  const getCargoTexto = (cargoId) => {
    switch (cargoId) {
      case 1:
        return 'Administrador';
      case 2:
        return 'Empleado';
      default:
        return 'Cargo no definido';
    }
  };


  const getCargoId = (cargoTexto) => {
    switch (cargoTexto) {
      case 'Administrador':
        return 1;
      case 'Empleado':
        return 2;
      default:
        return 1; 
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('No estás autenticado');
      navigate('/');
      return;
    }

    try {
      const decoded = jwtDecode(token);

      axios.get('http://127.0.0.1:5000/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        if (error.response && error.response.status === 403) {
          alert('Acceso denegado. Solo administradores pueden ver esta página.');
          navigate('/');
        } else {
          alert('Error al obtener los usuarios');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    } catch (error) {
      alert('Token inválido');
      navigate('/');
    }
  }, [navigate]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    {
      try {
        await axios.delete(`http://127.0.0.1:5000/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(users.filter(user => user.id !== id));
      } catch (error) {
        alert('Error al eliminar el usuario');
        console.error(error);
      }
    }
  };

  const handleEditClick = (user) => {
    setEditingUserId(user.id);

    setEditForm({
      ...user,
      cargo_texto: getCargoTexto(user.cargo_id)
    }); 
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setEditForm({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (id) => {
    const token = localStorage.getItem('token');
    try {

      const dataToSend = {
        ...editForm,
        cargo_id: getCargoId(editForm.cargo_texto)
      };

      delete dataToSend.cargo_texto;

      await axios.put(`http://127.0.0.1:5000/user/${id}`, dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setUsers(users.map(u => (u.id === id ? { ...u, ...dataToSend } : u)));
      setEditingUserId(null);
    } catch (error) {
      alert('Error al actualizar el usuario');
      console.error(error);
    }
  };

  return (
    <div className="container">
      {isLoading ? (
        <p>Cargando...</p>
      ) : users.length > 0 ? (
        <div>
          <h1>Lista de Usuarios</h1>
          {users.map(user => (
            <div key={user.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
              {editingUserId === user.id ? (
                <>
                  <input name="nombres" value={editForm.nombres} onChange={handleChange} placeholder="Nombres" />
                  <input name="apellidos" value={editForm.apellidos} onChange={handleChange} placeholder="Apellidos" />
                  <input name="correo" value={editForm.correo} onChange={handleChange} placeholder="Correo" />
                  <input name="telefono" value={editForm.telefono} onChange={handleChange} placeholder="Teléfono" />
                  <input name="direccion" value={editForm.direccion} onChange={handleChange} placeholder="Dirección" />
                  
                  <select name="cargo_texto" value={editForm.cargo_texto} onChange={handleChange}>
                    <option value="Administrador">Administrador</option>
                    <option value="Empleado">Empleado</option>
                  </select>
                  
                  <input name="foto_perfil" value={editForm.foto_perfil} onChange={handleChange} placeholder="URL de la foto" />

                  <button onClick={() => handleSave(user.id)} style={{ marginRight: '10px' }}>Guardar</button>
                  <button onClick={handleCancelEdit}>Cancelar</button>
                </>
              ) : (
                <>
                  <p><strong>Foto Perfil:</strong></p>
                  <img src={user.foto_perfil} alt="Avatar" style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
                  <p><strong>Nombres:</strong> {user.nombres}</p>
                  <p><strong>Apellidos:</strong> {user.apellidos}</p>
                  <p><strong>Email:</strong> {user.correo}</p>
                  <p><strong>Teléfono:</strong> {user.telefono}</p>
                  <p><strong>Dirección:</strong> {user.direccion}</p>
                  <p><strong>Cargo:</strong> {getCargoTexto(user.cargo_id)}</p>
                  <button onClick={() => handleEditClick(user)} style={{ marginRight: '10px' }}>Editar</button>
                  <button onClick={() => handleDelete(user.id)}>Eliminar</button>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No se encontraron usuarios.</p>
      )}
    </div>
  );
};

export default UserList;