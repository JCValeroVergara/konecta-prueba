import { useContext, useState } from 'react';
import { AuthContext } from '../../context';
import { useGetAll } from '../../hooks';
import { Pagination } from '../ui';
import { EditarButton, SearchButton } from '../buttons';
import { Magnifier, Rotate } from '../icons';
import { EliminarButton } from '../buttons/EliminarButton';
import { EliminarSolicitud } from './EliminarSolicitud';
import { ActualizarSolicitud } from './ActualizarSolicitud';

export const ListaSolicitudes = () => {
    const { token, user } = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchCodigo, setSearchCodigo] = useState('');
    const [activeForm, setActiveForm] = useState(null);
    const [SolicitudId, setSolicitudId] = useState(null);
    const [solicitud, setSolicitud] = useState({});
    
    const limit = 10;
    const [searchParams, setSearchParams] = useState({});

    const { data, loading, error } = useGetAll('solicitudes', currentPage, limit, searchParams, token);

    if (loading) return <p>Cargando...</p>;
    if (error) return <div>Error: {error.message}</div>;

    const solicitudes = data.solicitudes || [];
    const totalPages = Math.ceil(data.empleadosCount / limit);
    

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const handleSearch = () => {
        setSearchParams({ ...searchParams, searchCodigo: searchCodigo });
    }

    const handleReset = () => {
        setSearchParams({});
        setSearchNombre('');
    }
    
    const handleDelete = (ID) => {
        setSolicitudId(ID);
        setActiveForm('eliminar');
    }

    const handleUpdate = (solicitud) => {
        setSolicitud(solicitud);
        setActiveForm('actualizar');
    }

    const handleClose = () => {
        setActiveForm(null);
        window.location.reload();
    };

    return (
        <>
            {activeForm === 'eliminar' && <EliminarSolicitud ID={SolicitudId} onClose={handleClose} />}
            {activeForm === 'actualizar' && <ActualizarSolicitud solicitud={solicitud} onClose={handleClose} />}
            <div className='w-full flex flex-col justify-center'>
                <div className='w-full h-20 flex justify-between'>
                    <div className='ml-4 flex items-center'>
                        <h1 className='text-2xl text-blue-700 font-semibold'>Lista de Solicitudes</h1>
                    </div>
                    <div className='mr-4 flex items-center'>
                        <input
                            type='text'
                            placeholder='Buscar por código'
                            className='border-2 border-blue-700 rounded-md p-2 mt-2'
                            value={searchCodigo}
                            onChange={(event) => setSearchCodigo(event.target.value)}
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
                                    <th className='px-4 py-2 border-b top-0'>CÓDIGO</th>
                                    <th className='px-4 py-2 border-b top-0'>DESCRIPCIÓN</th>
                                    <th className='px-4 py-2 border-b top-0'>RESUMEN</th>
                                    <th className='px-4 py-2 border-b top-0'>EMPLEADO</th>
                                    <th className='px-4 py-2 border-b top-0 text-center'></th>
                                </tr>
                            </thead>
                        <tbody>
                            {solicitudes.map((solicitud, index) => (
                                <tr
                                    key={solicitud.ID}
                                    className={index % 2 === 0 ? 'bg-indigo-300' : ''}
                                >
                                    <td className='px-4 py-2 text-2xl font-normal border border-gray-300'></td>
                                    <td className='px-4 py-2 text-2xl font-normal border border-gray-300'>{solicitud.CODIGO}</td>
                                    <td className='px-4 py-2 text-2xl font-normal border border-gray-300'>{solicitud.DESCRIPCION}</td>
                                    <td className='px-4 py-2 text-2xl font-normal border border-gray-300'>{solicitud.RESUMEN}</td>
                                    <td className='px-4 py-2 text-2xl font-normal border border-gray-300'>{solicitud.Empleado.NOMBRE}</td>
                                    { user?.ROL === 'Empleado' ? null : <td className='px-4 py-2 text-2xl font-normal border border-gray-300 text-center'><EliminarButton onClick={()=>handleDelete(solicitud.ID)}/> <EditarButton onClick={()=>handleUpdate(solicitud)}/></td>}
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
        </>
    );
};
