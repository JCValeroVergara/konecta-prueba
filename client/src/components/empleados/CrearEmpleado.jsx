import { useContext } from 'react';
import { AuthContext } from '../../context';
import { useCreate, useForm } from '../../hooks';

export const CrearEmpleado = () => {
    const { token } = useContext(AuthContext);
    
    const { formState, onInputChange, onResetForm } = useForm({
        NOMBRE: '',
        FECHA_INGRESO: '',
        SALARIO: '',
    });

    const { createItem, loading, error, successMessage } = useCreate('empleados', token);

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
                    name='NOMBRE'
                    placeholder='Nombre'
                    className='border-2 border-blue-700 rounded-md p-2 mt-2'
                    value={formState.NOMBRE}
                    onChange={onInputChange}
                />
                <input
                    type='date'
                    name='FECHA_INGRESO'
                    placeholder='Fecha de Ingreso'
                    className='border-2 border-blue-700 rounded-md p-2 mt-2'
                    value={formState.FECHA_INGRESO}
                    onChange={onInputChange}
                />
                <input
                    type='number'
                    name='SALARIO'
                    placeholder='Salario'
                    className='border-2 border-blue-700 rounded-md p-2 mt-2'
                    value={formState.PASSWORD}
                    onChange={onInputChange}
                />
                <button
                    type='submit'
                    className='bg-blue-700 text-white rounded-md p-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed'
                    disabled={loading || !formState.NOMBRE || !formState.FECHA_INGRESO || !formState.SALARIO}
                >
                    {loading ? 'Creando...' : 'Crear Empleado'}
                </button>
                {error && <p>Error: {error}</p>}
                {successMessage && <p>{successMessage}</p>}
            </form>
        </div>
    );
};
