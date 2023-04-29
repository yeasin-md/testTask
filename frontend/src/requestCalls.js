import axios from "axios";

const BASE_URL = "https://test-task-api.onrender.com/api";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
