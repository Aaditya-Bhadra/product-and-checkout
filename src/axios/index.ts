import axios from "axios";

const apiClient = axios.create({
  timeout: 30000,
  baseURL: process.env.REACT_APP_BASE_URL,
});

export default apiClient;
