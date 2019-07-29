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
    const keySufix = "&consumer_key=ck_edc3033a3399e37cb273477f2d69b7f1192e7d49&consumer_secret=cs_288b43034883692fe6a025fc646782638b5906f9";
    return axios.get(`${prefixUrlApi}/wc/v3${endpoint}${keySufix}`);
  }
};

export function getCep(cep) {
  return axios.get(`https://viacep.com.br/ws/${cep}/json/`);
}