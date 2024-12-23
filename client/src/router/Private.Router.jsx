import { Route, Routes } from 'react-router-dom';
import { EmpleadosPage, SolicitudesPage, UsuariosPage } from '../pages';
import { Navbar } from '../components';

export const PrivateRouter = () => {
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
