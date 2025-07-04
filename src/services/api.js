import axios from 'axios';

// Configuración base de la API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Crear instancia de axios
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor para requests - añadir token automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para responses - manejar errores globalmente
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Si el error es 401 y no hemos intentado refrescar el token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh/`, {
            refresh: refreshToken
          });

          const { access } = response.data;
          localStorage.setItem('authToken', access);
          
          // Actualizar el header y reintentar la petición original
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Si no se puede refrescar, limpiar tokens y redirigir al login
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Para otros errores, simplemente rechazar
    return Promise.reject(error);
  }
);

// Función helper para manejar errores de la API
export const handleApiError = (error) => {
  if (error.response) {
    // El servidor respondió con un código de error
    const message = error.response.data?.message || 
                   error.response.data?.detail || 
                   error.response.data?.error ||
                   `Error ${error.response.status}`;
    return {
      message,
      status: error.response.status,
      data: error.response.data
    };
  } else if (error.request) {
    // La petición fue hecha pero no hubo respuesta
    return {
      message: 'Error de conexión. Verifique su conexión a internet.',
      status: 0,
      data: null
    };
  } else {
    // Algo pasó al configurar la petición
    return {
      message: error.message || 'Error desconocido',
      status: 0,
      data: null
    };
  }
};

// Funciones helper para diferentes tipos de peticiones
export const apiHelpers = {
  // GET con manejo de errores
  async get(url, config = {}) {
    try {
      const response = await api.get(url, config);
      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: handleApiError(error) };
    }
  },

  // POST con manejo de errores
  async post(url, data = {}, config = {}) {
    try {
      const response = await api.post(url, data, config);
      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: handleApiError(error) };
    }
  },

  // PUT con manejo de errores
  async put(url, data = {}, config = {}) {
    try {
      const response = await api.put(url, data, config);
      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: handleApiError(error) };
    }
  },

  // PATCH con manejo de errores
  async patch(url, data = {}, config = {}) {
    try {
      const response = await api.patch(url, data, config);
      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: handleApiError(error) };
    }
  },

  // DELETE con manejo de errores
  async delete(url, config = {}) {
    try {
      const response = await api.delete(url, config);
      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: handleApiError(error) };
    }
  }
};

export default api;