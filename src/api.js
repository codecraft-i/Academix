// src/api.js
import axios from "axios";

export const api = axios.create({
  baseURL: "http://45.138.159.137/api/",   // backend URL-ni moslang
});
