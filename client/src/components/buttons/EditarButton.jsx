import { PenEdit } from '../icons';

export const EditarButton = ({onClick}) => {
    return (
        <button
            title="Eliminar"
            onClick={onClick}
            className="ml-2 p-2 border border-white rounded-md hover:bg-green-600 transition bg-slate-500"
        >
            <PenEdit className="w-3 h-3 dark:invert" />
        </button>
    );
};
