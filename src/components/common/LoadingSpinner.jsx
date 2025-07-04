import React from 'react';
import { clsx } from 'clsx';

const LoadingSpinner = ({
  size = 'md',
  color = 'primary',
  text = null,
  fullScreen = false,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    white: 'text-white',
    success: 'text-green-600',
    danger: 'text-red-600',
    warning: 'text-yellow-600'
  };

  const spinner = (
    <div className={clsx('flex flex-col items-center justify-center', className)} {...props}>
      <svg
        className={clsx(
          'animate-spin',
          sizeClasses[size],
          colorClasses[color]
        )}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {text && (
        <p className={clsx(
          'mt-2 text-sm font-medium',
          colorClasses[color] === 'text-white' ? 'text-white' : 'text-gray-600 dark:text-gray-300'
        )}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75">
        {spinner}
      </div>
    );
  }

  return spinner;
};

// Componente de skeleton para cargas más específicas
export const Skeleton = ({
  lines = 1,
  className = '',
  lineClassName = '',
  animated = true,
  ...props
}) => {
  return (
    <div className={clsx('space-y-2', className)} {...props}>
      {[...Array(lines)].map((_, index) => (
        <div
          key={index}
          className={clsx(
            'h-4 bg-gray-200 dark:bg-gray-700 rounded',
            animated && 'animate-pulse',
            lineClassName
          )}
          style={{
            width: `${Math.random() * 40 + 60}%` // Ancho aleatorio entre 60% y 100%
          }}
        />
      ))}
    </div>
  );
};

// Componente para cards de carga
export const SkeletonCard = ({
  className = '',
  showAvatar = false,
  lines = 3,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 animate-pulse',
        className
      )}
      {...props}
    >
      <div className="flex items-start space-x-4">
        {showAvatar && (
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full" />
        )}
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
          {[...Array(lines)].map((_, index) => (
            <div
              key={index}
              className="h-3 bg-gray-200 dark:bg-gray-700 rounded"
              style={{
                width: `${Math.random() * 30 + 50}%`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Componente para tabla de carga
export const SkeletonTable = ({
  rows = 5,
  columns = 4,
  className = '',
  ...props
}) => {
  return (
    <div className={clsx('animate-pulse', className)} {...props}>
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {[...Array(columns)].map((_, index) => (
            <div key={index} className="h-4 bg-gray-300 dark:bg-gray-600 rounded" />
          ))}
        </div>
      </div>

      {/* Rows */}
      <div className="space-y-3">
        {[...Array(rows)].map((_, rowIndex) => (
          <div key={rowIndex} className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {[...Array(columns)].map((_, colIndex) => (
              <div key={colIndex} className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;