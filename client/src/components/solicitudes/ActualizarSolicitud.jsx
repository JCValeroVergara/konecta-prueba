import { CerrarButton, ContinuarButton } from '../buttons';

export const ActualizarSolicitud = ({ ID, onClose }) => {
    const handleUpdate = () => {
        // onClick();
    };

    const handleClose = () => {
        onClose();
    };
    return (
        <>
            <section className="overflow-y-scroll flex flex-wrap fixed top-0 left-0 z-50 w-full h-full items-center justify-center bg-black bg-opacity-50">
                <h1>Soy ActualizarSolicitud</h1>
                <div className='w-full h-12 flex flex-row justify-center items-center'>
                    <ContinuarButton onClick={handleUpdate} />
                    <CerrarButton onClick={handleClose} />
                </div>
            </section>
        </>
    );
};
