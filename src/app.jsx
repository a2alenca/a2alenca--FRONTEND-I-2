import React, { useState, useEffect } from 'react';

function App() {
  // Estados solicitados (useState)
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Manejo de efectos 
  useEffect(() => {
    fetch('/assets/js/productos.json')
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error al cargar los productos:", error);
        setCargando(false);
      });
  }, []);

  // Función para agregar productos al carrito
  const agregarAlCarrito = (producto) => {
    if (!carrito.some((item) => item.id === producto.id)) {
      setCarrito([...carrito, producto]);
    }
  };

  // Función para eliminar productos del carrito
  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  return (
    <div className="container py-4">
      {/* Cabecera */}
      <header className="mb-4 pb-2 border-bottom d-flex justify-content-between align-items-center">
        <h1>Tienda de Videojuegos Online</h1>
        <div className="badge bg-primary fs-6 p-2">
          🛒 Carrito: {carrito.length} producto(s)
        </div>
      </header>

      {/* Renderizado condicional de carga */}
      {cargando ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2 text-muted">Cargando catálogo...</p>
        </div>
      ) : (
        <div className="row">
          {/* Catálogo de Productos */}
          <div className="col-lg-8 mb-4">
            <h2 className="h4 mb-3">Catálogo de Videojuegos</h2>
            <div className="row g-3">
              {productos.map((prod) => {
                const enElCarrito = carrito.some((item) => item.id === prod.id);
                return (
                  <div className="col-md-6" key={prod.id}>
                    <div className="card h-100 shadow-sm">
                      <img 
                        src={prod.imagen} 
                        className="card-img-top" 
                        alt={prod.nombre} 
                        style={{ height: '160px', objectFit: 'cover' }}
                      />
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{prod.nombre}</h5>
                        <h6 className="text-success fw-bold">${prod.precio}</h6>
                        <span className="badge bg-secondary mb-2 align-self-start">{prod.categoria}</span>
                        <p className="card-text small text-muted">{prod.descripcion}</p>
                        
                        {/* Botón dinámico (Renderizado condicional de estado) */}
                        <button
                          className={`mt-auto btn ${enElCarrito ? 'btn-success' : 'btn-outline-primary'}`}
                          onClick={() => agregarAlCarrito(prod)}
                          disabled={enElCarrito}
                        >
                          {enElCarrito ? '✓ En el carrito' : 'Agregar al carrito'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Carrito de Compras */}
          <div className="col-lg-4">
            <h2 className="h4 mb-3">Tu Carrito</h2>
            <div className="card shadow-sm p-3 bg-white">
              {/* Renderizado condicional: si el carrito está vacío */}
              {carrito.length === 0 ? (
                <p className="text-muted text-center my-3">El carrito está vacío.</p>
              ) : (
                <ul className="list-group mb-3">
                  {carrito.map((item) => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="my-0">{item.nombre}</h6>
                        <small className="text-muted">${item.precio}</small>
                      </div>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => eliminarDelCarrito(item.id)}
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;