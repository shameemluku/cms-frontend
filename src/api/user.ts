import axios from "axios";
// import { URL, environment } from "../config";

// export const baseURL = URL[environment];
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export const login = (payload: Object) => API.post(`/user/login`, payload);
export const createAccount = (payload: Object) =>
  API.post(`/user/create`, payload);
export const logout = () => API.get(`/user/logout`);
export const verifyAuth = () => API.get(`/user/verify`);
export const fetchUserDetails = (id: string) =>
  API.get(`/user/get-user-details?user_id=${id}`);
export const updateUserDetails = (payload: Object) =>
  API.patch(`/user/update-user-details`, payload);
