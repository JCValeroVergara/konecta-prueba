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
            sessionStorage.setItem('token', token);
            setLogged(true); 
        } else {
            sessionStorage.removeItem('token'); 
            setLogged(false); 
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