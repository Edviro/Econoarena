import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('');
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 días atrás
    endDate: new Date().toISOString().split('T')[0] // Hoy
  });
  const [reportData, setReportData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Datos mock para reportes
  const mockInventoryData = {
    totalProducts: 12,
    totalStock: 1245,
    lowStockProducts: 3,
    totalValue: 25680.50,
    byCategory: [
      { category: 'Arena para Gatos', products: 12, stock: 1245, value: 25680.50 }
    ],
    topProducts: [
      { name: 'Arena Fina 5 kg', stock: 150, value: 1050.00 },
      { name: 'Arena Perlada 5 kg', stock: 120, value: 1020.00 },
      { name: 'Arena Fina 10 kg', stock: 90, value: 1125.00 },
      { name: 'Arena Perlada 10 kg', stock: 80, value: 1200.00 }
    ],
    lowStockItems: [
      { name: 'Arena Granulada 10 kg', stock: 3, minStock: 18 },
      { name: 'Arena Granulada 5 kg', stock: 8, minStock: 25 },
      { name: 'Arena Perlada 50 kg', stock: 15, minStock: 5 }
    ]
  };

  const mockMovementsData = {
    totalMovements: 127,
    entries: 68,
    exits: 59,
    entriesValue: 12500.00,
    exitsValue: 8900.00,
    byType: [
      { type: 'Compra', count: 45, value: 9800.00 },
      { type: 'Venta', count: 52, value: 7800.00 },
      { type: 'Ajuste', count: 18, value: 1200.00 },
      { type: 'Devolución', count: 12, value: 800.00 }
    ],
    topMovedProducts: [
      { name: 'Arena Fina 5 kg', movements: 23, quantity: 145 },
      { name: 'Arena Perlada 10 kg', movements: 18, quantity: 92 },
      { name: 'Arena Granulada 5 kg', movements: 15, quantity: 78 }
    ]
  };

  const mockSalesData = {
    totalSales: 52,
    totalRevenue: 7800.00,
    averageTicket: 150.00,
    topSellingProducts: [
      { name: 'Arena Fina 5 kg', quantity: 85, revenue: 595.00 },
      { name: 'Arena Perlada 10 kg', quantity: 45, revenue: 675.00 },
      { name: 'Arena Fina 10 kg', quantity: 38, revenue: 475.00 }
    ],
    salesByDay: [
      { date: '2024-07-01', sales: 8, revenue: 1200.00 },
      { date: '2024-07-02', sales: 12, revenue: 1800.00 },
      { date: '2024-07-03', sales: 6, revenue: 900.00 }
    ]
  };

  const reportTypes = [
    {
      id: 'inventory',
      name: 'Reporte de Inventario',
      description: 'Estado actual del inventario, productos por categoría y alertas de stock',
      icon: '📦'
    },
    {
      id: 'movements',
      name: 'Reporte de Movimientos',
      description: 'Entradas y salidas de productos en el período seleccionado',
      icon: '🔄'
    },
    {
      id: 'sales',
      name: 'Reporte de Ventas',
      description: 'Análisis de ventas, productos más vendidos y revenue',
      icon: '💰'
    },
    {
      id: 'alerts',
      name: 'Reporte de Alertas',
      description: 'Productos con stock bajo y alertas de reabastecimiento',
      icon: '⚠️'
    },
    {
      id: 'valuation',
      name: 'Valorización de Inventario',
      description: 'Valor total del inventario y análisis financiero',
      icon: '💎'
    }
  ];

  const generateReport = () => {
    if (!selectedReport) {
      toast.error('Seleccione un tipo de reporte');
      return;
    }

    setIsGenerating(true);

    // Simular generación de reporte
    setTimeout(() => {
      let data;
      switch (selectedReport) {
        case 'inventory':
          data = mockInventoryData;
          break;
        case 'movements':
          data = mockMovementsData;
          break;
        case 'sales':
          data = mockSalesData;
          break;
        case 'alerts':
          data = { alerts: mockInventoryData.lowStockItems };
          break;
        case 'valuation':
          data = { totalValue: mockInventoryData.totalValue, products: mockInventoryData.topProducts };
          break;
        default:
          data = {};
      }
      
      setReportData(data);
      setIsGenerating(false);
      toast.success('Reporte generado exitosamente');
    }, 1500);
  };

  const exportReport = (format) => {
    toast.success(`Exportando reporte en formato ${format.toUpperCase()}...`);
    // Aquí iría la lógica real de exportación
  };

  const renderReportContent = () => {
    if (!reportData) return null;

    switch (selectedReport) {
      case 'inventory':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
                <h4 className="text-blue-800 dark:text-blue-200 font-medium">Total Productos</h4>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{reportData.totalProducts}</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
                <h4 className="text-green-800 dark:text-green-200 font-medium">Stock Total</h4>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">{reportData.totalStock}</p>
              </div>
              <div className="bg-red-50 dark:bg-red-900 p-4 rounded-lg">
                <h4 className="text-red-800 dark:text-red-200 font-medium">Stock Bajo</h4>
                <p className="text-2xl font-bold text-red-900 dark:text-red-100">{reportData.lowStockProducts}</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg">
                <h4 className="text-purple-800 dark:text-purple-200 font-medium">Valor Total</h4>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                  S/ {reportData.totalValue.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Productos con Más Stock</h4>
                <div className="space-y-3">
                  {reportData.topProducts.map((product, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-700 dark:text-gray-300">{product.name}</span>
                      <span className="font-medium text-gray-900 dark:text-white">{product.stock} unidades</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Productos con Stock Bajo</h4>
                <div className="space-y-3">
                  {reportData.lowStockItems.map((product, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-700 dark:text-gray-300">{product.name}</span>
                      <span className="text-red-600 dark:text-red-400 font-medium">
                        {product.stock} / {product.minStock} mín
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'movements':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
                <h4 className="text-blue-800 dark:text-blue-200 font-medium">Total Movimientos</h4>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{reportData.totalMovements}</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
                <h4 className="text-green-800 dark:text-green-200 font-medium">Entradas</h4>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">{reportData.entries}</p>
              </div>
              <div className="bg-red-50 dark:bg-red-900 p-4 rounded-lg">
                <h4 className="text-red-800 dark:text-red-200 font-medium">Salidas</h4>
                <p className="text-2xl font-bold text-red-900 dark:text-red-100">{reportData.exits}</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg">
                <h4 className="text-purple-800 dark:text-purple-200 font-medium">Diferencia</h4>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                  +{reportData.entries - reportData.exits}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Movimientos por Tipo</h4>
                <div className="space-y-3">
                  {reportData.byType.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-700 dark:text-gray-300">{item.type}</span>
                      <div className="text-right">
                        <div className="font-medium text-gray-900 dark:text-white">{item.count} movimientos</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          S/ {item.value.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Productos Más Movidos</h4>
                <div className="space-y-3">
                  {reportData.topMovedProducts.map((product, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-700 dark:text-gray-300">{product.name}</span>
                      <div className="text-right">
                        <div className="font-medium text-gray-900 dark:text-white">{product.movements} movimientos</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{product.quantity} unidades</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'sales':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
                <h4 className="text-green-800 dark:text-green-200 font-medium">Total Ventas</h4>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">{reportData.totalSales}</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
                <h4 className="text-blue-800 dark:text-blue-200 font-medium">Revenue Total</h4>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  S/ {reportData.totalRevenue.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg">
                <h4 className="text-purple-800 dark:text-purple-200 font-medium">Ticket Promedio</h4>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                  S/ {reportData.averageTicket.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Productos Más Vendidos</h4>
              <div className="space-y-3">
                {reportData.topSellingProducts.map((product, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">{product.name}</span>
                    <div className="text-right">
                      <div className="font-medium text-gray-900 dark:text-white">{product.quantity} unidades</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        S/ {product.revenue.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">Contenido del reporte no disponible</p>
          </div>
        );
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Reportes
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Genera reportes detallados de tu inventario y movimientos
        </p>
      </div>

      {/* Configuración del reporte */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Configurar Reporte</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tipo de reporte */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Tipo de Reporte
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {reportTypes.map((report) => (
                <div
                  key={report.id}
                  onClick={() => setSelectedReport(report.id)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
                    selectedReport === report.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{report.icon}</span>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{report.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{report.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rango de fechas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Rango de Fechas
            </label>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Desde</label>
                <input
                  type="date"
                  value={dateRange.startDate}
                  onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Hasta</label>
                <input
                  type="date"
                  value={dateRange.endDate}
                  onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <button
                onClick={generateReport}
                disabled={isGenerating || !selectedReport}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generando...
                  </>
                ) : (
                  'Generar Reporte'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido del reporte */}
      {reportData && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {reportTypes.find(r => r.id === selectedReport)?.name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Período: {new Date(dateRange.startDate).toLocaleDateString('es-PE')} - {new Date(dateRange.endDate).toLocaleDateString('es-PE')}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => exportReport('pdf')}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200"
              >
                📄 PDF
              </button>
              <button
                onClick={() => exportReport('excel')}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200"
              >
                📊 Excel
              </button>
            </div>
          </div>

          {renderReportContent()}
        </div>
      )}
    </div>
  );
};

export default Reports;