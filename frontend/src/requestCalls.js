import axios from "axios";

const BASE_URL = "http://localhost:5500/api";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
