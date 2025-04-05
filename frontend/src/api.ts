import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';

import { Token } from './utils/common';

const BACKEND_URL = 'http://127.0.0.1:5000';
const REQUEST_TIMEOUT = 5000;

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = Token.get();

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config;
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response && shouldDisplayError(error.response)) {
        toast.dismiss();
        toast.warn(error.response ? error.response.data.error : error.message);
      }

      return Promise.reject(error);
    }
  );

  return api;
};
