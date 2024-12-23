
export const ActionsButton = ({ label, onClick}) => {
    return (
        <button
            onClick={onClick}
            className="border-2 w-64 border-blue-700 rounded-md p-2 m-2"
        >
            {label}
        </button>
    );
};
