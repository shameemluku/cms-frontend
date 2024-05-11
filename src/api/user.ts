import axios from "axios";
// import { URL, environment } from "../config";

// export const baseURL = URL[environment];
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export const login = (payload: Object) => API.post(`/user/login`, payload);
export const logout = (payload: Object) =>
  API.post(`/lms/user/logout`, payload);
export const verifyAuth = () => API.get(`/user/verify`);
