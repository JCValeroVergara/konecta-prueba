import { Delete } from '../icons';

export const EliminarButton = ({onClick}) => {
    return (
        <button
            title="Eliminar"
            onClick={onClick}
            className="p-2 border border-white rounded-md hover:bg-red-500 transition bg-slate-500"
        >
            <Delete className="w-3 h-3 dark:invert" />
        </button>
    );
};
