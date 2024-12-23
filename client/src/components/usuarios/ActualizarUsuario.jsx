import { useContext } from 'react';
import { CerrarButton, SubmitButton } from '../buttons';
import { AuthContext } from '../../context';
import { useForm, useUpdate } from '../../hooks';

export const ActualizarUsuario = ({ usuario, onClose }) => {
    const { token } = useContext(AuthContext);
    

    const { formState, onInputChange, onResetForm } = useForm({
        NOMBRE: usuario?.NOMBRE || '',
        EMAIL: usuario?.EMAIL || '',
        PASSWORD: '',
        ROL: usuario?.ROL || 'Empleado',
    });

    const { updateItem, loading, error, successMessage } = useUpdate('users', token);

    const handleClose = () => {
        onClose();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateItem(usuario?.ID, formState);
            onResetForm();
            onClose();
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
        }
    }

    return (
        <>
            <section className="overflow-y-scroll flex fixed top-0 left-0 z-40 w-full h-full items-center justify-center bg-black bg-opacity-50">
                <div className="flex flex-col w-1/3 items-center justify-center px-6 py-2 mx-auto border-2 border-gray-300 rounded-lg bg-white">
                    <div className='w-full h-12 flex flex-row justify-center items-center'>
                        <h1 className='text-2xl text-blue-700 font-semibold'>Actualizar Usuario</h1>
                    </div>
                    <div className='w-4/5 mt-2 flex flex-col items-center'>
                        <form className='w-full flex flex-col mt-2' onSubmit={handleSubmit}>
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
                            <div className='mt-4 w-full h-12 flex flex-row justify-center items-center'>
                                <SubmitButton
                                    loading={loading}
                                    disabled={loading || !formState.NOMBRE || !formState.EMAIL || !formState.ROL}
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
