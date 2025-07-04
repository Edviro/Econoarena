import React from 'react';
import { clsx } from 'clsx';
import { ChevronUp, ChevronDown, MoreHorizontal } from 'lucide-react';

const Table = ({
  columns = [],
  data = [],
  loading = false,
  sortable = false,
  sortColumn = null,
  sortDirection = 'asc',
  onSort,
  onRowClick,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  rowClassName = '',
  cellClassName = '',
  emptyMessage = 'No hay datos disponibles',
  ...props
}) => {
  const handleSort = (column) => {
    if (!sortable || !column.sortable || !onSort) return;

    const newDirection = 
      sortColumn === column.key && sortDirection === 'asc' ? 'desc' : 'asc';
    
    onSort(column.key, newDirection);
  };

  const getSortIcon = (column) => {
    if (!sortable || !column.sortable) return null;
    
    if (sortColumn !== column.key) {
      return <ChevronUp className="w-4 h-4 text-gray-400" />;
    }
    
    return sortDirection === 'asc' 
      ? <ChevronUp className="w-4 h-4 text-gray-600" />
      : <ChevronDown className="w-4 h-4 text-gray-600" />;
  };

  const renderCell = (item, column, rowIndex) => {
    const value = item[column.key];
    
    if (column.render) {
      return column.render(value, item, rowIndex);
    }
    
    if (column.type === 'currency') {
      return new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: 'PEN'
      }).format(value || 0);
    }
    
    if (column.type === 'number') {
      return new Intl.NumberFormat('es-PE').format(value || 0);
    }
    
    if (column.type === 'date') {
      return value ? new Date(value).toLocaleDateString('es-PE') : '-';
    }
    
    if (column.type === 'datetime') {
      return value ? new Date(value).toLocaleString('es-PE') : '-';
    }
    
    return value ?? '-';
  };

  if (loading) {
    return (
      <div className="w-full">
        <div className="animate-pulse">
          {/* Header skeleton */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-4 gap-4 p-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              ))}
            </div>
          </div>
          {/* Rows skeleton */}
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border-b border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-4 gap-4 p-4">
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={clsx('overflow-hidden rounded-lg shadow ring-1 ring-black ring-opacity-5', className)} {...props}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          {/* Header */}
          <thead className={clsx('bg-gray-50 dark:bg-gray-800', headerClassName)}>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={clsx(
                    'px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider',
                    sortable && column.sortable && 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 select-none',
                    column.headerClassName
                  )}
                  onClick={() => handleSort(column)}
                  style={{ width: column.width }}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.title}</span>
                    {getSortIcon(column)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody className={clsx('bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700', bodyClassName)}>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                      <MoreHorizontal className="w-6 h-6 text-gray-400" />
                    </div>
                    <p>{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((item, rowIndex) => (
                <tr
                  key={item.id || rowIndex}
                  className={clsx(
                    'hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors',
                    onRowClick && 'cursor-pointer',
                    rowClassName
                  )}
                  onClick={() => onRowClick?.(item, rowIndex)}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={clsx(
                        'px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100',
                        cellClassName,
                        column.cellClassName
                      )}
                    >
                      {renderCell(item, column, rowIndex)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Componente helper para acciones de tabla
export const TableActions = ({ children, className = '' }) => {
  return (
    <div className={clsx('flex items-center space-x-2', className)}>
      {children}
    </div>
  );
};

// Componente helper para badges/etiquetas
export const TableBadge = ({ 
  children, 
  variant = 'default', 
  className = '',
  ...props 
}) => {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

// Hook para manejar paginación
export const usePagination = (data, itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const nextPage = () => {
    goToPage(currentPage + 1);
  };

  const previousPage = () => {
    goToPage(currentPage - 1);
  };

  return {
    currentPage,
    totalPages,
    currentData,
    goToPage,
    nextPage,
    previousPage,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1
  };
};

// Componente de paginación
export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showPageNumbers = true,
  className = ''
}) => {
  const pages = [];
  const maxVisiblePages = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (totalPages <= 1) return null;

  return (
    <div className={clsx('flex items-center justify-between', className)}>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          Anterior
        </button>

        {showPageNumbers && (
          <div className="flex items-center space-x-1">
            {startPage > 1 && (
              <>
                <button
                  onClick={() => onPageChange(1)}
                  className="px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  1
                </button>
                {startPage > 2 && <span className="text-gray-500">...</span>}
              </>
            )}

            {pages.map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={clsx(
                  'px-3 py-1 text-sm font-medium rounded-md',
                  page === currentPage
                    ? 'text-white bg-blue-600 border border-blue-600'
                    : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
                )}
              >
                {page}
              </button>
            ))}

            {endPage < totalPages && (
              <>
                {endPage < totalPages - 1 && <span className="text-gray-500">...</span>}
                <button
                  onClick={() => onPageChange(totalPages)}
                  className="px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          Siguiente
        </button>
      </div>

      <p className="text-sm text-gray-700 dark:text-gray-300">
        Página {currentPage} de {totalPages}
      </p>
    </div>
  );
};

export default Table;