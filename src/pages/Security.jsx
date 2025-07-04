import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Security = () => {
  const { user, hasPermission } = useAuth();
  const [activeTab, setActiveTab] = useState('users');
  
  // Estados para usuarios
  const [users, setUsers] = useState([
    { id: 1, username: 'admin', email: 'admin@econoarena.com', firstName: 'Eduardo', lastName: 'Administrador', role: 'admin', isActive: true, lastLogin: '2024-07-03T10:30:00Z' },
    { id: 2, username: 'operador', email: 'operador@econoarena.com', firstName: 'María', lastName: 'Operadora', role: 'operator', isActive: true, lastLogin: '2024-07-03T09:15:00Z' },
    { id: 3, username: 'viewer', email: 'viewer@econoarena.com', firstName: 'Juan', lastName: 'Visualizador', role: 'viewer', isActive: true, lastLogin: '2024-07-02T16:45:00Z' },
    { id: 4, username: 'almacenero', email: 'almacen@econoarena.com', firstName: 'Carlos', lastName: 'Almacén', role: 'operator', isActive: false, lastLogin: '2024-06-28T14:20:00Z' }
  ]);

  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userFormData, setUserFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    role: 'viewer',
    password: '',
    confirmPassword: ''
  });

  // Estados para auditoría
  const [auditLogs] = useState([
    { id: 1, user: 'Eduardo', action: 'LOGIN', resource: 'Sistema', timestamp: '2024-07-03T10:30:00Z', ip: '192.168.1.100', details: 'Inicio de sesión exitoso' },
    { id: 2, user: 'Eduardo', action: 'CREATE', resource: 'Producto', timestamp: '2024-07-03T10:25:00Z', ip: '192.168.1.100', details: 'Creó Arena Perlada 15kg' },
    { id: 3, user: 'María', action: 'UPDATE', resource: 'Inventario', timestamp: '2024-07-03T09:45:00Z', ip: '192.168.1.105', details: 'Actualizó stock de Arena Fina 5kg' },
    { id: 4, user: 'Juan', action: 'VIEW', resource: 'Reporte', timestamp: '2024-07-03T09:30:00Z', ip: '192.168.1.110', details: 'Generó reporte de inventario' },
    { id: 5, user: 'Eduardo', action: 'DELETE', resource: 'Usuario', timestamp: '2024-07-02T16:20:00Z', ip: '192.168.1.100', details: 'Eliminó usuario temporal' }
  ]);

  // Estados para configuración de seguridad
  const [securitySettings, setSecuritySettings] = useState({
    passwordMinLength: 8,
    passwordRequireSpecial: true,
    passwordRequireNumbers: true,
    passwordRequireUppercase: true,
    sessionTimeout: 480, // en minutos
    maxLoginAttempts: 3,
    lockoutDuration: 15, // en minutos
    twoFactorEnabled: false,
    auditRetentionDays: 90
  });

  const roles = [
    { value: 'admin', label: 'Administrador', description: 'Acceso completo al sistema' },
    { value: 'operator', label: 'Operador', description: 'Gestión de inventario y movimientos' },
    { value: 'viewer', label: 'Visualizador', description: 'Solo lectura de reportes' }
  ];

  const permissions = {
    admin: ['create', 'read', 'update', 'delete', 'manage_users', 'view_reports', 'system_config'],
    operator: ['create', 'read', 'update', 'view_reports'],
    viewer: ['read', 'view_reports']
  };

  const resetUserForm = () => {
    setUserFormData({
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      role: 'viewer',
      password: '',
      confirmPassword: ''
    });
    setEditingUser(null);
  };

  const handleAddUser = () => {
    if (!hasPermission('manage_users')) {
      toast.error('No tienes permisos para gestionar usuarios');
      return;
    }
    setShowUserModal(true);
    resetUserForm();
  };

  const handleEditUser = (userToEdit) => {
    if (!hasPermission('manage_users')) {
      toast.error('No tienes permisos para editar usuarios');
      return;
    }
    setEditingUser(userToEdit);
    setUserFormData({
      username: userToEdit.username,
      email: userToEdit.email,
      firstName: userToEdit.firstName,
      lastName: userToEdit.lastName,
      role: userToEdit.role,
      password: '',
      confirmPassword: ''
    });
    setShowUserModal(true);
  };

  const handleToggleUserStatus = (userId) => {
    if (!hasPermission('manage_users')) {
      toast.error('No tienes permisos para cambiar estado de usuarios');
      return;
    }
    
    setUsers(users.map(u => 
      u.id === userId ? { ...u, isActive: !u.isActive } : u
    ));
    
    const user = users.find(u => u.id === userId);
    toast.success(`Usuario ${user.isActive ? 'desactivado' : 'activado'} exitosamente`);
  };

  const handleDeleteUser = (userId) => {
    if (!hasPermission('manage_users')) {
      toast.error('No tienes permisos para eliminar usuarios');
      return;
    }

    if (userId === user.id) {
      toast.error('No puedes eliminar tu propio usuario');
      return;
    }

    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      setUsers(users.filter(u => u.id !== userId));
      toast.success('Usuario eliminado exitosamente');
    }
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    
    if (!userFormData.username || !userFormData.email || !userFormData.firstName || !userFormData.lastName) {
      toast.error('Por favor complete todos los campos obligatorios');
      return;
    }

    if (!editingUser && (!userFormData.password || !userFormData.confirmPassword)) {
      toast.error('La contraseña es obligatoria para nuevos usuarios');
      return;
    }

    if (userFormData.password && userFormData.password !== userFormData.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    if (editingUser) {
      // Editar usuario existente
      setUsers(users.map(u => 
        u.id === editingUser.id 
          ? { 
              ...u, 
              username: userFormData.username,
              email: userFormData.email,
              firstName: userFormData.firstName,
              lastName: userFormData.lastName,
              role: userFormData.role
            }
          : u
      ));
      toast.success('Usuario actualizado exitosamente');
    } else {
      // Crear nuevo usuario
      const newUser = {
        id: Math.max(...users.map(u => u.id)) + 1,
        ...userFormData,
        isActive: true,
        lastLogin: null
      };
      delete newUser.password;
      delete newUser.confirmPassword;
      
      setUsers([...users, newUser]);
      toast.success('Usuario creado exitosamente');
    }

    setShowUserModal(false);
    resetUserForm();
  };

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setUserFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSecuritySettingChange = (setting, value) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: value
    }));
    toast.success('Configuración actualizada');
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'operator': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'viewer': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getActionBadgeColor = (action) => {
    switch (action) {
      case 'LOGIN': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'CREATE': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'UPDATE': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'DELETE': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'VIEW': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Seguridad
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Gestiona usuarios, permisos y configuración de seguridad
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'users', name: 'Usuarios', icon: '👥' },
              { id: 'audit', name: 'Auditoría', icon: '📋' },
              { id: 'settings', name: 'Configuración', icon: '🔧' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab.icon} {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Tab: Usuarios */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Gestión de Usuarios
                </h2>
                {hasPermission('manage_users') && (
                  <button
                    onClick={handleAddUser}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
                  >
                    <span>+</span>
                    <span>Nuevo Usuario</span>
                  </button>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Usuario
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Rol
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Último Acceso
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {users.map((userItem) => (
                      <tr key={userItem.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {userItem.firstName} {userItem.lastName}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {userItem.email}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(userItem.role)}`}>
                            {roles.find(r => r.value === userItem.role)?.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            userItem.isActive 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                          }`}>
                            {userItem.isActive ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {userItem.lastLogin 
                            ? new Date(userItem.lastLogin).toLocaleDateString('es-PE')
                            : 'Nunca'
                          }
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          {hasPermission('manage_users') && (
                            <>
                              <button
                                onClick={() => handleEditUser(userItem)}
                                className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                              >
                                Editar
                              </button>
                              <button
                                onClick={() => handleToggleUserStatus(userItem.id)}
                                className={userItem.isActive 
                                  ? "text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                  : "text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                                }
                              >
                                {userItem.isActive ? 'Desactivar' : 'Activar'}
                              </button>
                              {userItem.id !== user.id && (
                                <button
                                  onClick={() => handleDeleteUser(userItem.id)}
                                  className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                >
                                  Eliminar
                                </button>
                              )}
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab: Auditoría */}
          {activeTab === 'audit' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Registro de Auditoría
                </h2>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Últimas 100 acciones
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Fecha/Hora
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Usuario
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Acción
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Recurso
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        IP
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Detalles
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {new Date(log.timestamp).toLocaleString('es-PE')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {log.user}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActionBadgeColor(log.action)}`}>
                            {log.action}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {log.resource}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {log.ip}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                          {log.details}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab: Configuración */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Configuración de Seguridad
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Políticas de Contraseña */}
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Políticas de Contraseña
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Longitud mínima
                      </label>
                      <input
                        type="number"
                        min="6"
                        max="20"
                        value={securitySettings.passwordMinLength}
                        onChange={(e) => handleSecuritySettingChange('passwordMinLength', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      {[
                        { key: 'passwordRequireSpecial', label: 'Requiere caracteres especiales' },
                        { key: 'passwordRequireNumbers', label: 'Requiere números' },
                        { key: 'passwordRequireUppercase', label: 'Requiere mayúsculas' }
                      ].map((setting) => (
                        <label key={setting.key} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={securitySettings[setting.key]}
                            onChange={(e) => handleSecuritySettingChange(setting.key, e.target.checked)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            {setting.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Configuración de Sesión */}
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Configuración de Sesión
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Timeout de sesión (minutos)
                      </label>
                      <input
                        type="number"
                        min="15"
                        max="1440"
                        value={securitySettings.sessionTimeout}
                        onChange={(e) => handleSecuritySettingChange('sessionTimeout', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Máximo intentos de login
                      </label>
                      <input
                        type="number"
                        min="3"
                        max="10"
                        value={securitySettings.maxLoginAttempts}
                        onChange={(e) => handleSecuritySettingChange('maxLoginAttempts', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Duración de bloqueo (minutos)
                      </label>
                      <input
                        type="number"
                        min="5"
                        max="60"
                        value={securitySettings.lockoutDuration}
                        onChange={(e) => handleSecuritySettingChange('lockoutDuration', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Configuración Adicional */}
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Configuración Adicional
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={securitySettings.twoFactorEnabled}
                        onChange={(e) => handleSecuritySettingChange('twoFactorEnabled', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        Habilitar autenticación de dos factores
                      </span>
                    </label>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Retención de logs (días)
                    </label>
                    <input
                      type="number"
                      min="30"
                      max="365"
                      value={securitySettings.auditRetentionDays}
                      onChange={(e) => handleSecuritySettingChange('auditRetentionDays', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal para usuario */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
            </h2>
            
            <form onSubmit={handleUserSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={userFormData.firstName}
                    onChange={handleUserInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Apellido *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={userFormData.lastName}
                    onChange={handleUserInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Usuario *
                </label>
                <input
                  type="text"
                  name="username"
                  value={userFormData.username}
                  onChange={handleUserInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={userFormData.email}
                  onChange={handleUserInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Rol *
                </label>
                <select
                  name="role"
                  value={userFormData.role}
                  onChange={handleUserInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                >
                  {roles.map(role => (
                    <option key={role.value} value={role.value}>
                      {role.label} - {role.description}
                    </option>
                  ))}
                </select>
              </div>

              {!editingUser && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Contraseña *
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={userFormData.password}
                      onChange={handleUserInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Confirmar Contraseña *
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={userFormData.confirmPassword}
                      onChange={handleUserInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                </>
              )}

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowUserModal(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                >
                  {editingUser ? 'Actualizar' : 'Crear'} Usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Security;