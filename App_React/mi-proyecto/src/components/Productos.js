import React, { useState } from 'react';
import '../App.css'; // Asegúrate de que la ruta a App.css es correcta

const productos = [
  { id: 1, nombre: "Camiseta", descripcion: "Camiseta cómoda y casual para el día a día.", precio: 120.00, detalles: "Disponible en varios colores y tallas (S, M, L, XL).", imagen: "/images/camisa.jpg" },
  { id: 2, nombre: "Pantalón", descripcion: "Pantalón de mezclilla de alta calidad y durabilidad.", precio: 200.00, detalles: "Ideal para uso casual y formal.", imagen: "/images/pantalon.jpg" },
  { id: 3, nombre: "Zapatillas", descripcion: "Zapatillas deportivas con amortiguación mejorada.", precio: 350.00, detalles: "Perfectas para correr y entrenamientos intensos.", imagen: "/images/zapatos.jpg" },
  { id: 4, nombre: "Sudadera", descripcion: "Sudadera de algodón suave para mantenerte abrigado.", precio: 180.00, detalles: "Disponible en varios colores y estilos.", imagen: "/images/sudadero.jpg" },
  { id: 5, nombre: "Gorra", descripcion: "Gorra ajustable de diseño moderno.", precio: 60.00, detalles: "Perfecta para protegerte del sol y verte bien.", imagen: "https://via.placeholder.com/150" },
  { id: 6, nombre: "Bolso", descripcion: "Bolso de mano elegante y espacioso.", precio: 250.00, detalles: "Ideal para llevar todo lo que necesitas.", imagen: "https://via.placeholder.com/150" },
  { id: 7, nombre: "Reloj", descripcion: "Reloj digital con múltiples funciones.", precio: 400.00, detalles: "Resistente al agua y con luz LED.", imagen: "https://via.placeholder.com/150" },
  { id: 8, nombre: "Lentes de sol", descripcion: "Lentes de sol polarizados para proteger tus ojos.", precio: 90.00, detalles: "Con protección UV y diseño moderno.", imagen: "https://via.placeholder.com/150" },
];

const Productos = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [carrito, setCarrito] = useState([]);

  // Función para agregar un producto al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const productoEnCarrito = prevCarrito.find(item => item.id === producto.id);
      if (productoEnCarrito) {
        // Si el producto ya está en el carrito, incrementa la cantidad
        return prevCarrito.map(item =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      } else {
        // Si el producto no está en el carrito, agrégalo con cantidad 1
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });
  };

  return (
    <div style={{
      padding: '40px 20px',
      backgroundImage: "url('https://via.placeholder.com/1200')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
    }}>
      <h2 style={{ textAlign: 'center', color: '#fff', fontSize: '2rem', marginBottom: '10px' }}>Nuestra Tienda</h2>
      <p style={{ textAlign: 'center', color: '#f5f5f5', marginBottom: '30px' }}>Explora nuestra colección de productos de alta calidad.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {productos.map((producto) => (
          <div
            key={producto.id}
            style={{
              position: 'relative',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              width: '200px',
              textAlign: 'center',
              backgroundColor: '#ffffff',
              transition: 'transform 0.3s ease',
              boxShadow: hoveredProduct === producto.id ? '0 8px 20px rgba(0, 0, 0, 0.3)' : '0 4px 10px rgba(0, 0, 0, 0.1)',
              transform: hoveredProduct === producto.id ? 'scale(1.05)' : 'scale(1)',
              cursor: 'pointer'
            }}
            onMouseEnter={() => setHoveredProduct(producto.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <img src={producto.imagen} alt={producto.nombre} className="product-image" />
            <h4 style={{ fontSize: '1.1rem', margin: '10px 0', color: '#333' }}>{producto.nombre}</h4>
            <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '8px' }}>{producto.descripcion}</p>
            <p style={{ fontWeight: 'bold', color: '#007bff', fontSize: '1.2rem', marginBottom: '10px' }}>Q{producto.precio.toFixed(2)}</p>
            <button
              onClick={() => agregarAlCarrito(producto)}
              style={{
                padding: '10px 15px',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>

      {/* Carrito de compras */}
      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', width: '80%', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
        <h3 style={{ color: '#333' }}>Carrito de Compras</h3>
        {carrito.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <ul>
            {carrito.map(item => (
              <li key={item.id} style={{ marginBottom: '10px' }}>
                {item.nombre} - Q{item.precio.toFixed(2)} x {item.cantidad} = Q{(item.precio * item.cantidad).toFixed(2)}
              </li>
            ))}
          </ul>
        )}
        <p style={{ fontWeight: 'bold', marginTop: '20px' }}>
          Total: Q{carrito.reduce((total, item) => total + item.precio * item.cantidad, 0).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default Productos;
