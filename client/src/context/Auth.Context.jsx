import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [logged, setLogged] = useState(true);
    const [token, setToken] = useState(() => sessionStorage.getItem('token'));
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            sessionStorage.setItem('token', token); // Guardar token en sessionStorage
            setLogged(true); // Actualiza el estado de logged si hay un token
        } else {
            sessionStorage.removeItem('token'); // Eliminar token si no está presente
            setLogged(false); // Actualiza el estado de logged si no hay token
        }
    }, [token]);

    const login = (newToken, userData) => {
        setToken(newToken);
        setUser(userData)
        navigate('/Empleados');
    }

    const logout = () => {
        setToken(null);
        setUser(null);
        navigate('/login');
    }

    return (
        <AuthContext.Provider value={{ user, setUser, logged, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}