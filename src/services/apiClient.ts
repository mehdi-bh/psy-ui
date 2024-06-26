import axios from "axios";

import config from "../config/config";

const apiClient = axios.create({
  baseURL: config.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
