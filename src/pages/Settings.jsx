import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('general');

  // Estados para configuraciones
  const [generalSettings, setGeneralSettings] = useState({
    companyName: 'EconoArena',
    companyEmail: 'info@econoarena.com',
    companyPhone: '+51 999 888 777',
    companyAddress: 'Av. Principal 123, Lima, Perú',
    timezone: 'America/Lima',
    language: 'es',
    currency: 'PEN',
    dateFormat: 'dd/mm/yyyy',
    lowStockThreshold: 10
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    lowStockAlerts: true,
    dailyReports: false,
    weeklyReports: true,
    systemUpdates: true,
    loginAlerts: false,
    inventoryChanges: true,
    newUserRegistration: true,
    backupReminders: true
  });

  const [integrationSettings, setIntegrationSettings] = useState({
    apiEndpoint: 'https://api.econoarena.com',
    webhookUrl: '',
    backupFrequency: 'daily',
    backupRetention: 30,
    autoBackup: true,
    exportFormat: 'excel',
    importValidation: true,
    dataEncryption: true
  });

  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [locations, setLocations] = useState([
    { id: 1, name: 'Almacén Principal', address: 'Av. Principal 123, Lima', isActive: true, capacity: 1000 },
    { id: 2, name: 'Almacén Secundario', address: 'Jr. Comercio 456, Lima', isActive: true, capacity: 500 }
  ]);

  const [categories, setCategories] = useState([
    { id: 1, name: 'Arena para Gatos', description: 'Diferentes tipos de arena', isActive: true },
    { id: 2, name: 'Accesorios', description: 'Accesorios para mascotas', isActive: true }
  ]);

  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingLocation, setEditingLocation] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

  const [locationFormData, setLocationFormData] = useState({
    name: '',
    address: '',
    capacity: ''
  });

  const [categoryFormData, setCategoryFormData] = useState({
    name: '',
    description: ''
  });

  const handleGeneralSettingChange = (setting, value) => {
    setGeneralSettings(prev => ({
      ...prev,
      [setting]: value
    }));
    toast.success('Configuración actualizada');
  };

  const handleNotificationChange = (setting, value) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: value
    }));
    toast.success('Preferencias de notificación actualizadas');
  };

  const handleIntegrationChange = (setting, value) => {
    setIntegrationSettings(prev => ({
      ...prev,
      [setting]: value
    }));
    toast.success('Configuración de integración actualizada');
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    
    if (!profileData.firstName || !profileData.lastName || !profileData.email) {
      toast.error('Por favor complete los campos obligatorios');
      return;
    }

    if (profileData.newPassword && profileData.newPassword !== profileData.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    if (profileData.newPassword && !profileData.currentPassword) {
      toast.error('Ingrese su contraseña actual para cambiarla');
      return;
    }

    // Aquí iría la lógica para actualizar el perfil
    toast.success('Perfil actualizado exitosamente');
    
    // Limpiar campos de contraseña
    setProfileData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    
    if (!locationFormData.name || !locationFormData.address) {
      toast.error('Por favor complete todos los campos');
      return;
    }

    if (editingLocation) {
      setLocations(locations.map(l => 
        l.id === editingLocation.id 
          ? { ...l, ...locationFormData, capacity: parseInt(locationFormData.capacity) }
          : l
      ));
      toast.success('Ubicación actualizada exitosamente');
    } else {
      const newLocation = {
        id: Math.max(...locations.map(l => l.id)) + 1,
        ...locationFormData,
        capacity: parseInt(locationFormData.capacity),
        isActive: true
      };
      setLocations([...locations, newLocation]);
      toast.success('Ubicación añadida exitosamente');
    }

    setShowLocationModal(false);
    setEditingLocation(null);
    setLocationFormData({ name: '', address: '', capacity: '' });
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    
    if (!categoryFormData.name) {
      toast.error('El nombre de la categoría es obligatorio');
      return;
    }

    if (editingCategory) {
      setCategories(categories.map(c => 
        c.id === editingCategory.id 
          ? { ...c, ...categoryFormData }
          : c
      ));
      toast.success('Categoría actualizada exitosamente');
    } else {
      const newCategory = {
        id: Math.max(...categories.map(c => c.id)) + 1,
        ...categoryFormData,
        isActive: true
      };
      setCategories([...categories, newCategory]);
      toast.success('Categoría añadida exitosamente');
    }

    setShowCategoryModal(false);
    setEditingCategory(null);
    setCategoryFormData({ name: '', description: '' });
  };

  const exportSettings = () => {
    const settingsData = {
      general: generalSettings,
      notifications: notificationSettings,
      integrations: integrationSettings,
      locations,
      categories,
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(settingsData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'econoarena-settings.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success('Configuración exportada exitosamente');
  };

  const testNotifications = () => {
    toast.success('Notificación de prueba enviada');
    toast.info('Esta es una notificación informativa');
    toast.error('Esta es una notificación de error');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Configuración
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Personaliza EconoArena según tus necesidades
          </p>
        </div>
        <button
          onClick={exportSettings}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
        >
          <span>📤</span>
          <span>Exportar Configuración</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'general', name: 'General', icon: '⚙️' },
              { id: 'profile', name: 'Perfil', icon: '👤' },
              { id: 'notifications', name: 'Notificaciones', icon: '🔔' },
              { id: 'data', name: 'Datos', icon: '📁' },
              { id: 'integrations', name: 'Integraciones', icon: '🔗' }
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
          {/* Tab: General */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Configuración General
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Información de la Empresa */}
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Información de la Empresa
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nombre de la Empresa
                      </label>
                      <input
                        type="text"
                        value={generalSettings.companyName}
                        onChange={(e) => handleGeneralSettingChange('companyName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={generalSettings.companyEmail}
                        onChange={(e) => handleGeneralSettingChange('companyEmail', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        value={generalSettings.companyPhone}
                        onChange={(e) => handleGeneralSettingChange('companyPhone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Dirección
                      </label>
                      <textarea
                        value={generalSettings.companyAddress}
                        onChange={(e) => handleGeneralSettingChange('companyAddress', e.target.value)}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Configuraciones del Sistema */}
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Configuraciones del Sistema
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Zona Horaria
                      </label>
                      <select
                        value={generalSettings.timezone}
                        onChange={(e) => handleGeneralSettingChange('timezone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white"
                      >
                        <option value="America/Lima">Lima, Perú (UTC-5)</option>
                        <option value="America/New_York">Nueva York (UTC-5)</option>
                        <option value="Europe/Madrid">Madrid (UTC+1)</option>
                        <option value="America/Mexico_City">Ciudad de México (UTC-6)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Idioma
                      </label>
                      <select
                        value={generalSettings.language}
                        onChange={(e) => handleGeneralSettingChange('language', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white"
                      >
                        <option value="es">Español</option>
                        <option value="en">English</option>
                        <option value="pt">Português</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Moneda
                      </label>
                      <select
                        value={generalSettings.currency}
                        onChange={(e) => handleGeneralSettingChange('currency', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white"
                      >
                        <option value="PEN">Soles Peruanos (S/)</option>
                        <option value="USD">Dólares (USD)</option>
                        <option value="EUR">Euros (EUR)</option>
                        <option value="MXN">Pesos Mexicanos (MXN)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Umbral de Stock Bajo
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={generalSettings.lowStockThreshold}
                        onChange={(e) => handleGeneralSettingChange('lowStockThreshold', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={isDarkMode}
                          onChange={toggleTheme}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          Modo Oscuro
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Perfil */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Mi Perfil
              </h2>

              <form onSubmit={handleProfileSubmit} className="max-w-lg space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleProfileInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Apellido
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleProfileInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <hr className="my-6" />

                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Cambiar Contraseña
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Contraseña Actual
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={profileData.currentPassword}
                    onChange={handleProfileInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nueva Contraseña
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={profileData.newPassword}
                    onChange={handleProfileInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Confirmar Nueva Contraseña
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={profileData.confirmPassword}
                    onChange={handleProfileInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                >
                  Actualizar Perfil
                </button>
              </form>
            </div>
          )}

          {/* Tab: Notificaciones */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Preferencias de Notificaciones
                </h2>
                <button
                  onClick={testNotifications}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200"
                >
                  Probar Notificaciones
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Notificaciones del Sistema
                  </h3>
                  {[
                    { key: 'emailNotifications', label: 'Notificaciones por Email' },
                    { key: 'lowStockAlerts', label: 'Alertas de Stock Bajo' },
                    { key: 'systemUpdates', label: 'Actualizaciones del Sistema' },
                    { key: 'loginAlerts', label: 'Alertas de Inicio de Sesión' },
                    { key: 'inventoryChanges', label: 'Cambios en Inventario' }
                  ].map((setting) => (
                    <label key={setting.key} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={notificationSettings[setting.key]}
                        onChange={(e) => handleNotificationChange(setting.key, e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        {setting.label}
                      </span>
                    </label>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Reportes Automáticos
                  </h3>
                  {[
                    { key: 'dailyReports', label: 'Reportes Diarios' },
                    { key: 'weeklyReports', label: 'Reportes Semanales' },
                    { key: 'newUserRegistration', label: 'Registro de Nuevos Usuarios' },
                    { key: 'backupReminders', label: 'Recordatorios de Backup' }
                  ].map((setting) => (
                    <label key={setting.key} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={notificationSettings[setting.key]}
                        onChange={(e) => handleNotificationChange(setting.key, e.target.checked)}
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
          )}

          {/* Tab: Datos */}
          {activeTab === 'data' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Gestión de Datos
              </h2>

              {/* Ubicaciones */}
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Ubicaciones de Almacén
                  </h3>
                  <button
                    onClick={() => {
                      setShowLocationModal(true);
                      setLocationFormData({ name: '', address: '', capacity: '' });
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200"
                  >
                    + Añadir Ubicación
                  </button>
                </div>
                <div className="space-y-3">
                  {locations.map((location) => (
                    <div key={location.id} className="flex justify-between items-center bg-white dark:bg-gray-600 p-4 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{location.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{location.address}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">Capacidad: {location.capacity} unidades</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setEditingLocation(location);
                            setLocationFormData({
                              name: location.name,
                              address: location.address,
                              capacity: location.capacity.toString()
                            });
                            setShowLocationModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
                        >
                          Editar
                        </button>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          location.isActive 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                        }`}>
                          {location.isActive ? 'Activa' : 'Inactiva'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categorías */}
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Categorías de Productos
                  </h3>
                  <button
                    onClick={() => {
                      setShowCategoryModal(true);
                      setCategoryFormData({ name: '', description: '' });
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200"
                  >
                    + Añadir Categoría
                  </button>
                </div>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div key={category.id} className="flex justify-between items-center bg-white dark:bg-gray-600 p-4 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{category.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{category.description}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setEditingCategory(category);
                            setCategoryFormData({
                              name: category.name,
                              description: category.description
                            });
                            setShowCategoryModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
                        >
                          Editar
                        </button>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          category.isActive 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                        }`}>
                          {category.isActive ? 'Activa' : 'Inactiva'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab: Integraciones */}
          {activeTab === 'integrations' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Integraciones y Backups
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* API y Webhooks */}
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    API y Webhooks
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        API Endpoint
                      </label>
                      <input
                        type="url"
                        value={integrationSettings.apiEndpoint}
                        onChange={(e) => handleIntegrationChange('apiEndpoint', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Webhook URL
                      </label>
                      <input
                        type="url"
                        value={integrationSettings.webhookUrl}
                        onChange={(e) => handleIntegrationChange('webhookUrl', e.target.value)}
                        placeholder="https://tu-webhook.com/endpoint"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={integrationSettings.dataEncryption}
                          onChange={(e) => handleIntegrationChange('dataEncryption', e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          Encriptación de Datos
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Backups */}
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Configuración de Backups
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Frecuencia de Backup
                      </label>
                      <select
                        value={integrationSettings.backupFrequency}
                        onChange={(e) => handleIntegrationChange('backupFrequency', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white"
                      >
                        <option value="daily">Diario</option>
                        <option value="weekly">Semanal</option>
                        <option value="monthly">Mensual</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Retención (días)
                      </label>
                      <input
                        type="number"
                        min="7"
                        max="365"
                        value={integrationSettings.backupRetention}
                        onChange={(e) => handleIntegrationChange('backupRetention', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={integrationSettings.autoBackup}
                          onChange={(e) => handleIntegrationChange('autoBackup', e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          Backup Automático
                        </span>
                      </label>
                    </div>
                    <button
                      onClick={() => toast.success('Backup manual iniciado')}
                      className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                      Crear Backup Ahora
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal para ubicación */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {editingLocation ? 'Editar Ubicación' : 'Nueva Ubicación'}
            </h2>
            
            <form onSubmit={handleLocationSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nombre *
                </label>
                <input
                  type="text"
                  value={locationFormData.name}
                  onChange={(e) => setLocationFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Dirección *
                </label>
                <textarea
                  value={locationFormData.address}
                  onChange={(e) => setLocationFormData(prev => ({ ...prev, address: e.target.value }))}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Capacidad (unidades)
                </label>
                <input
                  type="number"
                  min="1"
                  value={locationFormData.capacity}
                  onChange={(e) => setLocationFormData(prev => ({ ...prev, capacity: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowLocationModal(false);
                    setEditingLocation(null);
                  }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                >
                  {editingLocation ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para categoría */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
            </h2>
            
            <form onSubmit={handleCategorySubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nombre *
                </label>
                <input
                  type="text"
                  value={categoryFormData.name}
                  onChange={(e) => setCategoryFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Descripción
                </label>
                <textarea
                  value={categoryFormData.description}
                  onChange={(e) => setCategoryFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCategoryModal(false);
                    setEditingCategory(null);
                  }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                >
                  {editingCategory ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;