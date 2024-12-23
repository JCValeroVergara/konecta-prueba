import { useContext, useEffect, useState } from 'react';
import { CerrarButton, SubmitButton } from '../buttons';
import { AuthContext } from '../../context';
import { useForm, useUpdate } from '../../hooks';
import { allEmpleadosFetch } from '../../helpers';

export const ActualizarSolicitud = ({ solicitud, onClose }) => {
    const { token } = useContext(AuthContext);
    const [empleadosData, setEmpleadosData] = useState([]);
    console.log(solicitud);

    const { formState, onInputChange, onResetForm } = useForm({
        CODIGO: solicitud?.CODIGO || '',
        DESCRIPCION: solicitud?.DESCRIPCION || '',
        RESUMEN: solicitud?.RESUMEN || '',
        ID_EMPLEADO: solicitud?.ID_EMPLEADO || '',
    });

    useEffect(() => {
        const fetchEmpleados = async () => {
            const result = await allEmpleadosFetch(token);
            if (result && result.empleados) {
                setEmpleadosData(result.empleados);
            }
        };
        fetchEmpleados();
    }, [token]);

    const { updateItem, loading, error, successMessage } = useUpdate('solicitudes', token);

    const handleClose = () => {
        onClose();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateItem(solicitud?.ID, formState);
            onResetForm();
            onClose();
        } catch (error) {
            console.error('Error al actualizar el empleado:', error);
        }
    }

    return (
        <>
            <section className="overflow-y-scroll flex fixed top-0 left-0 z-40 w-full h-full items-center justify-center bg-black bg-opacity-50">
                <div className="flex flex-col w-1/3 items-center justify-center px-6 py-2 mx-auto border-2 border-gray-300 rounded-lg bg-white">
                    <div className='w-full h-12 flex flex-row justify-center items-center'>
                        <h1 className='text-2xl text-blue-700 font-semibold'>Actualizar Solicitud</h1>
                    </div>
                    <div className='w-4/5 mt-2 flex flex-col items-center'>
                        <form className='w-full flex flex-col mt-2' onSubmit={handleSubmit}>
                            <input
                                type='text'
                                name='CODIGO'
                                placeholder='Codigo'
                                className='border-2 border-blue-700 rounded-md p-2 mt-2'
                                value={formState.CODIGO}
                                onChange={onInputChange}
                            />
                            <input
                                type='text'
                                name='DESCRIPCION'
                                placeholder='Descripcion'
                                className='border-2 border-blue-700 rounded-md p-2 mt-2'
                                value={formState.DESCRIPCION}
                                onChange={onInputChange}
                            />
                            <input
                                type='text'
                                name='RESUMEN'
                                placeholder='Resumen'
                                className='border-2 border-blue-700 rounded-md p-2 mt-2'
                                value={formState.RESUMEN}
                                onChange={onInputChange}
                            />
                            <select
                                name='ID_EMPLEADO'
                                className='border-2 border-blue-700 rounded-md p-2 mt-2'
                                value={formState.ID_EMPLEADO}
                                onChange={onInputChange}
                            >
                                <option value='' disabled>Selecciona un empleado</option>
                                {empleadosData
                                    .sort((a, b) => a.NOMBRE.localeCompare(b.NOMBRE))
                                    .map(empleado => (
                                    <option key={empleado.ID} value={empleado.ID}>
                                        {empleado.NOMBRE} 
                                    </option>
                                ))}
                            </select>
                            <div className='mt-4 w-full h-12 flex flex-row justify-center items-center'>
                                <SubmitButton
                                    loading={loading}
                                    disabled={loading || !formState.CODIGO || !formState.DESCRIPCION || !formState.RESUMEN || !formState.ID_EMPLEADO}
                                >
                                Actualizar
                                </SubmitButton>
                                <CerrarButton onClick={handleClose} />
                            </div>
                            {error && <p>Error: {error}</p>}
                            {successMessage && <p>{successMessage}</p>}
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};
