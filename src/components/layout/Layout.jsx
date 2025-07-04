import React from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Sesión cerrada correctamente');
      navigate('/login');
    } catch (error) {
      toast.error('Error al cerrar sesión');
    }
  };

  const navItems = [
    { path: '/dashboard', name: 'Dashboard', icon: '📊' },
    { path: '/inventory', name: 'Inventario', icon: '📦' },
    { path: '/movements', name: 'Movimientos', icon: '🔄' },
    { path: '/reports', name: 'Reportes', icon: '📈' },
    { path: '/analytics', name: 'Análisis', icon: '⚡' },
    { path: '/security', name: 'Seguridad', icon: '🔒' },
    { path: '/settings', name: 'Configuración', icon: '⚙️' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-gray-800 shadow-lg min-h-screen">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                EconoArena
              </h2>
            </div>
          </div>
          
          <nav className="mt-6">
            <div className="px-3 space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                      isActive
                        ? 'text-blue-600 bg-blue-50 dark:bg-blue-900 dark:text-blue-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {item.icon} {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
        
        {/* Contenido principal */}
        <div className="flex-1">
          {/* Header */}
          <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Sistema de Inventario
              </h1>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Bienvenido, {user?.firstName || user?.username || 'Usuario'}
                </span>
                <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full">
                  {user?.role || 'user'}
                </span>
                <button 
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </header>
          
          {/* Contenido de las páginas */}
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;