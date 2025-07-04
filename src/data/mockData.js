// Datos mock para desarrollo - serán reemplazados por la API real

export const mockUsers = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@econoarena.com',
    firstName: 'Eduardo',
    lastName: 'Administrador',
    role: 'admin',
    isActive: true,
    lastLogin: '2024-07-03T10:30:00Z',
    avatar: null,
    permissions: ['create', 'read', 'update', 'delete', 'manage_users', 'view_reports']
  },
  {
    id: 2,
    username: 'operador',
    email: 'operador@econoarena.com',
    firstName: 'María',
    lastName: 'Operadora',
    role: 'operator',
    isActive: true,
    lastLogin: '2024-07-03T09:15:00Z',
    avatar: null,
    permissions: ['create', 'read', 'update']
  },
  {
    id: 3,
    username: 'viewer',
    email: 'viewer@econoarena.com',
    firstName: 'Juan',
    lastName: 'Visualizador',
    role: 'viewer',
    isActive: true,
    lastLogin: '2024-07-02T16:45:00Z',
    avatar: null,
    permissions: ['read']
  }
];

export const mockProducts = [
  { 
    id: 1, 
    name: 'Arena Perlada 5 kg', 
    stock: 120, 
    minStock: 30, 
    category: 'Arena para Gatos', 
    location: 'Almacén Principal', 
    value: 8.50,
    sku: 'AP-5KG-001',
    description: 'Arena perlada de alta calidad para gatos, absorbente y sin polvo',
    supplier: 'Distribuidora Mascotas SA',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-07-01T14:30:00Z'
  },
  { 
    id: 2, 
    name: 'Arena Perlada 10 kg', 
    stock: 80, 
    minStock: 20, 
    category: 'Arena para Gatos', 
    location: 'Almacén Principal', 
    value: 15.00,
    sku: 'AP-10KG-002',
    description: 'Arena perlada de alta calidad para gatos, formato económico',
    supplier: 'Distribuidora Mascotas SA',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-07-01T14:30:00Z'
  },
  { 
    id: 3, 
    name: 'Arena Perlada 25 kg', 
    stock: 40, 
    minStock: 10, 
    category: 'Arena para Gatos', 
    location: 'Almacén Principal', 
    value: 35.00,
    sku: 'AP-25KG-003',
    description: 'Arena perlada de alta calidad para gatos, formato mayorista',
    supplier: 'Distribuidora Mascotas SA',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-07-01T14:30:00Z'
  },
  { 
    id: 4, 
    name: 'Arena Perlada 50 kg', 
    stock: 15, 
    minStock: 5, 
    category: 'Arena para Gatos', 
    location: 'Almacén Principal', 
    value: 65.00,
    sku: 'AP-50KG-004',
    description: 'Arena perlada de alta calidad para gatos, formato industrial',
    supplier: 'Distribuidora Mascotas SA',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-07-01T14:30:00Z'
  },
  { 
    id: 5, 
    name: 'Arena Fina 5 kg', 
    stock: 150, 
    minStock: 40, 
    category: 'Arena para Gatos', 
    location: 'Almacén Principal', 
    value: 7.00,
    sku: 'AF-5KG-005',
    description: 'Arena fina tradicional para gatos, económica y eficiente',
    supplier: 'Suministros Felinos Ltda',
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-07-01T14:30:00Z'
  },
  { 
    id: 6, 
    name: 'Arena Fina 10 kg', 
    stock: 90, 
    minStock: 25, 
    category: 'Arena para Gatos', 
    location: 'Almacén Principal', 
    value: 12.50,
    sku: 'AF-10KG-006',
    description: 'Arena fina tradicional para gatos, formato mediano',
    supplier: 'Suministros Felinos Ltda',
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-07-01T14:30:00Z'
  },
  { 
    id: 7, 
    name: 'Arena Fina 25 kg', 
    stock: 50, 
    minStock: 15, 
    category: 'Arena para Gatos', 
    location: 'Almacén Principal', 
    value: 30.00,
    sku: 'AF-25KG-007',
    description: 'Arena fina tradicional para gatos, formato grande',
    supplier: 'Suministros Felinos Ltda',
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-07-01T14:30:00Z'
  },
  { 
    id: 8, 
    name: 'Arena Fina 50 kg', 
    stock: 20, 
    minStock: 8, 
    category: 'Arena para Gatos', 
    location: 'Almacén Principal', 
    value: 55.00,
    sku: 'AF-50KG-008',
    description: 'Arena fina tradicional para gatos, formato industrial',
    supplier: 'Suministros Felinos Ltda',
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-07-01T14:30:00Z'
  },
  { 
    id: 9, 
    name: 'Arena Granulada 5 kg', 
    stock: 100, 
    minStock: 25, 
    category: 'Arena para Gatos', 
    location: 'Almacén Secundario', 
    value: 7.50,
    sku: 'AG-5KG-009',
    description: 'Arena granulada para gatos, textura especial',
    supplier: 'Productos Animales SA',
    createdAt: '2024-02-01T12:00:00Z',
    updatedAt: '2024-07-01T14:30:00Z'
  },
  { 
    id: 10, 
    name: 'Arena Granulada 10 kg', 
    stock: 70, 
    minStock: 18, 
    category: 'Arena para Gatos', 
    location: 'Almacén Secundario', 
    value: 13.50,
    sku: 'AG-10KG-010',
    description: 'Arena granulada para gatos, formato mediano',
    supplier: 'Productos Animales SA',
    createdAt: '2024-02-01T12:00:00Z',
    updatedAt: '2024-07-01T14:30:00Z'
  },
  { 
    id: 11, 
    name: 'Arena Granulada 25 kg', 
    stock: 30, 
    minStock: 8, 
    category: 'Arena para Gatos', 
    location: 'Almacén Secundario', 
    value: 32.00,
    sku: 'AG-25KG-011',
    description: 'Arena granulada para gatos, formato grande',
    supplier: 'Productos Animales SA',
    createdAt: '2024-02-01T12:00:00Z',
    updatedAt: '2024-07-01T14:30:00Z'
  },
  { 
    id: 12, 
    name: 'Arena Granulada 50 kg', 
    stock: 10, 
    minStock: 3, 
    category: 'Arena para Gatos', 
    location: 'Almacén Secundario', 
    value: 60.00,
    sku: 'AG-50KG-012',
    description: 'Arena granulada para gatos, formato industrial',
    supplier: 'Productos Animales SA',
    createdAt: '2024-02-01T12:00:00Z',
    updatedAt: '2024-07-01T14:30:00Z'
  }
];

