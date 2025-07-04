import React, { useState, useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('stock');

  // Datos mock para gráficos
  const stockTrendData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Stock Total',
        data: [1200, 1150, 1300, 1250, 1400, 1350, 1245],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const movementsTrendData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Entradas',
        data: [65, 78, 90, 81, 95, 88, 92],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1
      },
      {
        label: 'Salidas',
        data: [45, 52, 48, 61, 55, 67, 58],
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1
      }
    ]
  };

  const categoryDistributionData = {
    labels: ['Arena Perlada', 'Arena Fina', 'Arena Granulada', 'Accesorios'],
    datasets: [
      {
        data: [45, 35, 15, 5],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)'
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(139, 92, 246, 1)'
        ],
        borderWidth: 2
      }
    ]
  };

  const topProductsData = {
    labels: ['Arena Fina 5kg', 'Arena Perlada 5kg', 'Arena Fina 10kg', 'Arena Perlada 10kg', 'Arena Granulada 5kg'],
    datasets: [
      {
        label: 'Stock',
        data: [150, 120, 90, 80, 8],
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1
      }
    ]
  };

  const valueEvolutionData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Valor del Inventario (S/)',
        data: [22500, 23800, 25200, 24800, 26500, 25900, 25680],
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const alertsData = {
    labels: ['Stock Normal', 'Stock Bajo', 'Stock Crítico'],
    datasets: [
      {
        data: [9, 2, 1],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)'
        ],
        borderWidth: 2
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white'
      }
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Análisis Avanzado
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Visualiza tendencias y patrones de tu inventario
          </p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="7d">Últimos 7 días</option>
            <option value="30d">Últimos 30 días</option>
            <option value="3m">Últimos 3 meses</option>
            <option value="6m">Últimos 6 meses</option>
            <option value="1y">Último año</option>
          </select>
        </div>
      </div>

      {/* KPIs de análisis */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white">
          <h3 className="text-blue-100 text-sm font-medium">Rotación Promedio</h3>
          <p className="text-3xl font-bold">12.5 días</p>
          <p className="text-blue-100 text-sm mt-1">+2.3 días vs mes anterior</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg text-white">
          <h3 className="text-green-100 text-sm font-medium">Eficiencia de Stock</h3>
          <p className="text-3xl font-bold">87%</p>
          <p className="text-green-100 text-sm mt-1">+5% vs mes anterior</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg text-white">
          <h3 className="text-purple-100 text-sm font-medium">Valor Promedio/Producto</h3>
          <p className="text-3xl font-bold">S/ 2,140</p>
          <p className="text-purple-100 text-sm mt-1">+12% vs mes anterior</p>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-lg text-white">
          <h3 className="text-orange-100 text-sm font-medium">Precisión de Pronóstico</h3>
          <p className="text-3xl font-bold">94%</p>
          <p className="text-orange-100 text-sm mt-1">-1% vs mes anterior</p>
        </div>
      </div>

      {/* Gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tendencia de Stock */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Tendencia de Stock</h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">Últimos 7 meses</span>
          </div>
          <div className="h-64">
            <Line data={stockTrendData} options={chartOptions} />
          </div>
        </div>

        {/* Movimientos por Mes */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Entradas vs Salidas</h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">Por mes</span>
          </div>
          <div className="h-64">
            <Bar data={movementsTrendData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Segunda fila de gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Distribución por Categoría */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Distribución por Categoría</h3>
          <div className="h-64">
            <Doughnut data={categoryDistributionData} options={doughnutOptions} />
          </div>
        </div>

        {/* Productos con Más Stock */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Top 5 Productos por Stock</h3>
          <div className="h-64">
            <Bar 
              data={topProductsData} 
              options={{
                ...chartOptions,
                indexAxis: 'y',
                scales: {
                  x: {
                    beginAtZero: true,
                    grid: {
                      color: 'rgba(0, 0, 0, 0.1)'
                    }
                  },
                  y: {
                    grid: {
                      display: false
                    }
                  }
                }
              }} 
            />
          </div>
        </div>

        {/* Estado de Alertas */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Estado de Stock</h3>
          <div className="h-64">
            <Pie data={alertsData} options={doughnutOptions} />
          </div>
        </div>
      </div>

      {/* Evolución del Valor */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Evolución del Valor del Inventario</h3>
          <div className="flex space-x-2">
            <button 
              onClick={() => setSelectedMetric('stock')}
              className={`px-3 py-1 rounded text-sm ${selectedMetric === 'stock' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}
            >
              Stock
            </button>
            <button 
              onClick={() => setSelectedMetric('value')}
              className={`px-3 py-1 rounded text-sm ${selectedMetric === 'value' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}
            >
              Valor
            </button>
          </div>
        </div>
        <div className="h-80">
          <Line 
            data={selectedMetric === 'value' ? valueEvolutionData : stockTrendData} 
            options={{
              ...chartOptions,
              scales: {
                ...chartOptions.scales,
                y: {
                  ...chartOptions.scales.y,
                  ticks: {
                    callback: function(value) {
                      return selectedMetric === 'value' ? `S/ ${value.toLocaleString()}` : value;
                    }
                  }
                }
              }
            }} 
          />
        </div>
      </div>

      {/* Insights automáticos */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Insights Automáticos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <span className="text-blue-500 text-xl mr-2">📈</span>
              <h4 className="font-medium text-blue-900 dark:text-blue-100">Tendencia Positiva</h4>
            </div>
            <p className="text-blue-700 dark:text-blue-200 text-sm">
              El stock total ha aumentado 8% en el último mes, indicando un buen control de inventario.
            </p>
          </div>
          
          <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <span className="text-yellow-500 text-xl mr-2">⚠️</span>
              <h4 className="font-medium text-yellow-900 dark:text-yellow-100">Atención Requerida</h4>
            </div>
            <p className="text-yellow-700 dark:text-yellow-200 text-sm">
              3 productos están por debajo del stock mínimo. Considera reabastecer pronto.
            </p>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <span className="text-green-500 text-xl mr-2">✅</span>
              <h4 className="font-medium text-green-900 dark:text-green-100">Oportunidad</h4>
            </div>
            <p className="text-green-700 dark:text-green-200 text-sm">
              Arena Fina 5kg tiene alta rotación. Considera aumentar el stock mínimo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;