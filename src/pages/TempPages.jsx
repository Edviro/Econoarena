import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { LogIn, Eye, EyeOff, Building2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Página Login funcional
export const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();

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

// Dashboard funcional básico
export const Dashboard = () => {
  // Datos mock directos (sin require que causa error)
  const totalProducts = 12;
  const totalStock = 1245;
  const lowStockCount = 3;
  const totalInventoryValue = 25680.50;

  const mockMovements = [
    { id: 1, date: '2024-07-03', product: 'Arena Perlada 10 kg', type: 'Salida', quantity: 5, user: 'Eduardo' },
    { id: 2, date: '2024-07-03', product: 'Arena Fina 5 kg', type: 'Entrada', quantity: 50, user: 'María' },
    { id: 3, date: '2024-07-02', product: 'Arena Granulada 25 kg', type: 'Salida', quantity: 2, user: 'Juan' },
    { id: 4, date: '2024-07-01', product: 'Arena Perlada 50 kg', type: 'Salida', quantity: 1, user: 'Pedro' },
    { id: 5, date: '2024-06-30', product: 'Arena Fina 10 kg', type: 'Entrada', quantity: 30, user: 'Ana' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Acciones rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <button className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
            <span className="text-white text-2xl">+</span>
          </div>
          <p className="font-semibold text-gray-800 dark:text-white">Entrada Rápida</p>
        </button>
        
        <button className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
          <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
            <span className="text-white text-2xl">-</span>
          </div>
          <p className="font-semibold text-gray-800 dark:text-white">Salida Rápida</p>
        </button>
        
        <button className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-3">
            <span className="text-white text-2xl">📊</span>
          </div>
          <p className="font-semibold text-gray-800 dark:text-white">Generar Reporte</p>
        </button>
        
        <button className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3">
            <span className="text-white text-2xl">📦</span>
          </div>
          <p className="font-semibold text-gray-800 dark:text-white">Añadir Producto</p>
        </button>
      </div>

      {/* KPIs con datos reales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
          <h3 className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">Total Productos</h3>
          <p className="text-4xl font-bold text-blue-600">{totalProducts}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
          <h3 className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">Stock Total</h3>
          <p className="text-4xl font-bold text-green-600">{totalStock.toLocaleString()}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
          <h3 className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">Productos Bajo Stock</h3>
          <p className="text-4xl font-bold text-red-600">{lowStockCount}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
          <h3 className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">Valor de Inventario</h3>
          <p className="text-4xl font-bold text-purple-600">S/ {totalInventoryValue.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</p>
        </div>
      </div>

      {/* Gráficos placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Stock por Categoría</h3>
          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-500">
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <p className="text-gray-600 dark:text-gray-400">Gráfico de dona</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">Próximamente</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Movimientos Recientes</h3>
          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-500">
            <div className="text-center">
              <div className="text-4xl mb-2">📈</div>
              <p className="text-gray-600 dark:text-gray-400">Gráfico de barras</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">Próximamente</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de movimientos */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Movimientos Recientes</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Fecha</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Producto</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Tipo</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Cantidad</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Usuario</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              {mockMovements.map((movement) => (
                <tr key={movement.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">{movement.date}</td>
                  <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">{movement.product}</td>
                  <td className="py-3 px-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      movement.type === 'Entrada' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {movement.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">{movement.quantity}</td>
                  <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">{movement.user}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Inventory completo con todas las funcionalidades
export const Inventory = () => {
  const [products, setProducts] = React.useState([
    { id: 1, name: 'Arena Perlada 5 kg', stock: 120, minStock: 30, category: 'Arena para Gatos', location: 'Almacén Principal', value: 8.50, sku: 'AP-5KG-001' },
    { id: 2, name: 'Arena Perlada 10 kg', stock: 80, minStock: 20, category: 'Arena para Gatos', location: 'Almacén Principal', value: 15.00, sku: 'AP-10KG-002' },
    { id: 3, name: 'Arena Perlada 25 kg', stock: 40, minStock: 10, category: 'Arena para Gatos', location: 'Almacén Principal', value: 35.00, sku: 'AP-25KG-003' },
    { id: 4, name: 'Arena Perlada 50 kg', stock: 15, minStock: 5, category: 'Arena para Gatos', location: 'Almacén Principal', value: 65.00, sku: 'AP-50KG-004' },
    { id: 5, name: 'Arena Fina 5 kg', stock: 150, minStock: 40, category: 'Arena para Gatos', location: 'Almacén Principal', value: 7.00, sku: 'AF-5KG-005' },
    { id: 6, name: 'Arena Fina 10 kg', stock: 90, minStock: 25, category: 'Arena para Gatos', location: 'Almacén Principal', value: 12.50, sku: 'AF-10KG-006' },
    { id: 7, name: 'Arena Granulada 5 kg', stock: 8, minStock: 25, category: 'Arena para Gatos', location: 'Almacén Secundario', value: 7.50, sku: 'AG-5KG-007' },
    { id: 8, name: 'Arena Granulada 10 kg', stock: 3, minStock: 18, category: 'Arena para Gatos', location: 'Almacén Secundario', value: 13.50, sku: 'AG-10KG-008' }
  ]);
  
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterCategory, setFilterCategory] = React.useState('');
  const [showModal, setShowModal] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;

  // Filtrar productos
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === '' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Paginación
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Productos con stock bajo
  const lowStockProducts = products.filter(p => p.stock <= p.minStock);

  // Formulario para nuevo/editar producto
  const [formData, setFormData] = React.useState({
    name: '',
    stock: '',
    minStock: '',
    category: 'Arena para Gatos',
    location: 'Almacén Principal',
    value: '',
    sku: ''
  });

  const resetForm = () => {
    setFormData({
      name: '',
      stock: '',
      minStock: '',
      category: 'Arena para Gatos',
      location: 'Almacén Principal',
      value: '',
      sku: ''
    });
    setEditingProduct(null);
  };

  const handleAddProduct = () => {
    setShowModal(true);
    resetForm();
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      stock: product.stock.toString(),
      minStock: product.minStock.toString(),
      category: product.category,
      location: product.location,
      value: product.value.toString(),
      sku: product.sku
    });
    setShowModal(true);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.stock || !formData.minStock || !formData.value || !formData.sku) {
      alert('Por favor complete todos los campos');
      return;
    }

    const productData = {
      ...formData,
      stock: parseInt(formData.stock),
      minStock: parseInt(formData.minStock),
      value: parseFloat(formData.value)
    };

    if (editingProduct) {
      // Editar producto existente
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { ...productData, id: editingProduct.id }
          : p
      ));
    } else {
      // Añadir nuevo producto
      const newProduct = {
        ...productData,
        id: Math.max(...products.map(p => p.id)) + 1
      };
      setProducts([...products, newProduct]);
    }

    setShowModal(false);
    resetForm();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header con acciones */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Control de Inventario
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gestiona tus productos y controla el stock
          </p>
        </div>
        <button
          onClick={handleAddProduct}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors duration-200"
        >
          <span className="text-xl">+</span>
          <span>Añadir Producto</span>
        </button>
      </div>

      {/* Alertas de stock bajo */}
      {lowStockProducts.length > 0 && (
        <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4">
          <div className="flex items-center">
            <span className="text-red-600 dark:text-red-400 text-xl mr-3">⚠️</span>
            <div>
              <h3 className="text-red-800 dark:text-red-200 font-medium">
                Productos con Stock Bajo ({lowStockProducts.length})
              </h3>
              <p className="text-red-600 dark:text-red-400 text-sm">
                {lowStockProducts.map(p => p.name).join(', ')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Filtros y búsqueda */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Buscar productos
            </label>
            <input
              type="text"
              placeholder="Nombre o SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Filtrar por categoría
            </label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Todas las categorías</option>
              <option value="Arena para Gatos">Arena para Gatos</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterCategory('');
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Limpiar Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Tabla de productos */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Ubicación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {currentProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {product.category}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {product.sku}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`text-sm font-medium ${
                        product.stock <= product.minStock 
                          ? 'text-red-600 dark:text-red-400' 
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {product.stock}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                        / {product.minStock} mín
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {product.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    S/ {product.value.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center w-full">
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredProducts.length)} de {filteredProducts.length} productos
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Anterior
                </button>
                <span className="px-3 py-1 text-sm text-gray-700 dark:text-gray-300">
                  Página {currentPage} de {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal para añadir/editar producto */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {editingProduct ? 'Editar Producto' : 'Añadir Nuevo Producto'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nombre del Producto *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  SKU *
                </label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Stock Actual *
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Stock Mínimo *
                  </label>
                  <input
                    type="number"
                    name="minStock"
                    value={formData.minStock}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Categoría
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="Arena para Gatos">Arena para Gatos</option>
                  <option value="Accesorios">Accesorios</option>
                  <option value="Otros">Otros</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Ubicación
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="Almacén Principal">Almacén Principal</option>
                  <option value="Almacén Secundario">Almacén Secundario</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Valor Unitario (S/) *
                </label>
                <input
                  type="number"
                  name="value"
                  value={formData.value}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                >
                  {editingProduct ? 'Actualizar' : 'Añadir'} Producto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Movements temporal
export const Movements = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Gestión de Movimientos
      </h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <p className="text-gray-600 dark:text-gray-400">
          Entradas y salidas - En construcción
        </p>
      </div>
    </div>
  );
};

// Reports temporal
export const Reports = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Reportes
      </h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <p className="text-gray-600 dark:text-gray-400">
          Reportes y análisis - En construcción
        </p>
      </div>
    </div>
  );
};

// Analytics temporal
export const Analytics = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Análisis Avanzado
      </h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <p className="text-gray-600 dark:text-gray-400">
          Análisis y tendencias - En construcción
        </p>
      </div>
    </div>
  );
};

// Security temporal
export const Security = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Seguridad
      </h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <p className="text-gray-600 dark:text-gray-400">
          Gestión de usuarios y permisos - En construcción
        </p>
      </div>
    </div>
  );
};

// Settings temporal
export const Settings = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Configuración
      </h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <p className="text-gray-600 dark:text-gray-400">
          Configuración del sistema - En construcción
        </p>
      </div>
    </div>
  );
};

// Layout temporal
export const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex">
        {/* Sidebar temporal */}
        <div className="w-64 bg-white dark:bg-gray-800 shadow-lg min-h-screen">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              EconoArena
            </h2>
          </div>
          <nav className="mt-6">
            <div className="px-3 space-y-1">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Navegación - En construcción
              </p>
            </div>
          </nav>
        </div>
        
        {/* Contenido principal */}
        <div className="flex-1">
          <header className="bg-white dark:bg-gray-800 shadow-sm">
            <div className="px-6 py-4">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Layout Principal
              </h1>
            </div>
          </header>
          <main>
            <p className="p-6 text-gray-600 dark:text-gray-400">
              Contenido principal - En construcción
            </p>
          </main>
        </div>
      </div>
    </div>
  );
};