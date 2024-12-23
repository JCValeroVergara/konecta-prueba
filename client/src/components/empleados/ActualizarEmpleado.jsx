import { useContext } from 'react';
import { CerrarButton, SubmitButton } from '../buttons';
import { AuthContext } from '../../context';
import { useForm, useUpdate } from '../../hooks';


export const ActualizarEmpleado = ({ empleado, onClose }) => {
    const { token } = useContext(AuthContext);
    console.log(empleado);

    const { formState, onInputChange, onResetForm } = useForm({
        NOMBRE: empleado?.NOMBRE || '',
        FECHA_INGRESO: empleado?.FECHA_INGRESO.split('T')[0] || '',
        SALARIO: empleado?.SALARIO || '',
    });

    const { updateItem, loading, error, successMessage } = useUpdate('empleados', token);

    const handleClose = () => {
        onClose();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateItem(empleado?.ID, formState);
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
                        <h1 className='text-2xl text-blue-700 font-semibold'>Actualizar Empleado</h1>
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
                                value={formState.SALARIO}
                                onChange={onInputChange}
                            />
                            <div className='mt-4 w-full h-12 flex flex-row justify-center items-center'>
                                <SubmitButton
                                    loading={loading}
                                    disabled={loading || !formState.NOMBRE || !formState.FECHA_INGRESO || !formState.SALARIO}
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
