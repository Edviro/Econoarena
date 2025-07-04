import React, { useState, useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import { Search, X, Filter } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const SearchBar = ({
  value = '',
  onChange,
  onSearch,
  onClear,
  placeholder = 'Buscar...',
  showFilter = false,
  filterOptions = [],
  selectedFilters = [],
  onFilterChange,
  debounceMs = 300,
  disabled = false,
  fullWidth = false,
  size = 'md',
  className = '',
  inputClassName = '',
  ...props
}) => {
  const [searchValue, setSearchValue] = useState(value);
  const [showFilters, setShowFilters] = useState(false);
  const debounceRef = useRef();
  const filterRef = useRef();

  // Efecto para manejar el debounce
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      onChange?.(searchValue);
    }, debounceMs);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchValue, onChange, debounceMs]);

  // Cerrar filtros al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
  };

  const handleSearch = () => {
    onSearch?.(searchValue);
  };

  const handleClear = () => {
    setSearchValue('');
    onClear?.();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleFilterToggle = (filterId) => {
    const newFilters = selectedFilters.includes(filterId)
      ? selectedFilters.filter(id => id !== filterId)
      : [...selectedFilters, filterId];
    
    onFilterChange?.(newFilters);
  };

  const activeFiltersCount = selectedFilters?.length || 0;

  return (
    <div className={clsx('relative', fullWidth ? 'w-full' : '', className)} {...props}>
      <div className="flex items-center space-x-2">
        {/* Campo de búsqueda */}
        <div className="relative flex-1">
          <Input
            type="text"
            value={searchValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            size={size}
            fullWidth
            leftIcon={<Search size={18} />}
            rightIcon={
              searchValue && (
                <button
                  onClick={handleClear}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  type="button"
                >
                  <X size={16} />
                </button>
              )
            }
            className={inputClassName}
          />
        </div>

        {/* Botón de búsqueda */}
        <Button
          onClick={handleSearch}
          disabled={disabled}
          size={size}
          className="px-4"
        >
          <Search size={18} />
        </Button>

        {/* Botón de filtros */}
        {showFilter && filterOptions.length > 0 && (
          <div className="relative" ref={filterRef}>
            <Button
              variant="secondary"
              onClick={() => setShowFilters(!showFilters)}
              disabled={disabled}
              size={size}
              className="relative"
            >
              <Filter size={18} />
              {activeFiltersCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </Button>

            {/* Panel de filtros */}
            {showFilters && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                <div className="p-4">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                    Filtros
                  </h4>
                  
                  <div className="space-y-2">
                    {filterOptions.map((filter) => (
                      <label
                        key={filter.id}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedFilters.includes(filter.id)}
                          onChange={() => handleFilterToggle(filter.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {filter.label}
                        </span>
                        {filter.count !== undefined && (
                          <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                            {filter.count}
                          </span>
                        )}
                      </label>
                    ))}
                  </div>

                  {/* Acciones de filtro */}
                  <div className="flex justify-between mt-4 pt-3 border-t border-gray-200 dark:border-gray-600">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onFilterChange?.([])}
                      disabled={activeFiltersCount === 0}
                    >
                      Limpiar
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setShowFilters(false)}
                    >
                      Aplicar
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Filtros activos */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedFilters.map((filterId) => {
            const filter = filterOptions.find(f => f.id === filterId);
            if (!filter) return null;

            return (
              <span
                key={filterId}
                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
              >
                {filter.label}
                <button
                  onClick={() => handleFilterToggle(filterId)}
                  className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5"
                >
                  <X size={12} />
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Componente de búsqueda avanzada
export const AdvancedSearchBar = ({
  fields = [],
  onSearch,
  className = '',
  ...props
}) => {
  const [searchFields, setSearchFields] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.key]: '' }), {})
  );

  const handleFieldChange = (fieldKey, value) => {
    setSearchFields(prev => ({
      ...prev,
      [fieldKey]: value
    }));
  };

  const handleSearch = () => {
    const activeFilters = Object.entries(searchFields)
      .filter(([_, value]) => value !== '')
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    
    onSearch?.(activeFilters);
  };

  const handleClear = () => {
    const clearedFields = Object.keys(searchFields).reduce(
      (acc, key) => ({ ...acc, [key]: '' }), 
      {}
    );
    setSearchFields(clearedFields);
    onSearch?.({});
  };

  return (
    <div className={clsx('bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700', className)} {...props}>
      <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Búsqueda Avanzada
      </h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {fields.map((field) => (
          <Input
            key={field.key}
            label={field.label}
            type={field.type || 'text'}
            placeholder={field.placeholder}
            value={searchFields[field.key]}
            onChange={(e) => handleFieldChange(field.key, e.target.value)}
            fullWidth
          />
        ))}
      </div>

      <div className="flex justify-end space-x-3">
        <Button variant="secondary" onClick={handleClear}>
          Limpiar
        </Button>
        <Button onClick={handleSearch}>
          Buscar
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;