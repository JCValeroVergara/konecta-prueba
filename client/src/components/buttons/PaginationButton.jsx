
export const PaginationButton = ({ onClick, disabled, title, icon, extraClasses }) => {
    
    return (
        <button
            type="button"
            title={title}
            className={`h-8 w-8 border-[1.5px] border-indigo-500 dark:border-white rounded text-indigo-700 dark:text-white dark:bg-indigo-600 ${extraClasses} transition ${
            disabled ? 'cursor-not-allowed' : `hover:bg-blue-500`
            }`}
            onClick={onClick}
            disabled={disabled}
        >
            {icon}
        </button>
    );
};
