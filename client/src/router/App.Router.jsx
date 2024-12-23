import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useContext } from 'react';
import { AuthContext } from '../context/Auth.Context';
import { PrivateRouter } from './Private.Router';


const LoginPage = lazy(() => import('../pages/auth/Login.Page'));

export const AppRouter = () => {
    const { logged } = useContext(AuthContext);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/login" element={logged ? <Navigate to="/empleados" /> : <LoginPage />} />
                <Route path="*" element={logged ? <PrivateRouter /> : <Navigate to="/login" />} />
            </Routes>
        </Suspense>
    );
};
