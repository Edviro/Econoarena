import React, { createContext, useContext, useReducer, useEffect } from 'react';
// import { authService } from '../services/auth'; // Comentado temporalmente
import { mockUsers, mockHelpers } from '../data/mockData';

// Estados de autenticación
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false, // Cambiado a false para evitar loop
  error: null,
  permissions: []
};

// Tipos de acciones
const AUTH_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  SET_LOADING: 'SET_LOADING',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_USER: 'SET_USER'
};

// Reducer para manejar el estado de autenticación
function authReducer(state, action) {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        permissions: action.payload.permissions || []
      };
    
    case AUTH_ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
        permissions: []
      };
    
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        permissions: []
      };
    
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    
    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    
    case AUTH_ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false
      };
    
    default:
      return state;
  }
}

// Crear el contexto
const AuthContext = createContext();

// Provider del contexto
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Verificar si hay un token guardado al cargar la app
  useEffect(() => {
    const initAuth = async () => {
      try {
        const savedUser = localStorage.getItem('authUser');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          dispatch({
            type: AUTH_ACTIONS.LOGIN_SUCCESS,
            payload: {
              user: userData.user,
              permissions: userData.permissions
            }
          });
        }
      } catch (error) {
        console.error('Error al verificar usuario guardado:', error);
        localStorage.removeItem('authUser');
      }
    };

    initAuth();
  }, []);

  // Función para iniciar sesión con datos mock
  const login = async (credentials) => {
    try {
      dispatch({ type: AUTH_ACTIONS.LOGIN_START });
      
      // Simular delay de red
      await mockHelpers.delay(800);
      
      // Buscar usuario en datos mock
      const user = mockUsers.find(u => 
        u.username === credentials.username && 
        (
          (credentials.username === 'admin' && credentials.password === 'admin123') ||
          (credentials.username === 'operador' && credentials.password === 'operador123') ||
          (credentials.username === 'viewer' && credentials.password === 'viewer123')
        )
      );

      if (!user) {
        throw new Error('Credenciales incorrectas');
      }

      // Guardar en localStorage
      const authData = {
        user,
        permissions: user.permissions,
        token: 'mock-token-' + user.id
      };
      
      localStorage.setItem('authUser', JSON.stringify(authData));
      
      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: {
          user,
          permissions: user.permissions
        }
      });
      
      return { success: true };
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: error.message || 'Error al iniciar sesión'
      });
      return { success: false, error: error.message };
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    try {
      localStorage.removeItem('authUser');
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  // Función para limpiar errores
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  // Función para verificar permisos
  const hasPermission = (permission) => {
    return state.permissions.includes(permission) || state.user?.role === 'admin';
  };

  // Función para actualizar datos del usuario
  const updateUser = (userData) => {
    dispatch({
      type: AUTH_ACTIONS.SET_USER,
      payload: { ...state.user, ...userData }
    });
  };

  const value = {
    ...state,
    login,
    logout,
    clearError,
    hasPermission,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar el contexto de autenticación
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}

export { AUTH_ACTIONS };