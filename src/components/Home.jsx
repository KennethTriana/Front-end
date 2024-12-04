import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10); // Número de productos por página

  useEffect(() => {
    axios.get('https://api.escuelajs.co/api/v1/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error al obtener los productos:', error));
  }, []);

  // Calcular los productos que se deben mostrar en la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Cambiar de página
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Número total de páginas
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container">
      <h1>Productos</h1>
      <div className="grid">
        {currentProducts.map(product => (
          <div key={product.id} className="card">
            <img src={product.images[0]} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        {pageNumbers.map(number => (
          <button key={number} onClick={() => paginate(number)}>
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Home;