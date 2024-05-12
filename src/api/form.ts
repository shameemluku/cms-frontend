import axios from "axios";
import { FieldPayloadType } from "../types/form";
// import { URL, environment } from "../config";

// export const baseURL = URL[environment];
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export const getConfigrations = () => API.get(`/form/get-config`);
export const getFormFields = (parent_id: string) =>
  API.get(`/form/get-fields?parent_id=${parent_id}`);
export const updateFormField = (body: FieldPayloadType) =>
  API.post(`/form/create-field-config`, body);
export const updateFormData = (body: Object) =>
  API.post(`/form/create-form`, body);
