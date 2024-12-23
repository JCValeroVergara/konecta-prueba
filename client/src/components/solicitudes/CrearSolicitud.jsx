import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context';
import { useCreate, useForm, useGetAll } from '../../hooks';
import { allEmpleadosFetch } from '../../helpers';

export const CrearSolicitud = () => {
    const { token } = useContext(AuthContext);
    const [empleadosData, setEmpleadosData] = useState([]);
    
    const { formState, onInputChange, onResetForm } = useForm({
        CODIGO: '',
        DESCRIPCION: '',
        RESUMEN: '',
        ID_EMPLEADO: '',
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


    const { createItem, loading, error, successMessage } = useCreate('solicitudes', token);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = await createItem(formState);

        if (data) {
            onResetForm();
        }
    };

    return (
        <div className='w-1/2 mx-auto mt-10 flex flex-col items-center'>
            <h1 className='text-5xl text-blue-700'>Login</h1>
            <hr />
            <form className='w-1/2 flex flex-col mt-5' onSubmit={handleSubmit}>
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
                <button
                    type='submit'
                    className='bg-blue-700 text-white rounded-md p-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed'
                    disabled={loading || !formState.CODIGO || !formState.DESCRIPCION || !formState.RESUMEN || !formState.ID_EMPLEADO}
                >
                    {loading ? 'Creando...' : 'Crear Usuario'}
                </button>
                {error && <p>Error: {error}</p>}
                {successMessage && <p>{successMessage}</p>}
            </form>
        </div>
    );
};
