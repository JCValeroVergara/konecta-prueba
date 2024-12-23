

export const CerrarButton = ({onClick}) => {
    return (
        <button
            title="Cerrar"
            onClick={onClick}
            className="w-32 h-10 p-2 border text-white border-white rounded-md hover:bg-green-500 transition bg-slate-500 mx-3"
        >
            Cerrar
        </button>
    );
};
