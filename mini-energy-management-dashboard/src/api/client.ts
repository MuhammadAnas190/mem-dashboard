import axios from 'axios';

const API_BASE_URL = 'https://mem-backend-muhammadanas190-muhammadanas190s-projects.vercel.app/api';

// Create axios instance with CORS configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  // Allow credentials in cross-origin requests (triggers preflight)
  withCredentials: false,
});

// Request interceptor with debugging
apiClient.interceptors.request.use(
  (config) => {
    console.log(
      `[API Request] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`,
      config.params
    );
    
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// Response interceptor with debugging
apiClient.interceptors.response.use(
  (response) => {
    console.log(
      `[API Response] ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`,
      response.data
    );
    return response;
  },
  (error) => {
    console.error('[API Error]', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      headers: error.response?.headers,
      data: error.response?.data,
      code: error.code,
    });
    return Promise.reject(error);
  }
);

export default apiClient;