export const mockMovements = [
  { 
    id: 1,
    date: '2024-07-03T08:00:00Z', 
    product: 'Arena Perlada 10 kg', 
    productId: 2,
    type: 'Salida', 
    quantity: 5, 
    user: 'Eduardo',
    userId: 1,
    reason: 'Venta',
    notes: 'Cliente mayorista',
    reference: 'VEN-2024-001'
  },
  { 
    id: 2,
    date: '2024-07-03T10:30:00Z', 
    product: 'Arena Fina 5 kg', 
    productId: 5,
    type: 'Entrada', 
    quantity: 50, 
    user: 'María',
    userId: 2,
    reason: 'Compra',
    notes: 'Reposición de stock',
    reference: 'COM-2024-015'
  },
  { 
    id: 3,
    date: '2024-07-02T14:15:00Z', 
    product: 'Arena Granulada 25 kg', 
    productId: 11,
    type: 'Salida', 
    quantity: 2, 
    user: 'Juan',
    userId: 3,
    reason: 'Venta',
    notes: 'Pedido especial',
    reference: 'VEN-2024-002'
  },
  { 
    id: 4,
    date: '2024-07-01T16:45:00Z', 
    product: 'Arena Perlada 50 kg', 
    productId: 4,
    type: 'Salida', 
    quantity: 1, 
    user: 'Pedro',
    userId: 1,
    reason: 'Venta',
    notes: 'Cliente corporativo',
    reference: 'VEN-2024-003'
  },
  { 
    id: 5,
    date: '2024-06-30T09:20:00Z', 
    product: 'Arena Fina 10 kg', 
    productId: 6,
    type: 'Entrada', 
    quantity: 30, 
    user: 'Ana',
    userId: 2,
    reason: 'Compra',
    notes: 'Abastecimiento mensual',
    reference: 'COM-2024-014'
  },
  { 
    id: 6,
    date: '2024-06-29T11:10:00Z', 
    product: 'Arena Perlada 5 kg', 
    productId: 1,
    type: 'Salida', 
    quantity: 10, 
    user: 'Eduardo',
    userId: 1,
    reason: 'Venta',
    notes: 'Venta local',
    reference: 'VEN-2024-004'
  }
];

