import { useContext } from 'react';
import { AuthContext } from '../../context';
import { useDelete } from '../../hooks';
import { CerrarButton, ContinuarButton } from '../buttons';

export const EliminarSolicitud = ({ ID, onClose }) => {

    const { token } = useContext(AuthContext);

    const { deleteItem, loading } = useDelete('solicitudes', token);
    
    const handleDelete = async () => {
        await deleteItem(ID);
        onClose();
    };

    const handleClose = () => {
        onClose();
    };
    return (
        <>
            <section className="overflow-y-scroll flex flex-wrap fixed top-0 left-0 z-40 w-full h-full items-center justify-center bg-black bg-opacity-50">
                <div className="flex flex-col flex-wrap w-1/3 items-center justify-center px-6 py-2 mx-auto border-2 border-gray-300 rounded-lg bg-white">
                    <h1 className='text-2xl text-blue-700 font-semibold'>Estas seguro de eliminar la Solicitud?</h1>
                    <div className='w-full h-12 flex flex-row justify-center items-center'>
                        <ContinuarButton onClick={handleDelete} />
                        <CerrarButton onClick={handleClose} />
                    </div>
                    {loading && <p>Eliminando...</p>}
                </div>
            </section>
        </>
    );
};
