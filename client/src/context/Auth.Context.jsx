import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [logged, setLogged] = useState(true);
    const [token, setToken] = useState(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoianVhbkBleGFtcGxlLmNvbSIsInJvbCI6IkFkbWluaXN0cmFkb3IiLCJpYXQiOjE3MzQ5MzEyNjR9.w1WctT0B5szrJ7UcUDv8wtHyx5QrFLiBMHsQaAk9Q28'
    );
    const navigate = useNavigate();

    const login = (newToken, userData) => {
        setToken(newToken);
        setLogged(true);
        setUser(userData)
        navigate('/Empleados');
    }

    const logout = () => {
        setToken(null);
        setUser(null);
        setLogged(false);
        navigate('/login');
    }

    return (
        <AuthContext.Provider value={{ user, setUser, logged, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}