import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from '../pages';
import { useContext } from 'react';
import { AuthContext } from '../context/Auth.Context';
import { PrivateRouter } from './Private.Router';

export const AppRouter = () => {
    const { logged } = useContext(AuthContext);

    return (
        <Routes>
            <Route path="/login" element={logged ? <Navigate to="/empleados" /> : <LoginPage />} />
            <Route path="*" element={logged ? <PrivateRouter /> : <Navigate to="/login" />} />
        </Routes>
    );
};
