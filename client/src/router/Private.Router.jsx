import { Navigate, Route, Routes } from 'react-router-dom';
import { EmpleadosPage, SolicitudesPage, UsuariosPage } from '../pages';
import { Navbar } from '../components';
import { useContext } from 'react';
import { AuthContext } from '../context/Auth.Context';

export const PrivateRouter = () => {
    const { logged } = useContext(AuthContext);

    if (!logged) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <Navbar />
            <div className='container'>
                <Routes>
                    <Route path="/empleados" element={<EmpleadosPage />} />
                    <Route path="/solicitudes" element={<SolicitudesPage />} />
                    <Route path="/usuarios" element={<UsuariosPage />} />
                </Routes>
            </div>
        </>
    );
};
