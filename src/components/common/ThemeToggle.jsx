import React from 'react';
import { clsx } from 'clsx';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = ({
  size = 'md',
  variant = 'button',
  className = '',
  ...props
}) => {
  const { isDarkMode, toggleTheme } = useTheme();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  if (variant === 'switch') {
    return (
      <div className={clsx('flex items-center space-x-3', className)} {...props}>
        <Sun size={iconSizes[size]} className="text-yellow-500" />
        <button
          onClick={toggleTheme}
          className={clsx(
            'relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
            isDarkMode ? 'bg-blue-600' : 'bg-gray-200'
          )}
          role="switch"
          aria-checked={isDarkMode}
          aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        >
          <span
            className={clsx(
              'inline-block w-4 h-4 transform bg-white rounded-full transition-transform',
              isDarkMode ? 'translate-x-6' : 'translate-x-1'
            )}
          />
        </button>
        <Moon size={iconSizes[size]} className="text-blue-600" />
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={clsx(
        'relative flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
        'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
        'hover:bg-gray-50 dark:hover:bg-gray-700',
        'shadow-sm hover:shadow-md',
        sizeClasses[size],
        className
      )}
      aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      {...props}
    >
      <div className="relative">
        {/* Icono de sol */}
        <Sun
          size={iconSizes[size]}
          className={clsx(
            'absolute inset-0 transition-all duration-300 text-yellow-500',
            isDarkMode
              ? 'opacity-0 rotate-90 scale-0'
              : 'opacity-100 rotate-0 scale-100'
          )}
        />
        
        {/* Icono de luna */}
        <Moon
          size={iconSizes[size]}
          className={clsx(
            'absolute inset-0 transition-all duration-300 text-blue-600',
            isDarkMode
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 -rotate-90 scale-0'
          )}
        />
      </div>

      {/* Efecto de ripple */}
      <div className="absolute inset-0 rounded-full opacity-0 hover:opacity-20 transition-opacity bg-current" />
    </button>
  );
};

// Componente más simple para menús
export const ThemeToggleMenuItem = ({
  onClick,
  className = '',
  ...props
}) => {
  const { isDarkMode, toggleTheme } = useTheme();

  const handleClick = () => {
    toggleTheme();
    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(
        'flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors',
        className
      )}
      {...props}
    >
      {isDarkMode ? (
        <>
          <Sun size={16} className="mr-3 text-yellow-500" />
          Modo Claro
        </>
      ) : (
        <>
          <Moon size={16} className="mr-3 text-blue-600" />
          Modo Oscuro
        </>
      )}
    </button>
  );
};

// Hook personalizado para detectar preferencias del sistema
export const useSystemTheme = () => {
  const [systemTheme, setSystemTheme] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return systemTheme;
};

export default ThemeToggle;