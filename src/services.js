import axios from "axios";

const prefix = "https://marinawave.com.br"
export const prefixUrl = `${prefix}/api-dog27`;
const prefixUrlApi = `${prefixUrl}/wp-json`;

const axiosInstance = axios.create({
  baseURL: `${prefixUrlApi}/api/v1`
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = window.localStorage.token;
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const api = {
  get(endpoint) {
    return axiosInstance.get(endpoint);
  },
  post(endpoint, body) {
    // body deve ser um objeto
    return axiosInstance.post(endpoint, body);
  },
  put(endpoint, body) {
    return axiosInstance.put(endpoint, body);
  },
  delete(endpoint) {
    return axiosInstance.delete(endpoint);
  },
  login(body) {
    return axios.post(`${prefixUrlApi}/jwt-auth/v1/token`, body);
  },
  validateToken() {
    return axiosInstance.post(`${prefixUrlApi}/jwt-auth/v1/token/validate`);
  },
  getApiWc(endpoint) {
    const keySufix = `&consumer_key=${process.env.VUE_APP_CONSUMER_KEY}&consumer_secret=${process.env.VUE_APP_CONSUMER_SECRET}`;
    return axios.get(`${prefixUrlApi}/wc/v3${endpoint}${keySufix}`);
  },
  postApiWc(data) {
    return axiosInstance.post(`${prefixUrlApi}/wc/v3${data.endpoint}`, data.body);
  },
};

export function getCep(cep) {
  return axios.get(`https://viacep.com.br/ws/${cep}/json/`);
}