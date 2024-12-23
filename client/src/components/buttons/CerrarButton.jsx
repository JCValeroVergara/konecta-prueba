

export const CerrarButton = ({onClick}) => {
    return (
        <button
            title="Cerrar"
            onClick={onClick}
            className="p-2 border border-white rounded-md hover:bg-red-500 transition bg-slate-500 mx-3"
        >
            Cerrar
        </button>
    );
};
