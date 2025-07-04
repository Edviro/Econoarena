import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { Eye, EyeOff } from 'lucide-react';

const Input = forwardRef(({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  error,
  helperText,
  disabled = false,
  required = false,
  fullWidth = false,
  size = 'md',
  leftIcon = null,
  rightIcon = null,
  className = '',
  containerClassName = '',
  labelClassName = '',
  id,
  name,
  autoComplete,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  const baseInputClasses = 'block w-full rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-4 py-3 text-base'
  };

  const stateClasses = error
    ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-500 dark:text-red-100 dark:placeholder-red-400'
    : isFocused
    ? 'border-blue-500 focus:ring-blue-500 focus:border-blue-500'
    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white';

  const iconPadding = leftIcon ? 'pl-10' : rightIcon ? 'pr-10' : '';

  const inputClasses = clsx(
    baseInputClasses,
    sizeClasses[size],
    stateClasses,
    iconPadding,
    fullWidth ? 'w-full' : '',
    className
  );

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className={clsx('relative', fullWidth ? 'w-full' : '', containerClassName)}>
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className={clsx(
            'block text-sm font-medium mb-1',
            error ? 'text-red-700 dark:text-red-400' : 'text-gray-700 dark:text-gray-300',
            labelClassName
          )}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className={clsx(
              'text-gray-400',
              error && 'text-red-400'
            )}>
              {leftIcon}
            </span>
          </div>
        )}

        {/* Input */}
        <input
          ref={ref}
          id={inputId}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          className={inputClasses}
          {...props}
        />

        {/* Right Icon / Password Toggle */}
        {(rightIcon || type === 'password') && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {type === 'password' ? (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            ) : rightIcon ? (
              <span className={clsx(
                'text-gray-400',
                error && 'text-red-400'
              )}>
                {rightIcon}
              </span>
            ) : null}
          </div>
        )}
      </div>

      {/* Helper Text / Error */}
      {(helperText || error) && (
        <p className={clsx(
          'mt-1 text-xs',
          error ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

// Componente Select
export const Select = forwardRef(({
  label,
  options = [],
  value,
  onChange,
  error,
  helperText,
  disabled = false,
  required = false,
  fullWidth = false,
  placeholder = 'Seleccionar...',
  className = '',
  containerClassName = '',
  labelClassName = '',
  id,
  name,
  ...props
}, ref) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  const selectClasses = clsx(
    'block w-full rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 text-sm',
    error
      ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500 dark:border-red-500 dark:text-red-100'
      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white',
    fullWidth ? 'w-full' : '',
    className
  );

  return (
    <div className={clsx('relative', fullWidth ? 'w-full' : '', containerClassName)}>
      {/* Label */}
      {label && (
        <label
          htmlFor={selectId}
          className={clsx(
            'block text-sm font-medium mb-1',
            error ? 'text-red-700 dark:text-red-400' : 'text-gray-700 dark:text-gray-300',
            labelClassName
          )}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Select */}
      <select
        ref={ref}
        id={selectId}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={selectClasses}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option, index) => (
          <option
            key={option.value || index}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>

      {/* Helper Text / Error */}
      {(helperText || error) && (
        <p className={clsx(
          'mt-1 text-xs',
          error ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

// Componente Textarea
export const Textarea = forwardRef(({
  label,
  placeholder,
  value,
  onChange,
  error,
  helperText,
  disabled = false,
  required = false,
  fullWidth = false,
  rows = 3,
  className = '',
  containerClassName = '',
  labelClassName = '',
  id,
  name,
  ...props
}, ref) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

  const textareaClasses = clsx(
    'block w-full rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 text-sm resize-vertical',
    error
      ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-500 dark:text-red-100 dark:placeholder-red-400'
      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white',
    fullWidth ? 'w-full' : '',
    className
  );

  return (
    <div className={clsx('relative', fullWidth ? 'w-full' : '', containerClassName)}>
      {/* Label */}
      {label && (
        <label
          htmlFor={textareaId}
          className={clsx(
            'block text-sm font-medium mb-1',
            error ? 'text-red-700 dark:text-red-400' : 'text-gray-700 dark:text-gray-300',
            labelClassName
          )}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Textarea */}
      <textarea
        ref={ref}
        id={textareaId}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
        className={textareaClasses}
        {...props}
      />

      {/* Helper Text / Error */}
      {(helperText || error) && (
        <p className={clsx(
          'mt-1 text-xs',
          error ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Input;