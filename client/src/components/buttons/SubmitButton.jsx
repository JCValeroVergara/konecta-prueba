

export const SubmitButton = ({ loading, disabled, children }) => {
    return (
        <button
            type="submit"
            className="w-32 h-10 bg-slate-500 hover:bg-blue-500 text-white rounded-md p-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={disabled}
            >
            {loading ? 'Creando...' : children}
        </button>
    );
};

