import React, { useState } from 'react';
import axios from 'axios';
import './imagen.css'

function UploadImage() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('archivo', selectedImage);

    try {
       axios
       .post('http://127.0.0.1:5000/imagen', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data); // Manejar la respuesta del servidor
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="upload-form">
      <div className="upload-preview">
        {selectedImage && (
          <img src={URL.createObjectURL(selectedImage)} alt="Imagen seleccionada" />
        )}
      </div>
      <input type="file" onChange={handleImageChange} className="upload-input" />
      <button type="submit" className="upload-button">Subir Imagen</button>
    </form>
  );
}

export default UploadImage;