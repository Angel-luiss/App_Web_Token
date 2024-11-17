import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Productos from './components/Productos';


const App = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Redirigir automáticamente a productos si ya hay un token en el localStorage
        if (token) {
            navigate('/productos');
        }
    }, [token, navigate]);

    // Manejar el inicio de sesión
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setToken(data.token);
                localStorage.setItem('token', data.token); // Guardar token en localStorage
                navigate('/productos'); // Redirigir a la página de productos
            } else {
                setError(data.error);
            }
        } catch (error) {
            console.error("Error en la solicitud de inicio de sesión:", error);
            setError("Error al conectar con el servidor. Por favor, inténtalo de nuevo.");
        }
    };

    // Cerrar sesión
    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token'); // Eliminar token de localStorage
        navigate('/'); // Redirigir a la página de inicio
    };

    return (
        <div className="container mt-5">
            <Routes>
                {!token ? (
                    <Route path="/" element={
                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label className="form-label">Usuario</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {error && <div className="alert alert-danger">{error}</div>}

                            <button type="submit" className="btn btn-primary">
                                Iniciar sesión
                            </button>
                        </form>
                    } />
                ) : (
                    <Route path="/productos" element={<Productos />} />
                )}
                {/* Redirigir automáticamente a /productos si el token está presente */}
                {token && <Route path="/" element={<Navigate to="/productos" replace />} />}
            </Routes>
            {token && (
                <button className="btn btn-danger" onClick={handleLogout}>
                    Cerrar sesión
                </button>
            )}
        </div>
    );
};

export default App;
