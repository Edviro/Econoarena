import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { LogIn, Eye, EyeOff, Building2 } from 'lucide-react';

import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login, isAuthenticated } = useAuth();

  // Si ya está autenticado, redirigir al dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      toast.error('Por favor complete todos los campos');
      return;
    }

    setIsLoading(true);

    // Simular delay de red
    setTimeout(async () => {
      try {
        const result = await login(formData);
        
        if (result.success) {
          toast.success('¡Bienvenido a EconoArena!');
        } else {
          toast.error(result.error || 'Error al iniciar sesión');
        }
      } catch (error) {
        toast.error('Error de conexión');
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  // Función para demo - llenar credenciales de prueba
  const fillDemoCredentials = (role = 'admin') => {
    const credentials = {
      admin: { username: 'admin', password: 'admin123' },
      operator: { username: 'operador', password: 'operador123' },
      viewer: { username: 'viewer', password: 'viewer123' }
    };

    setFormData(credentials[role]);
    toast.info(`Credenciales de ${role} llenadas`);
  };

  return (
    <div className="min-h-screen flex">
      {/* Panel izquierdo - Información */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20" />
        
        {/* Elementos decorativos */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full" />
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-white bg-opacity-5 rounded-full" />
        <div className="absolute top-1/3 right-10 w-16 h-16 bg-white bg-opacity-10 rounded-full" />
        
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mr-4">
                <Building2 size={24} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold">EconoArena</h1>
            </div>
            <h2 className="text-4xl font-bold mb-4">
              Sistema de Gestión de Inventario
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Controla, gestiona y optimiza tu inventario de manera inteligente y eficiente.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-3" />
              <span>Gestión de productos en tiempo real</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-3" />
              <span>Reportes y análisis avanzados</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-3" />
              <span>Control de usuarios y permisos</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-3" />
              <span>Alertas de stock automáticas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Panel derecho - Formulario */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <div className="flex items-center lg:hidden mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <Building2 size={20} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">EconoArena</h2>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Iniciar Sesión
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Accede a tu cuenta para gestionar tu inventario
            </p>
          </div>

          <div className="mt-8">
            {/* Botones de demo */}
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200 mb-3 font-medium">
                🚀 Demo - Credenciales de prueba:
              </p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => fillDemoCredentials('admin')}
                  className="px-3 py-1 bg-blue-100 hover:bg-blue-200 dark:bg-blue-800 dark:hover:bg-blue-700 text-blue-800 dark:text-blue-200 rounded text-xs font-medium"
                >
                  Admin
                </button>
                <button
                  onClick={() => fillDemoCredentials('operator')}
                  className="px-3 py-1 bg-green-100 hover:bg-green-200 dark:bg-green-800 dark:hover:bg-green-700 text-green-800 dark:text-green-200 rounded text-xs font-medium"
                >
                  Operador
                </button>
                <button
                  onClick={() => fillDemoCredentials('viewer')}
                  className="px-3 py-1 bg-purple-100 hover:bg-purple-200 dark:bg-purple-800 dark:hover:bg-purple-700 text-purple-800 dark:text-purple-200 rounded text-xs font-medium"
                >
                  Viewer
                </button>
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Usuario
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    placeholder="Ingrese su usuario"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Contraseña
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    placeholder="Ingrese su contraseña"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Iniciando sesión...
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5 mr-2" />
                      Iniciar Sesión
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;