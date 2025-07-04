import React from 'react';

const Dashboard = () => {
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

export default Dashboard;