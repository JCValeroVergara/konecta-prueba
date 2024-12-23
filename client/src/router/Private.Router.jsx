import { Navigate, Route, Routes } from 'react-router-dom';
// import { EmpleadosPage, SolicitudesPage, UsuariosPage } from '../pages';
import { Navbar } from '../components';
import { lazy, Suspense, useContext } from 'react';
import { AuthContext } from '../context/Auth.Context';

const EmpleadosPage = lazy(() => import('../pages/empleados/Empleados.Page'));
const SolicitudesPage = lazy(() => import('../pages/solicitudes/Solicitudes.Page'));
const UsuariosPage = lazy(() => import('../pages/usuarios/Usuarios.Page'));

export const PrivateRouter = () => {
    const { logged } = useContext(AuthContext);

    if (!logged) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <Navbar />
            <div className='container'>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/empleados" element={<EmpleadosPage />} />
                        <Route path="/solicitudes" element={<SolicitudesPage />} />
                        <Route path="/usuarios" element={<UsuariosPage />} />
                    </Routes>
                </Suspense>
            </div>
        </>
    );
};
