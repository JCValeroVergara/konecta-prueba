

export const ContinuarButton = ({onClick}) => {
    return (
        <button
            title="Continuar"
            onClick={onClick}
            className="w-32 h-10 text-white p-2 border border-white rounded-md hover:bg-red-500 transition bg-slate-500 mx-3"
        >
            Continuar
        </button>
    );
};
