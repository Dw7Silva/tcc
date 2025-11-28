import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost";
const apiPorta = process.env.NEXT_PUBLIC_API_PORTA || "3333";

// CORRIJA A URL - deve ser http://localhost:3333
const baseURL = `http://localhost:3333`;

const api = axios.create({
    baseURL: baseURL
});

// Adicione interceptors para debug
api.interceptors.request.use(
  (config) => {
    console.log('🚀 Enviando requisição:', config.method?.toUpperCase(), config.url);
    console.log('📦 Dados:', config.data);
    return config;
  },
  (error) => {
    console.log('❌ Erro na requisição:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('✅ Resposta recebida:', response.status, response.data);
    return response;
  },
  (error) => {
    console.log('❌ Erro na resposta:', error.message);
    return Promise.reject(error);
  }
);

export const authAPI = {
  async solicitarRecuperacao(email) {
    const response = await api.post('/auth/solicitar-recuperacao', { email });
    return response.data;
  },

  async verificarCodigo(email, codigo) {
    const response = await api.post('/auth/verificar-codigo', { email, codigo });
    return response.data;
  },

  async redefinirSenha(email, codigo, novaSenha) {
    const response = await api.post('/auth/redefinir-senha', { 
      email, 
      codigo, 
      novaSenha 
    });
    return response.data;
  },
};

export default api;