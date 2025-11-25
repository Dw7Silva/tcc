// services/api.js
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

// Interceptor para requests
api.interceptors.request.use(
  (config) => {
    console.log(`🔄 Fazendo requisição para: ${config.baseURL}${config.url}`);
    
    // Se for FormData, não define Content-Type
    if (config.data instanceof FormData) {
      console.log('📤 Enviando FormData');
      // O browser define automaticamente o Content-Type com boundary
    } else {
      config.headers['Content-Type'] = 'application/json';
    }

    // Token se existir
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error('❌ Erro no interceptor de request:', error);
    return Promise.reject(error);
  }
);

// Interceptor para responses
api.interceptors.response.use(
  (response) => {
    console.log('✅ Resposta recebida:', response.status);
    return response;
  },
  (error) => {
    console.error('❌ Erro na resposta:', error.message);
    
    if (error.code === 'ECONNABORTED') {
      console.error('⏰ Timeout da requisição');
    } else if (error.message === 'Network Error') {
      console.error('🌐 Erro de rede - Servidor não alcançável');
    }
    
    return Promise.reject(error);
  }
);

export default api;