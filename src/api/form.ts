import axios from "axios";
// import { URL, environment } from "../config";

// export const baseURL = URL[environment];
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export const getConfigrations = () => API.get(`/form/get-config`);
