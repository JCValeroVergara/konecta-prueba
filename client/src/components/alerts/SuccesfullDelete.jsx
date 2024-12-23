
import { Info } from '../icons';

export const SuccesfullDelete = ({ onClose, message}) => {
    return (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div
                className="p-4 mb-4 text-green-800 border border-green-600 rounded-lg bg-gray-200 dark:text-green-600 dark:border-green-800"
                role="alert"
            >
                <div className="flex justify-center items-center">
                <Info className="w-5 h-5 mr-3 text-green-600" />
                <h3 className="text-lg font-medium">Proceso Exitoso!</h3>
                </div>
                <div className="mt-2 mb-4 text-sm">
                {message}
                </div>
                <div className="flex justify-center">
                <button
                    type="button"
                    title='Continuar'
                    className="text-green-800 bg-green-400 border border-green-800 hover:bg-green-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-green-600 dark:border-green-600 dark:text-green-800"
                    data-dismiss-target="#alert-additional-content-3"
                    aria-label="Close"
                    onClick={onClose}
                >
                    Continuar
                </button>
                </div>
            </div>
        </div>
    );
}