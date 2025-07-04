import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const Movements = () => {
  const [movements, setMovements] = useState([
    { id: 1, date: '2024-07-03T08:00:00Z', product: 'Arena Perlada 10 kg', productId: 2, type: 'Salida', quantity: 5, user: 'Eduardo', reason: 'Venta', notes: 'Cliente mayorista', reference: 'VEN-2024-001' },
    { id: 2, date: '2024-07-03T10:30:00Z', product: 'Arena Fina 5 kg', productId: 5, type: 'Entrada', quantity: 50, user: 'María', reason: 'Compra', notes: 'Reposición de stock', reference: 'COM-2024-015' },
    { id: 3, date: '2024-07-02T14:15:00Z', product: 'Arena Granulada 25 kg', productId: 11, type: 'Salida', quantity: 2, user: 'Juan', reason: 'Venta', notes: 'Pedido especial', reference: 'VEN-2024-002' },
    { id: 4, date: '2024-07-01T16:45:00Z', product: 'Arena Perlada 50 kg', productId: 4, type: 'Salida', quantity: 1, user: 'Pedro', reason: 'Venta', notes: 'Cliente corporativo', reference: 'VEN-2024-003' },
    { id: 5, date: '2024-06-30T09:20:00Z', product: 'Arena Fina 10 kg', productId: 6, type: 'Entrada', quantity: 30, user: 'Ana', reason: 'Compra', notes: 'Abastecimiento mensual', reference: 'COM-2024-014' }
  ]);

  const [products] = useState([
    { id: 1, name: 'Arena Perlada 5 kg', stock: 120 },
    { id: 2, name: 'Arena Perlada 10 kg', stock: 80 },
    { id: 3, name: 'Arena Perlada 25 kg', stock: 40 },
    { id: 4, name: 'Arena Perlada 50 kg', stock: 15 },
    { id: 5, name: 'Arena Fina 5 kg', stock: 150 },
    { id: 6, name: 'Arena Fina 10 kg', stock: 90 },
    { id: 7, name: 'Arena Granulada 5 kg', stock: 8 },
    { id: 8, name: 'Arena Granulada 10 kg', stock: 3 }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [formData, setFormData] = useState({
    productId: '',
    type: 'Entrada',
    quantity: '',
    reason: '',
    notes: '',
    reference: ''
  });

  // Filtrar movimientos
  const filteredMovements = movements.filter(movement => {
    const matchesSearch = movement.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movement.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movement.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === '' || movement.type === filterType;
    return matchesSearch && matchesType;
  });

  // Paginación
  const totalPages = Math.ceil(filteredMovements.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMovements = filteredMovements.slice(startIndex, startIndex + itemsPerPage);

  const resetForm = () => {
    setFormData({
      productId: '',
      type: 'Entrada',
      quantity: '',
      reason: '',
      notes: '',
      reference: ''
    });
  };

  const handleAddMovement = () => {
    setShowModal(true);
    resetForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.productId || !formData.quantity || !formData.reason) {
      toast.error('Por favor complete los campos obligatorios');
      return;
    }

    const selectedProduct = products.find(p => p.id === parseInt(formData.productId));
    
    if (!selectedProduct) {
      toast.error('Producto no encontrado');
      return;
    }

    const quantity = parseInt(formData.quantity);
    
    if (formData.type === 'Salida' && selectedProduct.stock < quantity) {
      toast.error(`Stock insuficiente. Stock actual: ${selectedProduct.stock}`);
      return;
    }

    // Crear nuevo movimiento
    const newMovement = {
      id: Math.max(...movements.map(m => m.id)) + 1,
      date: new Date().toISOString(),
      product: selectedProduct.name,
      productId: selectedProduct.id,
      type: formData.type,
      quantity: quantity,
      user: 'Eduardo', // Usuario actual
      reason: formData.reason,
      notes: formData.notes,
      reference: formData.reference || `${formData.type.toUpperCase()}-${Date.now()}`
    };

    setMovements([newMovement, ...movements]);
    setShowModal(false);
    resetForm();
    
    toast.success(`${formData.type} registrada exitosamente`);
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
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Gestión de Movimientos
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Registra entradas y salidas de productos
          </p>
        </div>
        <button
          onClick={handleAddMovement}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors duration-200"
        >
          <span className="text-xl">+</span>
          <span>Nuevo Movimiento</span>
        </button>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Movimientos</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{movements.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Entradas Hoy</h3>
          <p className="text-2xl font-bold text-green-600">
            {movements.filter(m => m.type === 'Entrada' && new Date(m.date).toDateString() === new Date().toDateString()).length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Salidas Hoy</h3>
          <p className="text-2xl font-bold text-red-600">
            {movements.filter(m => m.type === 'Salida' && new Date(m.date).toDateString() === new Date().toDateString()).length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Último Movimiento</h3>
          <p className="text-2xl font-bold text-purple-600">
            {movements.length > 0 ? new Date(movements[0].date).toLocaleDateString() : 'N/A'}
          </p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Buscar movimientos
            </label>
            <input
              type="text"
              placeholder="Producto, referencia o usuario..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Filtrar por tipo
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Todos los tipos</option>
              <option value="Entrada">Entradas</option>
              <option value="Salida">Salidas</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterType('');
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Limpiar Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Tabla de movimientos */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Cantidad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Motivo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Referencia
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {currentMovements.map((movement) => (
                <tr key={movement.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {new Date(movement.date).toLocaleDateString('es-PE')}
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(movement.date).toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {movement.product}
                    </div>
                    {movement.notes && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {movement.notes}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      movement.type === 'Entrada' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {movement.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {movement.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {movement.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {movement.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {movement.reference}
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
                  Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredMovements.length)} de {filteredMovements.length} movimientos
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

      {/* Modal para nuevo movimiento */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Registrar Nuevo Movimiento
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Producto *
                </label>
                <select
                  name="productId"
                  value={formData.productId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="">Seleccionar producto...</option>
                  {products.map(product => (
                    <option key={product.id} value={product.id}>
                      {product.name} (Stock: {product.stock})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tipo *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="Entrada">Entrada</option>
                    <option value="Salida">Salida</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Cantidad *
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Motivo *
                </label>
                <select
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="">Seleccionar motivo...</option>
                  {formData.type === 'Entrada' ? (
                    <>
                      <option value="Compra">Compra</option>
                      <option value="Devolución">Devolución</option>
                      <option value="Ajuste">Ajuste de inventario</option>
                      <option value="Donación">Donación</option>
                    </>
                  ) : (
                    <>
                      <option value="Venta">Venta</option>
                      <option value="Pérdida">Pérdida</option>
                      <option value="Daño">Producto dañado</option>
                      <option value="Ajuste">Ajuste de inventario</option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Referencia
                </label>
                <input
                  type="text"
                  name="reference"
                  value={formData.reference}
                  onChange={handleInputChange}
                  placeholder="Ej: FAC-001, PED-123..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Notas
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Información adicional..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none"
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
                  Registrar Movimiento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movements;