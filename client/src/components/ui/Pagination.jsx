
import { Arrow, DoubleArrow } from '../icons';
import { PaginationButton } from '../buttons';

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    const getPageNumbers = () => {
        if (totalPages <= 5) {
        return pages;
        }

        if (currentPage <= 3) {
        return [1, 2, 3, 4, 5];
        }

        if (currentPage >= totalPages - 2) {
        return [
            totalPages - 4,
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages,
        ];
        }

        return [
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
        ];
    };

    return (
        <div className="flex w-full items-center justify-center space-x-1 py-3">
            <PaginationButton
                title="Primera página"
                icon={<DoubleArrow />}
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
                extraClasses="rotate-180"
            />
            <PaginationButton
                title="Anterior"
                icon={<Arrow />}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                extraClasses="rotate-0"
            />
            {getPageNumbers().map((pageNumber) => (
                <button
                type="button"
                className={`h-8 w-8 border-[1.5px] text-xl border-indigo-500 dark:border-white rounded text-indigo-700 transition-transform duration-300 ${
                    currentPage === pageNumber
                    ? 'bg-blue-500 text-white'
                    : 'dark:text-white dark:bg-indigo-600 hover:bg-blue-500 hover:-translate-y-2'
                }`}
                key={pageNumber}
                onClick={() => onPageChange(pageNumber)}
                >
                {pageNumber}
                </button>
            ))}
            <PaginationButton
                title="Siguiente"
                icon={<Arrow />}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                extraClasses="rotate-180"
            />
            <PaginationButton
                title="Última página"
                icon={<DoubleArrow />}
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
                extraClasses="rotate-0"
            />
        </div>
    );
};
