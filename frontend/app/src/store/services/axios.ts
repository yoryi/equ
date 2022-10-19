import axios from "axios"

import { config } from "../config"

export const api = axios.create()

api.interceptors.request.use(
  (axiosConfig) => ({
    ...axiosConfig,
    baseURL: config?.baseURL as string | undefined,
  }),
  async (error) => Promise.reject(error),
)
