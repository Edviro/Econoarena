import { api } from './api';

// Configuración de endpoints
const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login/',
  LOGOUT: '/auth/logout/',
  VERIFY_TOKEN: '/auth/verify-token/',
  REFRESH_TOKEN: '/auth/refresh/',
  CHANGE_PASSWORD: '/auth/change-password/',
  RESET_PASSWORD: '/auth/reset-password/',
  PROFILE: '/auth/profile/'
};

export const authService = {
  // Iniciar sesión
  async login(credentials) {
    try {
      const response = await api.post(AUTH_ENDPOINTS.LOGIN, {
        username: credentials.username,
        password: credentials.password
      });

      const { token, refresh_token, user, permissions } = response.data;

      // Configurar el token para futuras peticiones
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Guardar refresh token si está disponible
        if (refresh_token) {
          localStorage.setItem('refreshToken', refresh_token);
        }
      }

      return {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          role: user.role,
          isActive: user.is_active,
          lastLogin: user.last_login,
          avatar: user.avatar
        },
        permissions: permissions || []
      };
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 
        error.response?.data?.detail || 
        'Error al iniciar sesión'
      );
    }
  },

  // Cerrar sesión
  async logout() {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (refreshToken) {
        await api.post(AUTH_ENDPOINTS.LOGOUT, {
          refresh_token: refreshToken
        });
      }
    } catch (error) {
      console.error('Error al cerrar sesión en el servidor:', error);
    } finally {
      // Limpiar tokens locales independientemente del resultado
      localStorage.removeItem('refreshToken');
      delete api.defaults.headers.common['Authorization'];
    }
  },

  // Verificar token actual
  async verifyToken(token) {
    try {
      // Configurar el token para la petición
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      const response = await api.get(AUTH_ENDPOINTS.VERIFY_TOKEN);
      
      return {
        user: {
          id: response.data.user.id,
          username: response.data.user.username,
          email: response.data.user.email,
          firstName: response.data.user.first_name,
          lastName: response.data.user.last_name,
          role: response.data.user.role,
          isActive: response.data.user.is_active,
          lastLogin: response.data.user.last_login,
          avatar: response.data.user.avatar
        },
        permissions: response.data.permissions || []
      };
    } catch (error) {
      // Si el token no es válido, intentar refrescar
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          return await this.refreshToken(refreshToken);
        } catch (refreshError) {
          throw new Error('Token inválido y no se pudo refrescar');
        }
      }
      throw new Error('Token inválido');
    }
  },

  // Refrescar token
  async refreshToken(refreshToken) {
    try {
      const response = await api.post(AUTH_ENDPOINTS.REFRESH_TOKEN, {
        refresh: refreshToken
      });

      const { access, user, permissions } = response.data;

      // Actualizar el token en las cabeceras
      api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
      
      // Guardar el nuevo token
      localStorage.setItem('authToken', access);

      return {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          role: user.role,
          isActive: user.is_active,
          lastLogin: user.last_login,
          avatar: user.avatar
        },
        permissions: permissions || []
      };
    } catch (error) {
      // Si no se puede refrescar, limpiar tokens
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('authToken');
      delete api.defaults.headers.common['Authorization'];
      
      throw new Error('No se pudo refrescar el token');
    }
  },

  // Cambiar contraseña
  async changePassword(passwordData) {
    try {
      const response = await api.post(AUTH_ENDPOINTS.CHANGE_PASSWORD, {
        old_password: passwordData.oldPassword,
        new_password: passwordData.newPassword,
        confirm_password: passwordData.confirmPassword
      });

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 
        error.response?.data?.detail ||
        'Error al cambiar la contraseña'
      );
    }
  },

  // Solicitar restablecimiento de contraseña
  async requestPasswordReset(email) {
    try {
      const response = await api.post(AUTH_ENDPOINTS.RESET_PASSWORD, {
        email
      });

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 
        error.response?.data?.detail ||
        'Error al solicitar restablecimiento de contraseña'
      );
    }
  },

  // Obtener perfil del usuario
  async getProfile() {
    try {
      const response = await api.get(AUTH_ENDPOINTS.PROFILE);
      
      return {
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
        firstName: response.data.first_name,
        lastName: response.data.last_name,
        role: response.data.role,
        isActive: response.data.is_active,
        lastLogin: response.data.last_login,
        avatar: response.data.avatar,
        createdAt: response.data.created_at,
        updatedAt: response.data.updated_at
      };
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 
        error.response?.data?.detail ||
        'Error al obtener el perfil'
      );
    }
  },

  // Actualizar perfil
  async updateProfile(profileData) {
    try {
      const response = await api.patch(AUTH_ENDPOINTS.PROFILE, {
        first_name: profileData.firstName,
        last_name: profileData.lastName,
        email: profileData.email
      });

      return {
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
        firstName: response.data.first_name,
        lastName: response.data.last_name,
        role: response.data.role,
        isActive: response.data.is_active,
        lastLogin: response.data.last_login,
        avatar: response.data.avatar
      };
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 
        error.response?.data?.detail ||
        'Error al actualizar el perfil'
      );
    }
  },

  // Verificar si el usuario está autenticado
  isAuthenticated() {
    const token = localStorage.getItem('authToken');
    return !!token;
  },

  // Obtener token actual
  getToken() {
    return localStorage.getItem('authToken');
  }
};