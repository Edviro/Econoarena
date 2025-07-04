import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Components
import Layout from './components/layout/Layout'; // Sin la carpeta layout/
import LoadingSpinner from './components/common/LoadingSpinner';

// Pages reales separadas - FRONTEND COMPLETO
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Movements from './pages/Movements';
import Reports from './pages/Reports';
import Analytics from './pages/Analytics';
import Security from './pages/Security';
import Settings from './pages/Settings';

// Hooks
import { useAuth } from './context/AuthContext';

// Styles
import './styles/globals.css';

// Configuración de React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutos
    },
  },
});

// Componente para rutas protegidas
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner fullScreen text="Verificando autenticación..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Componente para rutas públicas (cuando ya está autenticado)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner fullScreen text="Cargando..." />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

// Rutas de la aplicación
const AppRoutes = () => {
  return (
    <Routes>
      {/* Ruta pública - Login */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      {/* Rutas protegidas */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* Redirigir la raíz al dashboard */}
        <Route index element={<Navigate to="/dashboard" replace />} />
        
        {/* Páginas principales */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="movements" element={<Movements />} />
        <Route path="reports" element={<Reports />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="security" element={<Security />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Ruta 404 */}
      <Route
        path="*"
        element={
          <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                404
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Página no encontrada
              </p>
              <button
                onClick={() => window.history.back()}
                className="btn-gradient text-white px-6 py-3 rounded-lg"
              >
                Volver
              </button>
            </div>
          </div>
        }
      />
    </Routes>
  );
};

// Componente principal de la aplicación
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <div className="App min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
              <AppRoutes />
              
              {/* Notificaciones toast */}
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: 'var(--toast-bg, #fff)',
                    color: 'var(--toast-color, #333)',
                  },
                  success: {
                    iconTheme: {
                      primary: '#10B981',
                      secondary: '#fff',
                    },
                  },
                  error: {
                    iconTheme: {
                      primary: '#EF4444',
                      secondary: '#fff',
                    },
                  },
                }}
              />
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;