export const mockCategories = [
  {
    id: 1,
    name: 'Arena para Gatos',
    description: 'Diferentes tipos de arena para gatos',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'Accesorios',
    description: 'Accesorios para mascotas',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  }
];

export const mockLocations = [
  {
    id: 1,
    name: 'Almacén Principal',
    address: 'Av. Principal 123, Lima',
    isActive: true,
    capacity: 1000,
    currentOccupancy: 750
  },
  {
    id: 2,
    name: 'Almacén Secundario',
    address: 'Jr. Comercio 456, Lima',
    isActive: true,
    capacity: 500,
    currentOccupancy: 300
  }
];

export const mockSuppliers = [
  {
    id: 1,
    name: 'Distribuidora Mascotas SA',
    contact: 'contacto@distribuidora.com',
    phone: '+51 999 888 777',
    address: 'Av. Industrial 789, Lima'
  },
  {
    id: 2,
    name: 'Suministros Felinos Ltda',
    contact: 'ventas@felinos.com',
    phone: '+51 888 777 666',
    address: 'Jr. Proveedores 321, Lima'
  },
  {
    id: 3,
    name: 'Productos Animales SA',
    contact: 'info@animales.com',
    phone: '+51 777 666 555',
    address: 'Av. Mascotas 654, Lima'
  }
];

// Datos para notificaciones
export const mockNotifications = [
  {
    id: 1,
    type: 'warning',
    title: 'Stock Bajo',
    message: 'Arena Perlada 50 kg tiene stock bajo (15 unidades)',
    isRead: false,
    createdAt: '2024-07-03T08:00:00Z'
  },
  {
    id: 2,
    type: 'info',
    title: 'Nuevo Movimiento',
    message: 'Eduardo registró una salida de 5 unidades',
    isRead: false,
    createdAt: '2024-07-03T07:30:00Z'
  },
  {
    id: 3,
    type: 'success',
    title: 'Reabastecimiento',
    message: 'Se añadieron 50 unidades de Arena Fina 5 kg',
    isRead: true,
    createdAt: '2024-07-02T16:45:00Z'
  },
  {
    id: 4,
    type: 'warning',
    title: 'Stock Crítico',
    message: 'Arena Granulada 50 kg está en stock crítico (10 unidades)',
    isRead: false,
    createdAt: '2024-07-02T14:20:00Z'
  },
  {
    id: 5,
    type: 'info',
    title: 'Reporte Generado',
    message: 'Reporte mensual de inventario generado exitosamente',
    isRead: true,
    createdAt: '2024-07-01T10:00:00Z'
  },
  {
    id: 6,
    type: 'error',
    title: 'Error de Sistema',
    message: 'Fallo temporal en la conexión con el proveedor',
    isRead: false,
    createdAt: '2024-06-30T15:30:00Z'
  },
  {
    id: 7,
    type: 'info',
    title: 'Nuevo Usuario',
    message: 'Se registró un nuevo usuario en el sistema',
    isRead: true,
    createdAt: '2024-06-29T09:15:00Z'
  }
];

// Funciones helper para trabajar con los datos mock
export const mockHelpers = {
  // Obtener producto por ID
  getProductById: (id) => mockProducts.find(p => p.id === id),
  
  // Obtener productos con stock bajo
  getLowStockProducts: () => mockProducts.filter(p => p.stock <= p.minStock),
  
  // Calcular valor total del inventario
  getTotalInventoryValue: () => mockProducts.reduce((total, p) => total + (p.stock * p.value), 0),
  
  // Obtener movimientos por tipo
  getMovementsByType: (type) => mockMovements.filter(m => m.type === type),
  
  // Obtener notificaciones no leídas
  getUnreadNotifications: () => mockNotifications.filter(n => !n.isRead),
  
  // Simular delay de red
  delay: (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))
};