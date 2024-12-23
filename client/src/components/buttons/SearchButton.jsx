
export const SearchButton = ({ label, onClick, icon: Icon }) => {
    return (
        <button 
            onClick={onClick}
            className='w-28 border-2 border-blue-700 rounded-md ml-3 p-2 mt-2 flex items-center' >
            {Icon && <Icon className="mr-2" />}
            {label}
        </button>
    );
};
