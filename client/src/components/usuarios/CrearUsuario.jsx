import { useContext } from 'react';
import { AuthContext } from '../../context';
import { useCreate, useForm } from '../../hooks';

export const CrearUsuario = () => {
    const { token } = useContext(AuthContext);

    const { formState, onInputChange, onResetForm } = useForm({
        NOMBRE: '',
        EMAIL: '',
        PASSWORD: '',
        ROL: 'Empleado',
    });

    const { createItem, loading, error, successMessage } = useCreate('users', token);

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
                    type='text'
                    name='EMAIL'
                    placeholder='Email'
                    className='border-2 border-blue-700 rounded-md p-2 mt-2'
                    value={formState.EMAIL}
                    onChange={onInputChange}
                />
                <input
                    type='password'
                    name='PASSWORD'
                    placeholder='Password'
                    className='border-2 border-blue-700 rounded-md p-2 mt-2'
                    value={formState.PASSWORD}
                    onChange={onInputChange}
                />
                <select
                    name='ROL'
                    className='border-2 border-blue-700 rounded-md p-2 mt-2'
                    value={formState.ROL}
                    onChange={onInputChange}
                >
                    <option value='Administrador'>Administrador</option>
                    <option value='Empleado'>Empleado</option>
                </select>
                <button
                    type='submit'
                    className='bg-blue-700 text-white rounded-md p-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed'
                    disabled={loading || !formState.NOMBRE || !formState.EMAIL || !formState.PASSWORD}
                >
                    {loading ? 'Creando...' : 'Crear Usuario'}
                </button>
                {error && <p>Error: {error}</p>}
                {successMessage && <p>{successMessage}</p>}
            </form>
        </div>
    );
};
