import { useContext, useState } from 'react';
import { AuthContext } from '../../context';
import { useGetAll } from '../../hooks';
import { Pagination } from '../ui';
import { SearchButton } from '../buttons';
import { Magnifier, Rotate } from '../icons';

export const ListaEmpleados = () => {
    const { token } = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchNombre, setSearchNombre] = useState('');
    
    const limit = 10;
    const [searchParams, setSearchParams] = useState({});

    const { data, loading, error } = useGetAll('empleados', currentPage, limit, searchParams, token);

    if (loading) return <p>Cargando...</p>;
    if (error) return <div>Error: {error.message}</div>;

    console.log(data);
    const empleados = data.empleados || [];
    const totalPages = data.empleadosCount/limit;
    

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    }

    const handleSearch = () => {
        setSearchParams({ ...searchParams, searchNombre: searchNombre });
    }

    const handleReset = () => {
        setSearchParams({});
        setSearchNombre('');
    }
        

    return (
        <div className='w-full flex flex-col justify-center'>
            <div className='w-full h-20 flex justify-between'>
                <div className='ml-4 flex items-center'>
                    <h1 className='text-2xl text-blue-700 font-semibold'>Lista de Usuarios</h1>
                </div>
                <div className='mr-4 flex items-center'>
                    <input
                        type='text'
                        placeholder='Buscar por nombre'
                        className='border-2 border-blue-700 rounded-md p-2 mt-2'
                        value={searchNombre}
                        onChange={(event) => setSearchNombre(event.target.value)}
                    />
                    <SearchButton
                        label='Buscar'
                        onClick={handleSearch}
                        icon={Magnifier}
                    />
                    <SearchButton
                        label='Limpiar'
                        onClick={handleReset}
                        icon={Rotate}
                    />
                </div>
            </div>
            <div className='ml-4 overflow-x-auto rounded-xl border border-gray-300'>
                <div className='max-h-[65vh] overflow-y-auto'>
                    <table className=' table-auto w-full border'>
                        <thead>
                            <tr className='bg-slate-400 text-left'>
                                <th className='px-4 py-2 border-b top-0'></th>
                                <th className='px-4 py-2 border-b top-0'>NOMBRE</th>
                                <th className='px-4 py-2 border-b top-0'>FECHA DE INGRESO</th>
                                <th className='px-4 py-2 border-b top-0'>SALARIO</th>
                                {/* <th className='px-4 py-2 border-b top-0 text-center'>SOLICITUDES</th> */}
                            </tr>
                        </thead>
                    <tbody>
                        {empleados.map((empleado, index) => (
                            <tr
                                key={empleado.ID}
                                className={index % 2 === 0 ? 'bg-indigo-300' : ''}
                            >
                                <td className='px-4 py-2 text-2xl font-normal border border-gray-300'></td>
                                <td className='px-4 py-2 text-2xl font-normal border border-gray-300'>{empleado.NOMBRE}</td>
                                <td className='px-4 py-2 text-2xl font-normal border border-gray-300'>{formatDate(empleado.FECHA_INGRESO)}</td>
                                <td className='px-4 py-2 text-2xl font-normal border border-gray-300'>{empleado.SALARIO}</td>
                                {/* <td className='px-4 py-2 text-center'>{empleado.solicitudes}</td> */}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
};