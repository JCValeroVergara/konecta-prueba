import { useContext } from 'react';
import { AuthContext } from '../../context';
import { NavLink, useNavigate } from 'react-router-dom';


export const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login', { replace: true });
    }

    return (
        <nav className='w-full h-12 bg-blue-600 text-white p-5 flex justify-between items-center'>
            <div className='flex items-center text-2xl font-semibold'>
                <h1>Konecta</h1>
            </div>
            <div className='flex flex-row'>
                <div className='flex justify-center items-center'>
                    <NavLink to='/empleados' className={({ isActive }) => `mx-4 font-semibold text-xl ${isActive ? 'active' : ''}`}>Empleados</NavLink>
                </div>
                <div className='flex justify-center items-center'>
                    <NavLink to='/solicitudes' className={({ isActive }) => `mx-4 font-semibold text-xl ${isActive ? 'active' : ''}`}>Solicitudes</NavLink>
                </div>
                <div className='flex justify-center items-center'>
                    {user?.ROL === 'Empleado' ? (
                        <span className='mx-4 font-semibold text-xl text-gray-400 cursor-not-allowed'>Usuarios</span>
                    ) : (
                        <NavLink to='/usuarios' className={({ isActive }) => `mx-4 font-semibold text-xl ${isActive ? 'active' : ''}`}>Usuarios</NavLink>
                    )}
                </div>
                <div className='flex items-center'>
                    <p className='mr-4 font-semibold text-xl'>{user?.name}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </nav>
    );
};
