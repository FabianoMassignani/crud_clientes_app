import axios from 'axios';
import { logout } from '../actions/Auth.thunks';

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      logout();
    }
    return Promise.reject(error);
  }
);

export const get = async (url: string, accessToken?: string | null) => {
  const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

  return axiosInstance.get(url, { headers });
};

export const post = async (
  url: string,
  data: any,
  accessToken?: string | null
) => {
  const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

  return axiosInstance.post(url, data, { headers });
};

export const put = async (
  url: string,
  data: any,
  accessToken?: string | null
) => {
  const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

  return axiosInstance.put(url, data, { headers });
};

export const del = async (url: string, accessToken?: string | null) => {
  const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

  return axiosInstance.delete(url, { headers });
};
